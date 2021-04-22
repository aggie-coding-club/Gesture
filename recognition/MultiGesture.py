from Emitter import event 
##
class MultiGesture():
    def __init__(self, name, gestures):
        self.name = name
        self.gestures = gestures
        self.on = 0

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
            event.emit("multigesture", gest=self.name)
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
counting = ["Peace", "3 fingers", "4 fingers", "Open Hand"]
countToFive = MultiGesture("Count to 5", counting)
event.on("start", countToFive.on_start_gest)

# for g in counting:
#     event.emit("start", hand="right", gest=g)