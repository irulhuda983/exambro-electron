import { BrowserWindow } from "electron";

export function monitorFocus(win: BrowserWindow) {
  win.on("blur", () => {
    console.log("User keluar dari aplikasi!");
    // nanti bisa kirim API ke server
  });
}