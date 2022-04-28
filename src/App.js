import * as React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const onClick = () => {
    window.electron.ipcRenderer.ping();
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <p>Edit &quot;src/App.js&quot; and save to reload.</p>

        <button onClick={onClick} type="button">
          Test Ping
        </button>
      </header>
    </div>
  );
}

export default App;
