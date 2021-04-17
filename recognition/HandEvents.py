# Only used for testing log file made by logFile function in HandEvents.py
# %%
import json
inFile = open("log.json")
gestures = json.load(inFile)


print("\n".join([str(x) for x in gestures]))
# %%
gestureEvents = []
prevGests= []
currGest = None
for frame, gesture in enumerate(gestures): # simulates per frame gestures
    # if gesture is diff from currGesture and the previous 3 gestures are the same as the current gesture
    if(gesture != currGest and all(x == gesture for x in prevGests)):
        gestureEvents.append(f"{frame} Key Down: {gesture}")
        currGest = gesture
    
    # the 3 previous Gestures
    prevGests.append(gesture)
    prevGests = prevGests[-3:]
print("\n".join(gestureEvents))