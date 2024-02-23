import { shell } from "electron";
import { mainWindow } from "../main";

export function handleSubmit(_: Electron.IpcMainEvent, data) {
  shell.openExternal(`https://chat.openai.com?q=${encodeURI(data)}`);
  mainWindow.hide();
}
