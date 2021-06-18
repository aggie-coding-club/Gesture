# import pyautogui
# import time
import recognition.application_launch as app
from pymitter import EventEmitter
event = EventEmitter()

preferred_broswer = ""

settings = {
    "camera_index": 1, # 0 should be the default for built in cameras. If this doesn't work, try 1.
}

# start event, when the gesture is first made
# :hand: left or right
# :gest: the gesture
@event.on("start")
def openProject(configData, hand, gest):

    # for x in config.actions.keys():
    #     if (config.actions[x][2] == 'x'): return

    #     elif config.actions[x][2].startswith("http"):
    #         if (config.actions[x][0].lower() == hand.lower() and config.actions[x][1].lower() == gest.lower()):
    #             app.openDefault(config.actions[x][2])

    #     elif (config.actions[x][0].lower() == hand.lower() and config.actions[x][1].lower() == gest.lower()):
    #         try:
    #             app.openProgram(config.actions[x][2])
    #         except:
    #             print("No program at path:", config.actions[x][2])

    for x in configData:
        if (x["gesture"] == gest and x["hand"] == hand):
            action = x["action"]
            if (action == 'x'): return
            elif action.startswith("http"):
                app.openDefault(action)
            else:
                try:
                    app.openProgram(action)
                except:
                    print("No program at path:", action)

# @event.on("start")
# def closeProgram(hand, gest):
#     if (config.actions["close"][0].lower() == hand.lower() and config.actions["close"][1].lower() == gest.lower()):
#         pyautogui.hotkey('alt', 'f4')


# @event.on("test")
# def testAction():
#     print("asdf")

# @event.on("start")
# def logGest(hand, gest):
#     return
#     #print(f"start gesture: {hand} {gest}")

# @event.on("multigesture")
# def logMultiGest(gest):
#     print(f"Multi-gesture: {gest}")

# gesture modes like mouse movement or quite mode