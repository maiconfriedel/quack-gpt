import { Event } from "electron";
import { mainWindow } from "../main";

export function handleQuit(event: Event, input: Electron.Input) {
  if (input.key === "Escape") {
    event.preventDefault();
    mainWindow.hide();
  }
}
