from pymitter import EventEmitter
import webbrowser
import os, getpass
from ctypes import cast, POINTER
from comtypes import CLSCTX_ALL
from pycaw.pycaw import AudioUtilities, IAudioEndpointVolume

event = EventEmitter()
username = getpass.getuser()

devices = AudioUtilities.GetSpeakers()
interface = devices.Activate(
    IAudioEndpointVolume._iid_, CLSCTX_ALL, None)

volume = cast(interface, POINTER(IAudioEndpointVolume))

# start event, when the gesture is first made
# :hand: left or right
# :gest: the gesture
@event.on("start")
def openProject(configData, hand, gest):
    for x in configData:
        if (x["gesture"] == gest and x["hand"] == hand):
            action = x["action"]
            alias = x["alias"]
            if (action == 'x'): return
            elif action.startswith("http"):
                webbrowser.open(action)
            elif alias == "Open Chrome":
                os.startfile(action)
            elif alias.startswith("Open"):
                try:
                    os.startfile("C://Users//" + username + action)
                except:
                    os.startfile(action)
                    print("No program at path:", "C://Users//" + username + action)
            elif alias.startswith("Volume"):
                # current = volume.GetMasterVolumeLevel()
                if (alias[7] == 'M'):
                    volume.SetMute(1, None)
                else:
                    volume.SetMute(0, None)




settings = {
    "camera_index": 1, # 0 should be the default for built in cameras. If this doesn't work, try 1.
}