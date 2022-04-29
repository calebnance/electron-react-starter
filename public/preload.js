// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge, ipcRenderer } = require('electron');

process.once('loaded', () => {
  contextBridge.exposeInMainWorld('versions', process.versions);

  contextBridge.exposeInMainWorld('electron', {
    ipcRenderer: {
      ping() {
        console.log('ping');
        ipcRenderer.send('ipc', { type: 'pong' });
      },
      selectImages() {
        ipcRenderer.send('ipc', { type: 'select-images' });
      },
      on(channel, func) {
        const validChannels = ['ipc'];
        if (validChannels.includes(channel)) {
          console.log('ON CHANNEL');
          // deliberately strip event as it includes `sender`
          ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
      },
      once(channel, func) {
        const validChannels = ['ipc'];
        if (validChannels.includes(channel)) {
          console.log('ONCE CHANNEL');
          // deliberately strip event as it includes `sender`
          ipcRenderer.once(channel, (event, ...args) => func(...args));
        }
      }
    }
  });
});
