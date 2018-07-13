import React, { Component } from 'react';
import './App.css';
import { EmailBar, AsideBar, PostAndCategory } from './Components/Interface.js';


class App extends Component {
  render() {
    return (
      <div className="App">
        <EmailBar/>
        <AsideBar/>
        <PostAndCategory/>
      </div>
    );
  }
}

export default App;
