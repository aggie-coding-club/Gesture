(TO BE UPDATED)

# Hand Gesture Recognition

## Dependencies

Dependencies can be installed using: `pip install -r requirements.txt`

## Using Gesture Recognition

### Setup

`camera_index` - Default is 0, but if you camera is not recognized your index may be 1

### Commands

`python HandTracker.py`

- Uses computer's default camera to detect hand gestures

`python HandTracker.py -m mouse`

- Uses gesture recognition to control the mouse

## Using features

### Basics

- Keep your palm facing the camera when making hand gestures

### Mouse Control

- Start HandTracker.py in mouse control mode with the `-m mouse` flag
- The mouse control currently works on an anchor system
- When the camera sees a "Thumbs Up", it sets that position as the anchor
- Keep a thumbs up and move your hand away from the anchor to see the mouse move.
- Change to a "Fist" when you want to click

## Notes for Developers

### Averaging Frames

- frames_until_change: number of frames to look at before determining a hand gesture (all must match). Note the following:
  - With a higher `frames_until_change`, the script may be slow to recognize a gesture.
  - With a lower `frames_until_change`, the script will be very fast, but may have mistakes.

### Adding / Editing Gestures

- When adding or editing a gesture in the `gesture` function, keep the following in mind:
  - `f[0]` = thumb, `f[1]` = index, `f[2]` = middle, `f[3]` = ring, `f[4]` = pinky
