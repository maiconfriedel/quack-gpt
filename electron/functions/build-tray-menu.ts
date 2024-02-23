import { Menu, app, nativeImage } from "electron";
import { autoLaunch } from ".";
import { iconPath, mainWindow } from "../main";

export async function buildTrayMenu() {
  const startOnBoot = await autoLaunch.isEnabled();

  return Menu.buildFromTemplate([
    {
      label: "Open Quack GPT",
      icon: nativeImage.createFromPath(iconPath).resize({ width: 16 }),
      click: () => {
        mainWindow.show();
      },
    },
    {
      label: "Start on boot",
      type: "checkbox",
      checked: startOnBoot,
      click: (ev) => {
        if (ev.checked) autoLaunch.enable();
        else autoLaunch.disable();
      },
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
