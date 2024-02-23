import { BrowserWindow, Menu, app, dialog, nativeImage } from "electron";
import { iconPath } from "../main";

export function buildTrayMenu(mainWindow: BrowserWindow) {
  return Menu.buildFromTemplate([
    {
      label: "Open Quack GPT",
      icon: nativeImage.createFromPath(iconPath).resize({ width: 16 }),
      click: () => {
        mainWindow.show();
      },
    },
    {
      label: "Settings",
      type: "normal",
      click: async () => {
        const result = await dialog.showMessageBox({
          message: "clicked",
          type: "info",
          buttons: ["Ok", "Cancel"],
        });

        console.log(result);
      },
    },
    {
      label: "Help",
      type: "normal",
    },
    {
      type: "separator",
    },
    {
      label: "Quit",
      type: "normal",
      click: () => {
        app.quit();
      },
    },
  ]);
}
