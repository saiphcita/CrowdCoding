import React, { Component } from 'react';

import Instrucciones  from './Tools/Instrucciones.js'
import NavBar  from './Tools/NavBar.js'
import AsideBar  from './Tools/AsideBar.js'
import PostAndCategory  from './Tools/PostAndCategory.js'
import PagePay  from './Tools/PagePay.js'

class WorkerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statePage: 0
    };
  }

  changeState() { this.setState({ statePage: 1 }) };
  changeState2() { this.setState({ statePage: 2 }) };

  render() {
    var Page = <div/>

    if(this.state.statePage === 0){
      Page = <Instrucciones button={<button onClick={this.changeState.bind(this)}>Go Ahead</button>}/>
    }else if(this.state.statePage === 1){
      Page = <div style={{height:"100%"}}><NavBar/><AsideBar/><PostAndCategory numberUser={this.props.user}  change={this.changeState2.bind(this)}/></div>
    }else if(this.state.statePage === 2){
      Page = <div style={{height:"100%"}}><PagePay numberUser={this.props.user}/></div>
    };

    return Page
  }
}

export default WorkerPage;