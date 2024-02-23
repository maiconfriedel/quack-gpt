import { BrowserWindow, globalShortcut } from "electron";

export function registerShortcut(mainWindow: BrowserWindow) {
  globalShortcut.register("Alt+CommandOrControl+A+I", () => {
    mainWindow.show();
  });
}
