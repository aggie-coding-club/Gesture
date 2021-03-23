import cv2 as cv
import argparse

def parse_arguments():
    """Parses Arguments for background_subtract.py

    -v: Path to video/image
    -m: Background subtraction method
    """
    # Setting up the argument parser
    p = argparse.ArgumentParser(description='Used to subtract the background from the subject')

    # -v flag is the path to the video, -m flag is the background subtraction method
    p.add_argument('-v', type=str, help='Path to video/image')
    p.add_argument('-m', type=str, help='Background subtraction method, either KNN or MOG2')

    return p.parse_args()

def setup_subtraction(method):
    """Setup BackgroundSubtraction object

    This method keeps the object from being recreated each time subtract_background() is called.
    """
    backSub = None # Initiating for later use
    # Creating BackgroundSubtractor object, either MOG2 or KNN
    if method == 'MOG2':
        # Variables can be changed based on environment that the user is in
        # These can be made into arguments in the future
        backSub = cv.createBackgroundSubtractorMOG2(200, 8, True)
    else:
        # Variables can be changed based on environment that the user is in
        # These can be made into arguments in the future

        # KNN seems to be what is working best for now Vision Control usage
        backSub = cv.createBackgroundSubtractorKNN(200, 100, False)
    
    return backSub

def subtract_background(frame, backSub):
    """Performs the background subtraction on the given frame using 
    the BackgroundSubtraction object created in setup_subtraction().
    """
    # The 'memory' can be changed in the apply() function by adding a second argument
    # Default memory is set to 'detect'.
    # Memory is 0 to 1 (0 being no memory)
    return backSub.apply(frame)


