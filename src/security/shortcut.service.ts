import { globalShortcut, BrowserWindow, app } from "electron";

export function registerShortcuts(mainWindow: BrowserWindow) {
  const blockedShortcuts = [
    "F12",
    "CommandOrControl+Shift+I",
    "CommandOrControl+R",
    "F5",
    "Alt+Tab",
    "Control+Escape"
  ];

  blockedShortcuts.forEach(shortcut => {
    globalShortcut.register(shortcut, () => {});
  });

  // Shortcut untuk reload
  globalShortcut.register("CommandOrControl+Shift+R", () => {
    mainWindow.webContents.reloadIgnoringCache();
  });

  // Shortcut untuk close
  globalShortcut.register("CommandOrControl+Shift+Q", () => {
    app.exit(0);
  });
}