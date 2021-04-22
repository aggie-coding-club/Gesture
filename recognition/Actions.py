# %%
import webbrowser
import pyautogui
import time

from Emitter import event

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

@event.on("multigesture")
def logMultiGest(gest):
    print(f"Made gesture: {gest}")

# gesture modes like mouse movement or quite mode