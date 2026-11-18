const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('villegas', {
  openAudio: () => ipcRenderer.invoke('audio:open'),
});
