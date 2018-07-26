import React, { Component } from 'react';
import { Collapse, Button} from 'reactstrap';
import './Interface-worker.css';


const PossibleCategorys = require('./category.json');
const PossiblePosts = require('./post.json')


function EmailBar (props){
    return (
        <header className="Bar-header">
          <div className="Emailside">Here will be the EMAIL</div>
          <div className="ButtonLogOut">Here will be the LOG OUT</div>      
        </header> 
    );
}


class AsideBar extends Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    return (
      <div className="aside">
        <Collapse isOpen={this.state.collapse} className="collapseEstilo">
            <Button color="primary" onClick={this.toggle} className="buttonBack">Go Back</Button>
            <div className="DivDefinition">
              <ul className="listDefiniton">
                <li className="tittleList">Category</li>
                {PossibleCategorys.map(i => {return <li>{i.categoryName}</li>})}
              </ul>
              <ul className="listDefiniton">
                <li className="tittleList">Definition</li>
                {PossibleCategorys.map(i => {return <li>{i.categoryDefinition}</li>})}
              </ul>
            </div>
        </Collapse>
      <div>
      <p>Show the definition of the categories.</p>
      <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Show</Button>
      </div>
    </div>
    );
  }
}

class PostAndCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: "",
      list: []
    };
  }

  componentDidMount() {
    this.hydrateStateWithLocalStorage();

    // add event listener to save state to localStorage
    // when user leaves/refreshes the page
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );

    // saves if component has a chance to unmount
    this.saveStateToLocalStorage();
  }

  hydrateStateWithLocalStorage() {
    // for all items in state
    for (let key in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key);

        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          // handle empty string
          this.setState({ [key]: value });
        }
      }
    }
  }

  saveStateToLocalStorage() {
    // for every item in React state
    for (let key in this.state) {
      // save to localStorage
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  updateInput(key, value) {
    // update react state
    this.setState({ [key]: value });
  }

  addItem() {
    // create a new item with unique id
    const newItem = {
      id: 1 + Math.random(),
      value: this.state.newItem.slice()
    };

    // copy current list of items
    const list = [...this.state.list];

    // add the new item to the list
    list.push(newItem);

    // update state with new list, reset the new item input
    this.setState({
      list,
      newItem: ""
    });
  }

  deleteItem(id) {
    // copy current list of items
    const list = [...this.state.list];
    // filter out the item being deleted
    const updatedList = list.filter(item => item.id !== id);

    this.setState({ list: updatedList });
  }
  render() {
    return (
      <div>
        <Button outline color="success" className="buttonSave">Save Changes</Button>
        <div className="DivPostCategory">
              <ul className="listPC">
              <li className="tittleListPC">Post</li>
              {PossiblePosts.map(i => {return <li>{i.Post}</li>})}
              </ul>
              <ul className="listPC">
              <li className="tittleListPC">Category</li>
              {PossiblePosts.map(i => { 
                  return <li>
                              <select>
                              <option selected value="defect">Select Category</option>
                              {PossibleCategorys.map(i => {return<option value="defect">{i.categoryName}</option>})}
                              </select>
                          </li>
                  })}
              </ul>
        </div>
      </div>
    );
  }
}

function  WorkerPage (props) {
  return (
      <div className="divAPC">
        <EmailBar/>
        <AsideBar/>
        <PostAndCategory/>
      </div>
  );
}


export default WorkerPage;