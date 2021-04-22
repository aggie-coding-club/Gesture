# %%
from pymitter import EventEmitter
import webbrowser
import pyautogui
import time


event = EventEmitter()

# start event, when the gesture is first made
# :hand: left or right
# :gest: the gesture
@event.on("start")
def openProject(hand, gest):
    if hand == 'right' and gest == "Rock & Roll":
           webbrowser.open("https://github.com/aggie-coding-club/Vision-Controls", new=1) 

@event.on("start")
def closeProgram(hand, gest):
    if hand == 'left' and gest == "Thumbs Down":
        pyautogui.hotkey('alt', 'f4')

@event.on("test")
def testAction():
    print("asdf")

@event.on("start")
def logGest(hand, gest):
    print(f"start gesture: {hand} {gest}")

# gesture modes like mouse movement or quite mode
##
class MultiGesture():
    def __init__(self, gestures, action, time_diff=1):
        self.gestures = gestures
        self.action = action
        self.time_diff = time_diff
        self.on = 0
        self.time_last = None

    def on_start_gest(self, hand, gest):
        # print(self.on)
        if type(self.gestures[self.on]) == str:
            if self.gestures[self.on] == gest: # doesn't matter which hand
                # print("Go to next gesture")
                self.on += 1
            elif self.gestures[self.on] == "No Gesture":
                return
        elif hand == self.gestures[self.on][0] and gest == self.gestures[self.on][1]: # does check which hand
            # print("Go to next gesture")
            self.on += 1
        elif self.gestures[self.on][0] == "No Gesture":
            return
        else:
            self.on = 0

        if self.on == len(self.gestures):
            self.action()
            self.on = 0

# %%
# m = MultiGesture(["1 finger", "2 finger"], lambda: print("counting"))
# m.on_keydown("left", "1 finger")
# m.on_keydown("right", "2 finger")

# m.on_keydown("right", "2 finger")

# m.on_keydown("left", "1 finger")
# m.on_keydown("right", "Thumbs Down")
# m.on_keydown("right", "2 finger")

# m.on_keydown("left", "1 finger")
# m.on_keydown("right", "2 finger")

# %%
# m = MultiGesture([("right", "1 finger"), "2 finger"], lambda: print("counting"))
# m.on_keydown("left", "1 finger")
# m.on_keydown("right", "2 finger")

# m.on_keydown("right", "1 finger")
# m.on_keydown("right", "2 finger")

# %% 
# m = MultiGesture([("right", "1 finger"), "2 finger"], lambda: print("counting"))
# event.on("key down", m.on_keydown)

# event.emit("key down", hand="right", gest="1 finger")
# event.emit("key down", hand="right", gest="2 finger")

# %%
countToFive = MultiGesture(["Peace", "3 fingers", "4 fingers", "Open Hand"], lambda: print("Counted to 5"))
event.on("start", countToFive.on_start_gest)