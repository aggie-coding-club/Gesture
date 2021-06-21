"use strict";

// Import parts of electron to use
const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const fs = require("fs");
const url = require("url");
const { CATCH_ON_MAIN,
  SEND_TO_RENDERER,
  CREATE_FILE,
  BUTTON_CLICK,
  OPEN_FILE_EXPLORER,
  SEND_FILE_PATH
} = require("./etc/constants");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Keep a reference for dev mode
let dev = false;
if (process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath)) {
  dev = true;
}

function createWindow() {
  // load flask webserver
  //require("child_process").spawn("python", ["../flask/app.py"]);

  mainWindow = new BrowserWindow({
    width: 840,
    height: 480,
    autoHideMenuBar: true,

    frame: false,
    resizable: false,
    maximizable: false,
    fullscreenable: false,
    icon: "./src/assets/transparent.ico",
    webPreferences: {
      nodeIntegration: true,
    },
  });

  let indexPath;
  if (dev && process.argv.indexOf("--noDevServer") === -1) {
    indexPath = url.format({
      protocol: "http:",
      host: "localhost:4000",
      pathname: "index.html",
      slashes: true,
    });
  } else {
    indexPath = url.format({
      protocol: "file:",
      pathname: path.join(__dirname, "dist", "index.html"),
      slashes: true,
    });
  }
  mainWindow.loadURL(indexPath);

  // Don't show until we are ready and loaded
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
    // Open the DevTools automatically if developing
    // if (dev) {
    //   mainWindow.webContents.openDevTools();
    // }
  });

  // Emitted when the window is closed.
  mainWindow.on("closed", function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

//Catch home button being clicked and send message to console
//...Electron receiving message from React...
ipcMain.on(BUTTON_CLICK, (event, arg) => {
  console.log("This button was clicked", arg);
  //...Electron sending message to React...
  mainWindow.send(SEND_TO_RENDERER, "Button Click received by Electron");
});

//open file explorer
ipcMain.on(OPEN_FILE_EXPLORER, (event, arg) => {
  console.log("opening file explorer")
  dialog.showOpenDialog(function(filePaths) {
    console.log(filePaths[0]);
    mainWindow.send(SEND_FILE_PATH, filePaths[0])

  })
})

//...................EXAMPLES................................
// ipcMain.on(CATCH_ON_MAIN, (event, arg) => {
//   console.log('this button was clicked', arg);
//   mainWindow.send(SEND_TO_RENDERER, 'pong');
// })
//
// ipcMain.on(CREATE_FILE, (event, arg) => {
//   console.log("writing file...");
//   fs.writeFile('tmp.js', arg, function (err) {
//     console.log(err);
//   });
// })
//...........................................................

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
