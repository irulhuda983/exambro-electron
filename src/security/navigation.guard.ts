import { BrowserWindow } from "electron";
import { APP_CONFIG } from "../config";

export function protectNavigation(win: BrowserWindow) {
  win.webContents.on("will-navigate", (event, url) => {
    if (!url.startsWith(APP_CONFIG.BASE_URL)) {
      event.preventDefault();
    }
  });

  win.webContents.on("context-menu", (event) => {
    event.preventDefault();
  });
}