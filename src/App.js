import React, { Component } from 'react';
import './App.css';
import WorkerPage from './Components/Interface-worker.js';
import StartInterface from './Components/Start-interface.js';


class App extends Component {
  render() {
    return (
      <div className="App">
      <StartInterface />
      </div>
    );
  }
}

export default App;
