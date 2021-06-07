const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 550,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
    },
    icon: __dirname + "/visioncontrols.ico",
  });

  //to get access to Chrome dev tools -------COMMENT TO BUILD APP --------
  win.webContents.openDevTools();

  //build app ----- UNCOMMENT TO BUILD APP --------
  //win.loadURL(`file://${path.join(__dirname, '../build/index.html')}`)

  //win.loadURL(`file://${path.join(__dirname, '../public/index.html')}`)

  //developer -------COMMENT TO BUILD APP --------
  win.loadURL("http://localhost:3000/");
}

app.whenReady().then(createWindow);

//quits app when you try to exit out
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

//when app ready to go, electron window opens
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
