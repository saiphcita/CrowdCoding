import React, { Component } from 'react';
import './CSS/AsideBar.css';
import { Collapse, Button} from 'reactstrap';
import ListCategory  from '../Components/Tools/ListCategory.js'
import { refGeneralCategory } from './Tools/DataBase.js'

class AsideBar extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { 
      collapse: false,
      category: [],
    };
  }

  componentDidMount() {
    refGeneralCategory.on("value", (snapshot) => {
      let category = snapshot.val();
      this.setState({category : category})
    });
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    return (
      <div className="aside">
        <Collapse isOpen={this.state.collapse} className="collapseEstilo">
            <Button color="primary" onClick={this.toggle} className="buttonBack">Go Back</Button>
            <div style={{margin:"18px 0 0 8px", float:"left"}}>
              <ListCategory/>
            </div>
        </Collapse>
      <div className="ShowTx">
      <div>Show the definition of the categories.</div>
      <Button color="primary" onClick={this.toggle} style={{marginTop: "12px"}}>Show</Button>
      </div>
    </div>
    );
  }
}

export default AsideBar;