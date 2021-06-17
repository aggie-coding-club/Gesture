
'''
### CONFIGURING ACTIONS ###
Each action is formatted:
    "action": ["hand", "gesture", "path_to_executable"]

Options for hands: Left, Right

Options for gestures: 
1 finger, Peace, 3 fingers, 4 fingers, Open Hand, Fist, Gig Em, Thumbs Down, Rock and Roll, Horns Down

There are some examples already written below.
'''
actions = {
    "chrome": [
        "Right",
        "Peace",
        "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"
    ],
    "Vision-Controls": [
        "Right",
        "Gig Em",
        "https://github.com/aggie-coding-club/Vision-Controls"
    ],
    "close": [ # Closes application that you are currently on. (Caution: you can close out of this application with this too)
        "Right",
        "1 finger",
        "x"
    ]
}

settings = {
    "camera_index": 0, # 0 should be the default for built in cameras. If this doesn't work, try 1.
}