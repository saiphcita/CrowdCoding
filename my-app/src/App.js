import React, { Component } from 'react';
import './App.css';
import { EmailBar, AsideBar, PostAndCategory, Definitiondiv } from './Components/Interface.js';


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
