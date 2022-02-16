import { app, BrowserWindow, ipcMain, nativeTheme } from 'electron'
import path from 'path'
import os from 'os'
import { menubar } from 'menubar'

// needed in case process is undefined under Linux
const platform = process.platform || os.platform()

try {
  if (platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    require('fs').unlinkSync(path.join(app.getPath('userData'), 'DevTools Extensions'))
  }
}
catch (_) { }

const menubarIcon = platform === 'win32' ? 'MenuBarIconTemplateWindow.png' : 'MenuBarIconTemplate.png'

const mb = menubar({
  index: process.env.APP_URL,
  icon: path.resolve(__dirname, `icons/${menubarIcon}`),
  browserWindow: {
    width: 270,
    height: 170, // tray icon
    minWidth: 270,
    minHeight: 170,
    maxWidth: 270,
    maxHeight: 170,
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      // More info: /quasar-cli/developing-electron-apps/electron-preload-script
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD)
    }
  }
})
mb.on('ready', () => {
  console.log('app is ready')
})

ipcMain.handle('quit-app', () => {
  app.quit()
})

/* let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    icon: path.resolve(__dirname, 'icons/icon.png'),
    width: 270,
    height: 170, // tray icon
    minWidth: 270,
    minHeight: 170,
    maxWidth: 270,
    maxHeight: 170,
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      // More info: /quasar-cli/developing-electron-apps/electron-preload-script
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD)
    }
  })

  mainWindow.loadURL(process.env.APP_URL)

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools()
  }
  else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow.webContents.closeDevTools()
    })
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
*/
