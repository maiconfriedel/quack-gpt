import { app, BrowserWindow, ipcMain, Tray } from "electron";
import path from "node:path";
import {
  buildTrayMenu,
  handleQuit,
  handleSubmit,
  registerShortcut,
} from "./functions";
import { autoLaunch } from "./functions/auto-launch";

process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

export const iconPath = path.join(process.env.VITE_PUBLIC, "icon.png");

let win: BrowserWindow;
let tray: Tray;

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

function createWindow() {
  win = new BrowserWindow({
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

  tray = new Tray(iconPath);
  tray.setToolTip("Quack GPT is running! 🦆");
  tray.on("click", () => {
    win.show();
  });
  tray.setContextMenu(buildTrayMenu(win));

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, "index.html"));
  }

  // win.webContents.openDevTools();

  win.webContents.on("before-input-event", (ev, input) =>
    handleQuit(ev, input, win)
  );
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(() => {
  ipcMain.on("handle-submit", (ev, data) => handleSubmit(ev, data, win));
  createWindow();
  registerShortcut(win);
  if (app.isPackaged) {
    autoLaunch.isEnabled().then((isEnabled) => {
      if (!isEnabled) autoLaunch.enable();
    });
  }
});
