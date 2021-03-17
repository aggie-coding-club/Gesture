import webbrowser
import os, getpass


# ------------- WEB BROWSER -------------

def registerBrowsers():
    webbrowser.register("chrome", None, webbrowser.BackgroundBrowser("C://Program Files (x86)//Google//Chrome//Application//chrome.exe"))
    webbrowser.register("firefox", None, webbrowser.BackgroundBrowser("C://Program Files (x86)//Google//Chrome//Application//chrome.exe"))
    webbrowser.register("chromeMac", None, webbrowser.BackgroundBrowser("open -a /Applications/Google\ Chrome.app"))

# open web browsers with specified url
def openChrome(url):
    webbrowser.get("chrome").open(url)

def openFirefox(url):
    webbrowser.get("firefox").open(url)




# --------------- GENERAL ---------------

def openProgram(path):
    os.startfile(path)

def openSpotify():
    username = getpass.getuser()
    os.startfile("C://Users//" + username + "//AppData//Roaming//Spotify//Spotify.exe")




# driver code
if __name__ == "__main__":
    registerBrowsers()
    # openChrome("www.google.com")
    # openSpotify()
