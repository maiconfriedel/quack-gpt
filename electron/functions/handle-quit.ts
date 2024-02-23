import { BrowserWindow, Event } from "electron";

export function handleQuit(
  event: Event,
  input: Electron.Input,
  mainWindow: BrowserWindow
) {
  if (input.key === "Escape") {
    event.preventDefault();
    mainWindow.hide();
  }
}
