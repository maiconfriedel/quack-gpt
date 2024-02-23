import AutoLaunch from "auto-launch";
import { app } from "electron";

export const autoLaunch = new AutoLaunch({
  name: "Quack GPT",
  path: app.getPath("exe"),
});
