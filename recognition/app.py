# Using python version 3.7.9 for media-pipe
import cv2
import mediapipe as mp
import numpy as np
import pyautogui
import argparse
import math

from Emitter import event
from flask import Flask, render_template, Response


# import config
# import time


app = Flask(__name__)


# Getting openCV ready
cap = cv2.VideoCapture(0)

# restricting webcam size
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

#Camera detection
if cap is None or not cap.isOpened():
    pyautogui.alert('Your camera is unavailable. Try to fix this issue and try again!', 'Error')
# Dimensions of the camera output window
wCam = int(cap.get(3))
hCam = int(cap.get(4))

print(wCam, hCam)

# For testing, write output to video
#out = cv2.VideoWriter('output.mp4',cv2.VideoWriter_fourcc('M','J','P','G'), 30, (wCam,hCam))

# Number of consecutive frames a gesture has to be detected before it changes
# Lower the number the faster it changes, but the more jumpy it is
# Higher the number the slower it changes, but the less jumpy it is
frames_until_change = 3
prevGestures = [] # gestures calculated in previous frames

# Getting media-pipe ready
mpHands = mp.solutions.hands
hands = mpHands.Hands(min_detection_confidence=.7)
mpDraw = mp.solutions.drawing_utils

# Mouse movement anchor
mouseAnchor = [-1,-1]
wristPositionHistory = []
pyautogui.PAUSE = 0
pyautogui.FAILSAFE = False

screenWidth, screenHeight = pyautogui.size()

def parse_arguments():
    """Parses Arguments
    -m: mode that gesture will be recognized for
    """
    # Setting up the argument parser
    p = argparse.ArgumentParser(description='Used to parse options for hand tracking')

    # -v flag is the path to the video, -m flag is the background subtraction method
    p.add_argument('-m', type=str, help='The mode that the recognition will control for (ie. mouse)')

    return p.parse_args()

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
            return "Rock and Roll"
        else:
            return "No Gesture"
    elif f[0] > 0 and (f[1] < 0 and f[2] < 0 and f[3] < 0 and f[4] < 0):
        thumb_tip = hand.landmark[4]
        thumb_base = hand.landmark[2]
        if thumb_tip.y < thumb_base.y: # Y goes from top to bottom instead of bottom to top
            return "Gig Em"
        else:
            return "Thumbs Down"
    elif f[0] < 0 and f[1] > 0 and f[2] < 0 and (f[3] < 0 and f[4] < 0):
        return "1 finger"
    elif f[0] < 0 and f[1] > 0 and f[2] > 0 and (f[3] < 0 and f[4] < 0):
        return "Peace"
    elif f[0] > 0 and f[1] > 0 and f[2] > 0 and f[3] > 0 and f[4] > 0:
        mid_tip = hand.landmark[12]
        ring_tip = hand.landmark[16]
        wrist = hand.landmark[0]
        if angle_between(mid_tip, wrist, ring_tip) > 0.3:
            return 'Vulcan Salute'
        else:
            return "Open Hand"
    elif f[0] < 0 and f[1] < 0 and f[2] < 0 and f[3] < 0 and f[4] < 0:
        return "Fist"
    elif f[0] < 0 and f[1] > 0 and f[2] > 0 and f[3] > 0 and f[4] > 0: 
        return "4 fingers"
    elif f[0] < 0 and f[1] > 0 and f[2] > 0 and f[3] > 0 and f[4] < 0:
        return "3 fingers"
    else:
        return "No Gesture"

def calcFPS(pt, ct, framelist):
    fps = 1 / (ct - pt)
    if len(framelist) < 30:
        framelist.append(fps)
    else:
        framelist.append(fps)
        framelist.pop(0)
    return framelist

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

            # Code below draws the two vectors from above
            # cx, cy = int(lms[id].x * wCam), int(lms[id].y * hCam)
            # cx2, cy2 = int(lms[id-2].x * wCam), int(lms[id-2].y * hCam)
            # cx0, cy0 = int(lms[0].x * wCam), int(lms[0].y * hCam)
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

            # Code below draws the two vectors from above
            # cx, cy = int(lms[id].x * wCam), int(lms[id].y * hCam)
            # cx2, cy2 = int(lms[id-2].x * wCam), int(lms[id-2].y * hCam)
            # cx0, cy0 = int(lms[0].x * wCam), int(lms[0].y * hCam)

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

#Handles entering and exiting mouse-movement mode and also handles mouse clicks
def mouseModeHandler(detectedHand, currGests, gestures, results, mouseHand):
	# Enters mouse movement mode on Gig Em gesture, setting a mouse anchor point at that position
    if(detectedHand == mouseHand and currGests[detectedHand] != "Gig Em" and currGests[detectedHand] != "Fist" and gestures[detectedHand] == "Gig Em"):
        print("Entering mouse mode at (" + str(results.multi_hand_landmarks[0].landmark[0].x) + ", " + str(results.multi_hand_landmarks[0].landmark[0].y) + ")")
        return [results.multi_hand_landmarks[0].landmark[0].x, results.multi_hand_landmarks[0].landmark[0].y]
        
    # Leave mouse mode when gesture isn't Gig Em or fist anymore
    if (detectedHand == mouseHand and (currGests[detectedHand] == "Gig Em" or currGests[detectedHand] == "Fist") and gestures[detectedHand] != "Fist" and gestures[hand] != "Gig Em"):
        print("Exiting mouse mode.")
        return [-1,-1]
    
    # Clicks the mouse upon a fist gesture while in mouse-movement mode
    if(detectedHand == mouseHand and currGests[detectedHand] == "Gig Em" and gestures[detectedHand] == "Fist"):
        pyautogui.click()
        print("Click!")
        
    return mouseAnchor
       
#Moves the mouse 
#anchorMouse mode: While in mouse-movement mode (a.k.a. when mouseAnchor isn't [-1,-1]), when distance from mouse anchor point is far enough, start moving the mouse in that direction.
#absoluteMouse mode: Moves mouse proportionately to screen size.
def moveMouse(results):
    if(args.m == 'anchorMouse'):
        if(mouseAnchor != [-1,-1] and ((results.multi_hand_landmarks[0].landmark[0].x - mouseAnchor[0])**2 + (results.multi_hand_landmarks[0].landmark[0].y - mouseAnchor[1])**2)**0.5 > 0.025):
            pyautogui.moveTo(pyautogui.position()[0] - ((results.multi_hand_landmarks[0].landmark[0].x - mouseAnchor[0])*abs(results.multi_hand_landmarks[0].landmark[0].x - mouseAnchor[0])*1000), pyautogui.position()[1] + (((results.multi_hand_landmarks[0].landmark[0].y - mouseAnchor[1])*abs(results.multi_hand_landmarks[0].landmark[0].y - mouseAnchor[1]))*1000))
    
    if(args.m == 'absoluteMouse' and mouseAnchor != [-1,-1]):
        if(len(wristPositionHistory) == 10):
            wristPositionHistory.pop(0)
            wristPositionHistory.append((results.multi_hand_landmarks[0].landmark[0].x, results.multi_hand_landmarks[0].landmark[0].y))
        else:
            wristPositionHistory.append((results.multi_hand_landmarks[0].landmark[0].x, results.multi_hand_landmarks[0].landmark[0].y))
    
        avgx = 0
        avgy = 0
        
        for i in wristPositionHistory:
            avgx += i[0]
            avgy += i[1]
        
        avgx /= len(wristPositionHistory)
        avgy /= len(wristPositionHistory)
        
        pyautogui.moveTo(-(avgx - 0.5)*2*screenWidth + screenWidth/2, (avgy - 0.5)*2*screenHeight + screenHeight/2)


def gen_video():
    # Preparing arguments for main
    args = parse_arguments() # parsing arguments

    prevGests = {
        "right": [],
        "left": [],
    }
    currGests = {
        "right": None,
        "left": None,
    }
   
    # Vars used to calculate avg fps
    # prevTime = 0
    # currTime = 0
    # fpsList = []
    frame_count = 0


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

        # leftPrevGestures = []
        # rightPrevGestures = []
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
                frame_count += 1
                #mpDraw.draw_landmarks(img, handLms, mpHands.HAND_CONNECTIONS)
                mpDraw.draw_landmarks(img, handLms)
            
            # print(f"{frame_count}, {gestures}, {len(results.multi_hand_landmarks)}")
            for hand in ['left', 'right']:
                if not hand in gestures:
                    continue

                #Moves mouse if in mouse mode
                if (args.m == 'anchorMouse' or args.m == 'absoluteMouse'):
                    moveMouse(results)
                
                # if gesture is diff from currGesture and the previous 3 gestures are the same as the current gesture
                # too much gesture, it is not a word anymore
                if(gestures[hand] != currGests[hand] and all(x == gestures[hand] for x in prevGests[hand])):

                    # print(f'{hand} : {gestures[hand]}')
                    
                    if (args.m == 'anchorMouse' or args.m == 'absoluteMouse'):
                        # Handles mouse-movement mode through mouseModeHandler function
                        mouseAnchor = mouseModeHandler(hand, currGests, gestures, results, "right")
                    else:
                        # event.emit("end", hand=hand, gest=currGests[hand]) ## doesn't do anything yet
                        event.emit("start", hand=hand, gest=gestures[hand])
                        
                    currGests[hand] = gestures[hand]
                    
                # keep only the 3 previous Gestures
                prevGests[hand].append(gestures[hand])
                prevGests[hand] = prevGests[hand][-frames_until_change:]
                
        # Used for fps calculation
        # currTime = time.time()
        # fpsList = calcFPS(prevTime, currTime, fpsList)
        # prevTime = currTime

        # # Displays the fps
        # cv2.putText(img, str(int(np.average(fpsList))), (10, 70),
        #             cv2.FONT_HERSHEY_PLAIN, 2, (0, 255, 0), 3)

        # cv2.imshow("Video with Hand Detection", img)
        ret, buffer = cv2.imencode('.jpg', img)
        frame = buffer.tobytes()
        yield (b'--frame\r\n'
                b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')


        # Used for testing, writing video to output
        #out.write(img)

        if cv2.waitKey(1) == 27:
            break

# cap.release()
# cv2.destroyAllWindows()

@app.route('/video_feed')
def video_feed():
    return Response(gen_video(), mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route('/off')
def off():
    return ""


if __name__ == "__main__":
    app.run(threaded=True, port=5000)