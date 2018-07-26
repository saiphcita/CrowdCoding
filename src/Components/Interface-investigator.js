import React, { Component } from 'react';
import { Collapse, Button} from 'reactstrap';
import './Interface-investigator.css';



import firebase from 'firebase';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyCqVjqpMNZ4k46WtiyFMx1G88yBNS-d-7M",
  authDomain: "crow-codding.firebaseapp.com",
  databaseURL: "https://crow-codding.firebaseio.com",
  projectId: "crow-codding",
  storageBucket: "crow-codding.appspot.com",
  messagingSenderId: "1022422549646"
};

const app = firebase.initializeApp(config);
const db = app.database().ref()

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

  PushToJSONAndDeleteAllItem() {
    this.state.list.map(i => {
      const myObj = {"Post":i.value}
      PossiblePosts.push(myObj)
    })
    this.setState({ list: [] });
  }
  render() {
    return (
      <div>
        <Button 
          outline 
          color="success" 
          onClick={() => this.PushToJSONAndDeleteAllItem()}
          className="buttonSave"
          >
          Save Changes
          </Button>
        <div className="DivAddPost">
          Add a Post to the list
          <br/>
          <input
            type="text"
            placeholder="Type Post here"
            value={this.state.newItem}
            onChange={e => this.updateInput("newItem", e.target.value)}
          />
          <button
            onClick={() => this.addItem()}
            disabled={!this.state.newItem.length}
          >
            Add
          </button>
          <br/> 
          <ul> {this.state.list.map(item => {
              return (
                <div>
                <li key={item.id}>
                  {item.value}
                </li>
                  <button onClick={() => this.deleteItem(item.id)}>
                    Remove
                  </button>
                </div>
              );
            })}
          </ul>
        </div>
        <div className="DivPostCategory">
              <ul className="listPC">
              <li className="tittleListPC">Post</li>
              {PossiblePosts[0].Post.map(i => {return <li>{i}</li>})}
              </ul>
              <ul className="listPC">
              <li className="tittleListPC">Category</li>
              {PossiblePosts[0].Post.map(i => { 
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