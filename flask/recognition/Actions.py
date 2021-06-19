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