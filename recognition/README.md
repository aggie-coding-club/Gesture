# Hand Gesture Recognition

## Background Subtraction
Background subtraction is performed using OpenCV's BackgroundSubtractor class. 
There are currently two differnt subtractors implemented, MOG2 and KNN.

### Testing Background Subtraction

`python3 background_subtraction_test.py -v path_to_video -m method`
path_to_video: path to a video file that OpenCV supports.
method: MOG2 or KNN, KNN is currently the better option



