import { app, BrowserWindow, ipcMain, Tray } from "electron";
import path from "node:path";
import {
  autoLaunch,
  buildTrayMenu,
  handleQuit,
  handleSubmit,
  registerShortcut,
} from "./functions";

process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

export const iconPath = path.join(process.env.VITE_PUBLIC, "icon.png");

const gotTheLock = app.requestSingleInstanceLock();

export let mainWindow: BrowserWindow;
let tray: Tray;

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

function createWindow() {
  mainWindow = new BrowserWindow({
    icon: path.join(iconPath),
    height: 100,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    width: 600,
    frame: false,
    autoHideMenuBar: true,
    resizable: true,
    show: false,
  });

  if (VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    mainWindow.loadFile(path.join(process.env.DIST, "index.html"));
  }

  // win.webContents.openDevTools();

  mainWindow.webContents.on("before-input-event", (ev, input) =>
    handleQuit(ev, input)
  );
}

function createTray() {
  tray = new Tray(iconPath);
  tray.setToolTip("Quack GPT is running! 🦆");
  tray.on("click", () => {
    mainWindow.show();
  });
  tray.setContextMenu(buildTrayMenu());
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  createWindow();
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", () => {
    if (mainWindow) {
      if (!mainWindow.isVisible()) mainWindow.show();
      mainWindow.focus();
    }
  });

  app.whenReady().then(() => {
    ipcMain.on("handle-submit", (ev, data) => handleSubmit(ev, data));
    createWindow();
    createTray();
    registerShortcut();
    if (app.isPackaged) {
      autoLaunch.isEnabled().then((isEnabled) => {
        if (!isEnabled) autoLaunch.enable();
      });
    }
  });
}
