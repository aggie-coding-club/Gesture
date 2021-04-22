# %%
from pymitter import EventEmitter
import webbrowser
import pyautogui
import time


event = EventEmitter()

# key down event, when the gesture is first made
# :hand: left or right
# :gest: the gesture

@event.on("key down")
def openProject(hand, gest):
    if hand == 'right' and gest == "Rock & Roll":
           webbrowser.open("https://github.com/aggie-coding-club/Vision-Controls", new=1) 

@event.on("key down")
def closeProgram(hand, gest):
    if hand == 'left' and gest == "Thumbs Down":
        pyautogui.hotkey('alt', 'f4')

@event.on("test")
def testAction():
    print("asdf")

@event.on("key down")
def logGest(hand, gest):
    print(f"{hand} key down: {gest}")