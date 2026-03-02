import { app, BrowserWindow } from "electron";
import { APP_CONFIG } from "./config";
import { registerShortcuts } from "./security/shortcut.service";
import { protectNavigation } from "./security/navigation.guard";
import { monitorFocus } from "./security/focus.monitor";

let mainWindow: BrowserWindow;
let examActive = true;

function createWindow() {
  mainWindow = new BrowserWindow({
    fullscreen: true,
    kiosk: true,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      devTools: false
    }
  });

  mainWindow.loadURL(APP_CONFIG.BASE_URL + APP_CONFIG.LOGIN_PATH);

  protectNavigation(mainWindow);
  registerShortcuts(mainWindow);
  monitorFocus(mainWindow);
}

app.whenReady().then(() => {
  createWindow();
});