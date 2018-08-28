import React, { Component } from 'react';
import './Interface-worker.css';
import { Collapse, Button} from 'reactstrap';
import ModalExample  from './modal.js';
import { Link } from 'react-router-dom';
import Instrucciones  from './Instrucciones.js';
import { refGeneralCategory, dbUser, refAllUsers} from './DataBase.js'


class EmailBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listUsers: []
    };
  }

  componentDidMount(){
    refAllUsers.on("value", (snapshot) => {
        let AllUsers = snapshot.val();
        let listOfUsers = AllUsers.map(val => {return val.User.UserInfo.Username})
        this.setState({listUsers: listOfUsers})
    });
  }

  render(){
    return (
      <header className="Bar-header">
        <div >{this.state.listUsers[this.props.numberUser]}</div>
        <Link to="/">
          <div className="ButtonLogOut">Log Out</div>  
        </Link>    
      </header> 
    );
  }
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
                {this.state.category.map(val => {
                  if(val.categoryDefinition.length > 112){
                    return <li key={val.categoryName}>
                      {val.categoryDefinition.substring(0,112)}...<ModalExample post={val.categoryDefinition} ind={val.categoryName} butN={"Show More"}/>
                    </li>
                  }else{
                    return <li key={val.categoryName}>
                      {val.categoryDefinition}
                    </li>
                  }
                })}
              </ul>
              <ul className="listDefiniton">
                <li className="tittleList">Example</li>
                {this.state.category.map(i => {
                  return <li key={i.categoryName}>
                    {i.categoryExample}
                  </li>
                })}
              </ul>
            </div>
        </Collapse>
      <div className="ShowTx">
      <div>Show the definition of the categories.</div>
      <Button color="primary" onClick={this.toggle} style={{marginTop: "20px"}}>Show</Button>
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
    var refUserPost = dbUser.ref("Users/"+this.props.numberUser+"/User/PostAndCategory/Post");
    var refUserCategory = dbUser.ref("Users/"+this.props.numberUser+"/User/PostAndCategory/Category");

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
    var refUserPost = dbUser.ref("Users/"+this.props.numberUser+"/User/PostAndCategory/Post");
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
              {/* SECCION DEL NUMERO DE POSTS*/}
              <ul className="listNumberPost" >
                <li className="tittleListPC" style={{padding:"8px 5px 8px 3px"}}>No.</li>
                  {this.state.post.map((val, i) => {
                    return <li key={i}>{i+1}</li>
                  })}
              </ul>
              <ul className="listPost">
                <li className="tittleListPC">Post</li>
                  {this.state.post.map((val, i) => {
                    if(val.post.length > 102){
                      return <li key={i}>
                        {val.post.substring(0,102)}...<ModalExample post={val.post} ind={"Post Number " + (i+1)} butN={"Show More"}/>
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

class WorkerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statePage: 0
    };
  }
  changeState() {
    this.setState({ statePage: 1 });
  }
  render() {
    var Page = <div/>
    if(this.state.statePage === 0){
      Page = <Instrucciones button={<button onClick={this.changeState.bind(this)}>Entendido</button>}/>
    }else if(this.state.statePage === 1){
      Page = <div className="divAPC"><EmailBar numberUser={this.props.user}/><AsideBar/><PostAndCategory numberUser={this.props.user}/></div>
    }

    return (
        Page
    )
  }
}

export default WorkerPage;