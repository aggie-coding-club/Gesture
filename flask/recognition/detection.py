# Using python version 3.7.9 for media-pipe
import cv2
import mediapipe as mp
import numpy as np
import pyautogui
import argparse
import math

import recognition.Actions as Actions


# Getting openCV ready
if (Actions.settings["camera_index"] == 0):
    cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)
else:
    cap = cv2.VideoCapture(1)

# restricting webcam size
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
cap.set(cv2.CAP_PROP_FPS, 60)

#Camera detection
if cap is None or not cap.isOpened():
    pyautogui.alert('Your camera is unavailable. Try to fix this issue and try again!', 'Error')

# Number of consecutive frames a gesture has to be detected before it changes
# Lower the number the faster it changes, but the more jumpy it is
# Higher the number the slower it changes, but the less jumpy it is
frames_until_change = 15
prevGestures = [] # gestures calculated in previous frames

# Getting media-pipe ready
mpHands = mp.solutions.hands
hands = mpHands.Hands(min_detection_confidence=.7)
mpDraw = mp.solutions.drawing_utils




def dotProduct(v1, v2):
    return v1[0]*v2[0] + v1[1]*v2[1]

def normalize(v):
    mag = np.sqrt(v[0] ** 2 + v[1] ** 2)
    v[0] = v[0] / mag
    v[1] = v[1] / mag
    return v

def angle_between(a,b,c):
    '''
    Gets angle ABC from points

    cos(theta) = (u*v)/ (|u| |v|)
    '''
    BA = (a.x - b.x, a.y-b.y, a.z-b.z)
    BC = (c.x - b.x, c.y-b.y, c.z-b.z)

    dot = BA[0] * BC[0] + BA[1] * BC[1] + BA[2] * BC[2]
    BA_mag = math.sqrt(BA[0]**2 + BA[1]**2 + BA[2]**2)
    BC_mag = math.sqrt(BC[0]**2 + BC[1]**2 + BC[2]**2)

    angle = math.acos(dot/(BA_mag*BC_mag))
    return angle

def gesture(f, hand):
    """
    Uses the open fingers list to recognize gestures
    :param f: list of open fingers (+ num) and closed fingers (- num)
    :param hand: hand information
    :return: string representing the gesture that is detected
    """

    if f[1] > 0 and f[2] < 0 and f[3] < 0 and f[4] > 0:
        index_tip = hand.landmark[8]
        index_base = hand.landmark[5]
        if index_tip.y > index_base.y: # Y goes from top to bottom instead of bottom to top
            return "Horns Down"
        elif f[0] > 0:
            return "rockandroll"
        else:
            return "No Gesture"
    elif f[0] > 0 and (f[1] < 0 and f[2] < 0 and f[3] < 0 and f[4] < 0):
        thumb_tip = hand.landmark[4]
        thumb_base = hand.landmark[2]
        if thumb_tip.y < thumb_base.y: # Y goes from top to bottom instead of bottom to top
            return "thumbsup"
        else:
            return "Thumbs Down"
    elif f[0] < 0 and f[1] > 0 and f[2] < 0 and (f[3] < 0 and f[4] < 0):
        return "onefinger"
    elif f[0] < 0 and f[1] > 0 and f[2] > 0 and (f[3] < 0 and f[4] < 0):
        return "twofinger"
    elif f[0] > 0 and f[1] > 0 and f[2] > 0 and f[3] > 0 and f[4] > 0:
        mid_tip = hand.landmark[12]
        ring_tip = hand.landmark[16]
        wrist = hand.landmark[0]
        if angle_between(mid_tip, wrist, ring_tip) > 0.3:
            return 'Vulcan Salute'
        else:
            return "openhand"
    elif f[0] < 0 and f[1] < 0 and f[2] < 0 and f[3] < 0 and f[4] < 0:
        return "fist"
    elif f[0] < 0 and f[1] > 0 and f[2] > 0 and f[3] > 0 and f[4] > 0:
        return "fourfinger"
    elif f[0] < 0 and f[1] > 0 and f[2] > 0 and f[3] > 0 and f[4] < 0:
        return "threefinger"
    else:
        return "No Gesture"

def findLandMarks(img):
    """
    Draws the landmarks on the hand (not being used currently)
    :param img: frame with the hand in it
    :return:
    """
    imgRGB = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    hands = mpHands.Hands()
    pHands = hands.process(imgRGB)

    if pHands.multi_hand_landmarks:
        for handlms in pHands.multi_hand_landmarks:
            # mpDraw.draw_landmarks(img, handlms, mpHands.HAND_CONNECTIONS)
            mpDraw.draw_landmarks(img, handlms)

def straightFingers(hand, img):
    """
    Calculates which fingers are open and which fingers are closed
    :param hand: media-pipe object of the hand
    :param img: frame with the hand in it
    :return: list of open (+ num) and closed (- num) fingers
    """
    fingerTipIDs = [4, 8, 12, 16, 20]  # list of the id's for the finger tip landmarks
    openFingers = []
    lms = hand.landmark  # 2d list of all 21 landmarks with there respective x, an y coordinates

    # Draws the blue part
    palm_connections = filter(lambda x: x[1] in [0,1,2,5,6,9,10,13,14,17,18], mpHands.HAND_CONNECTIONS)
    mpDraw.draw_landmarks(img,hand, connections=palm_connections, connection_drawing_spec=mpDraw.DrawingSpec(color=(255,0,0)))

    for id in fingerTipIDs:
        if id == 4: # This is for the thumb calculation, because it works differently than the other fingers
            x2, y2 = lms[id].x, lms[id].y  # x, and y of the finger tip
            x1, y1 = lms[id-2].x, lms[id-2].y  # x, and y of the joint 2 points below the finger tip
            x0, y0 = lms[0].x, lms[0].y  # x, and y of the wrist
            fv = [x2-x1, y2-y1]  # joint to finger tip vector
            fv = normalize(fv)
            pv = [x1-x0, y1-y0]  # wrist to joint vector
            pv = normalize(pv)

            thumb = dotProduct(fv, pv)
            # Thumb that is greater than 0, but less than .65 is typically
            # folded across the hand, which should be calculated as "down"
            if thumb > .65:
                openFingers.append(thumb)  # Calculates if the finger is open or closed
            else:
                openFingers.append(-1)

            finger_connections = filter(lambda x: id-2 <= x[0] and x[0] <= id, mpHands.HAND_CONNECTIONS) # gets the connections only for the thumb
            if dotProduct(fv, pv) >= .65:
                mpDraw.draw_landmarks(img,hand, connections=finger_connections)
            else:
                mpDraw.draw_landmarks(img,hand, connections=finger_connections, connection_drawing_spec=mpDraw.DrawingSpec(color=(0,0,255)))

        else: # for any other finger (not thumb)
            x2, y2 = lms[id].x, lms[id].y  # x, and y of the finger tip
            x1, y1 = lms[id-2].x, lms[id-2].y  # x, and y of the joint 2 points below the finger tip
            x0, y0 = lms[0].x, lms[0].y  # x, and y of the wrist
            fv = [x2-x1, y2-y1]  # joint to finger tip vector
            fv = normalize(fv)
            pv = [x1-x0, y1-y0]  # wrist to joint vector
            pv = normalize(pv)
            openFingers.append(dotProduct(fv, pv))  # Calculates if the finger is open or closed

            # Connections from tip to first knuckle from base
            finger_connections = [(id-1, id),
                                  (id-2, id-1)]
            if dotProduct(fv, pv) >= 0:
                mpDraw.draw_landmarks(img,hand, connections=finger_connections)
            else:
                mpDraw.draw_landmarks(img,hand, connections=finger_connections, connection_drawing_spec=mpDraw.DrawingSpec(color=(0,0,255)))
            # cv2.circle(img, (cx, cy), 15, (255, 0, 255), cv2.FILLED)
    return openFingers

def getHand(handedness):
    '''
    Mediapipe assumes that the camera is mirrored
    :param handedness: media-pipe object of handedness
    :return: string that is 'Left' or 'Right'
    '''
    hand = handedness.classification[0].label

    if(hand == 'Left'):
        return 'Right'
    else:
        return 'Left'

def gen_video(configData):
    # reopens camera after release
    if (Actions.settings["camera_index"] == 0):
        cap.open(0, cv2.CAP_DSHOW);
    else:
        cap.open(1);

    prevGests = {
        "right": [],
        "left": [],
    }
    currGests = {
        "right": None,
        "left": None,
    }

    while True:
        """
        Main code loop
        """
        # Gets the image from openCV and gets the hand data from media-pipe
        success, img = cap.read()

        # If there are no more frames, break loop
        if img is None:
            print("Video ended. Closing.")
            break

        imgRGB = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        results = hands.process(imgRGB)

        # if there are hands in frame, calculate which fingers are open and draw the landmarks for each hand
        if results.multi_hand_landmarks:
            gestures = {}

            for handLms, handedness in zip(results.multi_hand_landmarks, results.multi_handedness):
                fingers = straightFingers(handLms, img)
                hand = getHand(handedness)
                if hand == "Left":
                    gestures['left'] = gesture(fingers, handLms)
                else:
                    gestures['right'] = gesture(fingers, handLms)
                #mpDraw.draw_landmarks(img, handLms, mpHands.HAND_CONNECTIONS)
                mpDraw.draw_landmarks(img, handLms)

            # print(f"{frame_count}, {gestures}, {len(results.multi_hand_landmarks)}")
            for hand in ['left', 'right']:
                if not hand in gestures:
                    continue
                # if gesture is diff from currGesture and the previous 3 gestures are the same as the current gesture
                # too much gesture, it is not a word anymore
                if(gestures[hand] != currGests[hand] and all(x == gestures[hand] for x in prevGests[hand])):
                    Actions.event.emit("start", configData=configData, hand=hand, gest=gestures[hand])
                
                    currGests[hand] = gestures[hand]

                # keep only the 3 previous Gestures
                prevGests[hand].append(gestures[hand])
                prevGests[hand] = prevGests[hand][-frames_until_change:]

        ret, buffer = cv2.imencode('.jpg', img)
        frame = buffer.tobytes()
        yield (b'--frame\r\n'
                b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')


        if cv2.waitKey(1) == 27:
            break

def gen_off():
    img = cv2.imread("../frontend/src/assets/loading.png", 1)
    ret, buffer = cv2.imencode('.jpg', img)
    frame = buffer.tobytes()
    yield (b'--frame\r\n'
            b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
    cap.release()



    

