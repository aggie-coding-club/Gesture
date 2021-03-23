import cv2 as cv
import argparse
import background_subtraction as bs

### Background Subtraction Test Program ###

args = bs.parse_arguments() # parsing arguments
backSub = bs.setup_subtraction(args.m) # setup cv::BackgroundSubtractor object, either MOG2 or KNN

# Initiate video caputer from the video input -v
capture = cv.VideoCapture(args.v)

# Check if video is open
if not capture.isOpened():
    print('Unable to open: ' + args.v)
    exit(0)

i = 0
while True:
    i += 1
    
    # Get individual frame
    _, frame = capture.read()

    # If there is no more frames, shutdown
    if frame is None:
        break

    # Converting frame to greyscale
    # This seems to help background subtraction, more testing needs to be done
    frame = cv.cvtColor(frame, cv.COLOR_BGR2GRAY)

    # Only subtract the background for every third frame
    if i%3 == 0:
    
        # Applying the BackgroundSubtraction to frame
        subtracted = bs.subtract_background(frame, backSub)

        # Displaying the frame with the background subtraction applied
        cv.imshow('Background Subtracted', subtracted)

    # Displaying the frame
    #cv.imshow('Normal', frame)

    keyboard = cv.waitKey(30)
    if keyboard == 'q' or keyboard == 27:
        break

    # reset i once it gets too large
    if i > 10000: i = 0

# Releasing the webcam resource
capture.release()

# Destroy the window that was showing the video stream
cv.destroyAllWindows()