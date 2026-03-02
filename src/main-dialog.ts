import { app, BrowserWindow, ipcMain, globalShortcut } from "electron";
import path from "path";
import { registerShortcuts } from "./security/shortcut.service";
import { protectNavigation } from "./security/navigation.guard";
import { monitorFocus } from "./security/focus.monitor";

let mainWindow: BrowserWindow;
const isDev = !app.isPackaged;

function createServerDialog(): Promise<string> {
  return new Promise((resolve) => {
    const dialogWindow = new BrowserWindow({
      width: 400,
      height: 220,
      resizable: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
      }
    });

    const htmlPath = isDev ? path.join(__dirname, "../html/server-dialog.html") : path.join(__dirname, "html/server-dialog.html");
    dialogWindow.loadFile(htmlPath);

    ipcMain.once("server-selected", (_, url) => {
      dialogWindow.close();

      if (!url || url.trim() === "") {
        resolve("https://cbt.smkalkyai.sch.id");
      } else {
        resolve(url);
      }
    });
  });
}

function createMainWindow(serverUrl: string) {
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

  mainWindow.loadURL(serverUrl + "/login.php");

  // ⬇️ SEMUA FITUR TETAP ADA
  protectNavigation(mainWindow);
  registerShortcuts(mainWindow);
  monitorFocus(mainWindow);
}

app.whenReady().then(async () => {
  const serverUrl = await createServerDialog();
  createMainWindow(serverUrl);
});

app.on("will-quit", () => {
  // penting supaya tidak double register shortcut
  globalShortcut.unregisterAll();
});