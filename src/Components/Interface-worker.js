import React, { Component } from 'react';
import './Interface-worker.css';
import { Collapse, Button} from 'reactstrap';
import ModalExample  from './modal.js'
import firebase from 'firebase/app';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyAYStRsZqUp9u5d6uJE2qXEa1A_0QsilWk",
  authDomain: "crowd-codding.firebaseapp.com",
  databaseURL: "https://crowd-codding.firebaseio.com",
  projectId: "crowd-codding",
  storageBucket: "",
  messagingSenderId: "852929625643"
};
const app = firebase.initializeApp(config);
const db = app.database()

// Get a database refzerence to our posts -- Aqui estan los JSON de los post y las categorias

//var refGeneralPosts = db.ref("0/0/Post");
var refGeneralCategory = db.ref("0/General/1/Category");
var refUserPost = db.ref("1/Users/1/AvailablePosts");
var refUserCategory = db.ref("1/Users/2/AvailableCategory");


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
            <div className="DivDefinition">
              <ul className="listDefiniton">
                <li className="tittleList">Category</li>
                {this.state.category.map(i => {
                  return <li key={i.categoryName}>
                    {i.categoryName}
                  </li>
                })}
              </ul>
              <ul className="listDefiniton">
                <li className="tittleList">Definition</li>
                {this.state.category.map(i => {
                  return <li key={i.categoryName}>
                    {i.categoryDefinition}
                  </li>
                })}
              </ul>
            </div>
        </Collapse>
      <div>
      <div className="ShowTx">Show the definition of the categories.</div>
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
      post: [],
      value: [],
      category: [],
    };
  }

  componentDidMount() {
    refUserPost.on("value", (snapshot) => {
      let posts = snapshot.val();
      this.setState({post : posts})
      this.setState({value: posts.map(val => {return val.category})})
   });
    refUserCategory.on("value", (snapshot) => {
      let category = snapshot.val();
      this.setState({category : category})
    });
  }


  saveChange(){
    let newPost = this.state.post;
    for (let i = 0; i < newPost.length; i++) { 
      newPost[i].category = this.state.value[i]
    }
    this.setState({post: newPost});
    refUserPost.set(this.state.post)
  }


  render() {
    return (
      <div>
        <Button outline color="success" className="buttonSave" onClick={()=>this.saveChange()}>Save Changes</Button>
        <div className="DivPostCategory">
              <ul className="listPost">
                <li className="tittleListPC">Post</li>
                  {this.state.post.map((val, i) => {
                    if(val.post.length > 115){
                      return <li key={i}>
                        {val.post.substring(0,115)}...<ModalExample post={val.post} ind={i+1}/>
                      </li>
                    }else{
                      return <li key={i}>
                        {val.post}
                      </li>
                    }
                  })}
              </ul>
              <ul className="listCategory">
                <li className="tittleListPC">Category</li>
                  {this.state.post.map((val, i) => { 
                    return <li key={i}>
                        <SelectCategory
                        id={i}
                        listCategory={this.state.category}
                        categoryValue={this.state.value[i]}
                        handleChange={(event) =>{
                          let newValue = this.state.value.slice();
                          newValue[i] = event.target.value;
                          this.setState({value: newValue});
                        }}
                        />
                      </li>
                    })}
              </ul>
        </div>
      </div>
    );
  }
}

class SelectCategory extends Component {
  render() {
    return (
      <div>
        <select id={this.props.id} value={this.props.categoryValue} onChange={this.props.handleChange}>
          {this.props.listCategory.map((val, i) => {
            return <option key={i} value={i}>
              {val}
            </option>
          })}
        </select>
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