# %%
import cv2
import mediapipe as mp
from time import time
import sys
import pickle
import math

mp_drawing = mp.solutions.drawing_utils
mp_hands = mp.solutions.hands
target = sys.argv[1] if len(sys.argv) > 1 else 0 # use a file a input or the webcam

# %%
def vec_sub(a,b):
  return (a.x-b.x, a.y-b.y,a.z-b.z)

def vec_dot(a,b):
  return sum([i*b for i,b in zip(a,b)])

def vec_mag(a):
  return math.sqrt(sum([i**2 for i in a]))

def finger_straightness(hand_landmarks, base_knuckle):
  ''' The higher the more straight goes between ~3.9-~6'''
  knuckles = hand_landmarks[base_knuckle:base_knuckle+4] # 4 knuckles in finger
  # print(knuckles)
  bendyness = 0
  for i in range(1,len(knuckles)-1): # loop through list excluding first and last
    # cos(theta) = a*b/ |a||b|
    # A -> B -> C
    # a = BA
    # b = BC
    a = vec_sub(knuckles[i-1], knuckles[i])
    b = vec_sub(knuckles[i+1], knuckles[i])
    dot = vec_dot(a,b)
    theta = math.acos(dot/ (vec_mag(a) * vec_mag(b)))

    bendyness += theta 
  return bendyness

def is_finger_bent(hand_landmarks, base_knuckle):
  straightness = finger_straightness(hand_landmarks, base_knuckle)
  return straightness < 6
# img_hand_detect(['../../test-vids/piece_sign.png'])
# %%
def img_hand_detect(file_list):
  # For static images:
  with mp_hands.Hands(
      static_image_mode=True,
      max_num_hands=2,
      min_detection_confidence=0.5) as hands:
    for idx, file in enumerate(file_list):
      # Read an image, flip it around y-axis for correct handedness output (see
      # above).
      image = cv2.flip(cv2.imread(file), 1)
      # Convert the BGR image to RGB before processing.
      results = hands.process(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))

      # Print handedness and draw hand landmarks on the image.
      print('Handedness:', results.multi_handedness)
      if not results.multi_hand_landmarks:
        continue
      image_height, image_width, _ = image.shape
      annotated_image = image.copy()
      for hand_landmarks in results.multi_hand_landmarks:
        print('hand_landmarks:', hand_landmarks)
        # print('Finger straightness: ', finger_straightness(hand_landmarks.landmark, mp_hands.HandLandmark.INDEX_FINGER_MCP))
        print('Index bent:', is_finger_bent(hand_landmarks.landmark, mp_hands.HandLandmark.INDEX_FINGER_MCP))
        print(
            f'Index finger tip coordinates: (',
            f'{hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_TIP].x * image_width}, '
            f'{hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_TIP].y * image_height})'
        )
        mp_drawing.draw_landmarks(
            annotated_image, hand_landmarks, mp_hands.HAND_CONNECTIONS)
      cv2.imwrite(
          '/tmp/annotated_image' + str(idx) + '.png', cv2.flip(annotated_image, 1))

# %%
hand_joints = {
  'Index': mp_hands.HandLandmark.INDEX_FINGER_MCP,
  'Middle': mp_hands.HandLandmark.MIDDLE_FINGER_MCP,
  'Ring': mp_hands.HandLandmark.RING_FINGER_MCP,
  'Pinky': mp_hands.HandLandmark.PINKY_MCP,
  'Thumb': mp_hands.HandLandmark.THUMB_CMC,
}
def vid_hand_detect(target):
  # For webcam input:
  cap = cv2.VideoCapture(target)

  frames = 0
  t = 0
  start_t = time()
  with mp_hands.Hands(
      min_detection_confidence=0.5,
      min_tracking_confidence=0.5) as hands:
    while cap.isOpened():
      success, image = cap.read()
      if not success:
        cv2.destroyAllWindows()
        t = time()
        # If loading a video, use 'break' instead of 'continue'.
        break

      # Flip the image horizontally for a later selfie-view display, and convert
      # the BGR image to RGB.
      image = cv2.cvtColor(cv2.flip(image, 1), cv2.COLOR_BGR2RGB)
      # To improve performance, optionally mark the image as not writeable to
      # pass by reference.
      image.flags.writeable = False
      results = hands.process(image)

      # Draw the hand annotations on the image.
      image.flags.writeable = True
      image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
      if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:
          straight = []
          for finger, joint in hand_joints.items():
            if not is_finger_bent(hand_landmarks.landmark, joint):
              straight.append(finger)
          print(' '.join(straight))

          mp_drawing.draw_landmarks(
              image, hand_landmarks, mp_hands.HAND_CONNECTIONS)
      cv2.imshow('MediaPipe Hands', image)
      if cv2.waitKey(5) & 0xFF == 27:
        cv2.destroyAllWindows()
        t = time()
        break
      frames += 1
  cap.release()

  fps = frames / (t-start_t)
  print('FPS: ', fps)

# %%
vid_hand_detect(target)
