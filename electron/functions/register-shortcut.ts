import { globalShortcut } from "electron";
import { mainWindow } from "../main";

export function registerShortcut() {
  globalShortcut.register("Alt+CommandOrControl+A+I", () => {
    mainWindow.show();
  });
}
