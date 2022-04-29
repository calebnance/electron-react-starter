import * as React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const onClick = () => {
    window.electron.ipcRenderer.ping();
  };

  const selectImages = () => {
    window.electron.ipcRenderer.selectImages();
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <p>Edit &quot;src/App.js&quot; and save to reload.</p>

        <button onClick={onClick} type="button">
          Test Ping
        </button>

        <button onClick={selectImages} type="button">
          Select Images
        </button>
      </header>
    </div>
  );
}

export default App;
