import { BrowserWindow, shell } from "electron";

export function handleSubmit(
  _: Electron.IpcMainEvent,
  data,
  mainWindow: BrowserWindow
) {
  shell.openExternal(`https://chat.openai.com?q=${encodeURI(data)}`);
  mainWindow.hide();
}
