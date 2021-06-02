const { app, BrowserWindow,} = require('electron')
const path = require('path')
const url = require('url')
let {PythonShell} = require('python-shell') /*https://www.npmjs.com/package/python-shell*/

//packaging doesnt work 5/16/21, displays only white screen when bundled, could be serving the html file wrong somehow


function createWindow() {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      nodeIntegration: true
    },
    icon: __dirname + '/visioncontrols.ico'
  })

  //to get access to Chrome dev tools -------COMMENT TO BUILD APP --------
  //win.webContents.openDevTools()

  //build app ----- UNCOMMENT TO BUILD APP --------
  //win.loadURL(`file://${path.join(__dirname, '../build/index.html')}`)

  win.loadURL(`file://${path.join(__dirname, '../public/index.html')}`)

  //developer -------COMMENT TO BUILD APP --------
  //win.loadURL('http://localhost:3000/')

}

app.whenReady().then(createWindow)
console.log(__dirname)
//when the main window is ran, it will run the python file for openCV which opens as another window (for now) 
/*  ../recognition/HandTracker.py for dev    */
PythonShell.run('../recognition/HandTracker.py',null, (err) => {
  if (err) throw err;
  //runs once loop is done
  console.log('camera feed shut off');
  });


//quits app when you try to exit out
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

//when app ready to go, electron window opens
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
