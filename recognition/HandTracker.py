# Using python version 3.7.9 for mediapipe
import cv2
import mediapipe as mp
import numpy as np
import time

wCam, hCam = 1280, 720

cap = cv2.VideoCapture(0)
cap.set(3, wCam)
cap.set(4, hCam)

mpHands = mp.solutions.hands
hands = mpHands.Hands(min_detection_confidence=.7)
mpDraw = mp.solutions.drawing_utils

prevTime = 0
currTime = 0
fpsList = []

def dotProduct(v1, v2):
    return v1[0]*v2[0] + v1[1]*v2[1]

def normalize(v):
    mag = np.sqrt(v[0] ** 2 + v[1] ** 2)
    v[0] = v[0] / mag
    v[1] = v[1] / mag
    return v

def gesture(f):
    if f[1] > 0 > f[2] and f[4] > 0 > f[3]:
        return "Rock & Roll"
    if f[0] > 0 and (f[1] < 0 and f[2] < 0 and f[3] < 0 and f[4] < 0):
        return "Thumbs Up"
    if f[1] > 0 and f[2] > 0 and (f[3] < 0 and f[4] < 0):
        return "Peace"
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
    imgRGB = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    hands = mpHands.Hands()
    pHands = hands.process(imgRGB)

    if pHands.multi_hand_landmarks:
        for handlms in pHands.multi_hand_landmarks:
            # mpDraw.draw_landmarks(img, handlms, mpHands.HAND_CONNECTIONS)
            mpDraw.draw_landmarks(img, handlms)

def straightFingers(hand, img):
    fingerTipIDs = [4, 8, 12, 16, 20]
    openFingers = []
    lms = hand.landmark
    for id in fingerTipIDs:
        x2, y2 = lms[id].x, lms[id].y
        x1, y1 = lms[id-2].x, lms[id-2].y
        x0, y0 = lms[0].x, lms[0].y
        fv = [x2-x1, y2-y1]
        fv = normalize(fv)
        pv = [x1-x0, y1-y0]
        pv = normalize(pv)
        openFingers.append(dotProduct(fv, pv))
        cx, cy = int(lms[id].x * wCam), int(lms[id].y * hCam)
        cx2, cy2 = int(lms[id-2].x * wCam), int(lms[id-2].y * hCam)
        cx0, cy0 = int(lms[0].x * wCam), int(lms[0].y * hCam)
        cv2.line(img, (cx0, cy0), (cx2, cy2), (255, 0, 0), 2)
        if dotProduct(fv, pv) >= 0:
            cv2.line(img, (cx, cy), (cx2, cy2), (0, 255, 0), 2)
        else:
            cv2.line(img, (cx, cy), (cx2, cy2), (0, 0, 255), 2)
        # cv2.circle(img, (cx, cy), 15, (255, 0, 255), cv2.FILLED)
    # print(openFingers)
    return openFingers

while True:
    success, img = cap.read()
    imgRGB = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    results = hands.process(imgRGB)

    if results.multi_hand_landmarks:
        for handLms in results.multi_hand_landmarks:
            fingers = straightFingers(handLms, img)
            print(gesture(fingers))
            # mpDraw.draw_landmarks(img, handLms, mpHands.HAND_CONNECTIONS)
            mpDraw.draw_landmarks(img, handLms)

    currTime = time.time()
    fpsList = calcFPS(prevTime, currTime, fpsList)
    prevTime = currTime

    cv2.putText(img, str(int(np.average(fpsList))), (10, 70),
                cv2.FONT_HERSHEY_PLAIN, 2, (0, 255, 0), 3)

    cv2.imshow("Image", img)
    cv2.waitKey(1)




