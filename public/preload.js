// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge, ipcRenderer } = require('electron');

// As an example, here we use the exposeInMainWorld API to expose the browsers
// and node versions to the main window.
// They'll be accessible at "window.versions".
process.once('loaded', () => {
  contextBridge.exposeInMainWorld('versions', process.versions);

  contextBridge.exposeInMainWorld('electron', {
    ipcRenderer: {
      ping() {
        console.log('ping');
        ipcRenderer.send('ipc', 'pong');
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

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
});
