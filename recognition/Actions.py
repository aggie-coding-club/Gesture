# %%
import webbrowser
import pyautogui
import time
import application_launch as app
import config

from Emitter import event

preferred_broswer = ""

# start event, when the gesture is first made
# :hand: left or right
# :gest: the gesture
@event.on("start")
def openProject(hand, gest):

    for x in config.actions.keys():
        if (config.actions[x][2] == 'x'): return

        if config.actions[x][2].startswith("http"):
            webbrowser.open(config.actions[x][2])

        if (config.actions[x][0].lower() == hand.lower() and config.actions[x][1].lower() == gest.lower()):
            try:
                app.openProgram(config.actions[x][2])
            except:
                print("No program at path:", config.actions[x][2])

@event.on("start")
def closeProgram(hand, gest):
    if (config.actions["close"][0].lower() == hand.lower() and config.actions["close"][1].lower() == gest.lower()):
        pyautogui.hotkey('alt', 'f4')


@event.on("test")
def testAction():
    print("asdf")

@event.on("start")
def logGest(hand, gest):
    return
    #print(f"start gesture: {hand} {gest}")

@event.on("multigesture")
def logMultiGest(gest):
    print(f"Multi-gesture: {gest}")

# gesture modes like mouse movement or quite mode