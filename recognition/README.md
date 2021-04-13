
# Hand Gesture Recognition

  

## Dependencies

Python 3

`pip install opencv-python`

`pip install mediapipe`

  

## Using Gesture Recognition

  

`python3 HandTracker.py`

- Uses computer's default camera to detect hand gestures

## Advanced Configuration

### Averaging Frames
- frames_to_average: number of frames to look at before determining a hand gesture (all must match). Note the following:
     - With a higher `frames_to_average`, the script may be slow to recognize a gesture.
     - With a lower `frames_to_average`, the script will be very fast, but may have mistakes.

- When adding or editing a gesture in the `gesture` function, keep the following in mind: 
     - `f[0]` = thumb, `f[1]` = index, `f[2]` = middle, `f[3]` = ring, `f[4]` = pinky

