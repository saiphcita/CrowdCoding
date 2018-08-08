import React, { Component } from 'react';
import './Start-interface.css';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import { Link } from 'react-router-dom';
import { refAllUsers, refGeneralPosts, refGeneralCategory } from './DataBase.js'

class StartInterface  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color1: "#3C3B47",
            color2: "#3C3B47",
            StatePage: <div className="divStatePage"><h2>Create a Username to enter the work page and if you already have it, you can login.</h2></div>
        };
      }

    componentDidMount(){
        refAllUsers.on("value", (snapshot) => {
            let AllUsers = snapshot.val();
            let listOfUsers = AllUsers.map(val => {return val.User.UserInfo.Username})
            this.setState({allUsers : AllUsers})
            this.setState({listUsers: listOfUsers})
        });
        refGeneralPosts.on("value", (snapshot) => {
            let posts = snapshot.val();
            posts = posts.map(i => { return {"category": 0, "post": i }})
            this.setState({posts : posts})
        });
        refGeneralCategory.on("value", (snapshot) => {
            let categorys = snapshot.val();
            categorys = categorys.map(i => i.categoryName)
            categorys.unshift("Select Category")
            this.setState({categorys : categorys})
        });
    }


    ChangeToLogin(){
        this.setState({color1: "#3BC079"});
        this.setState({color2: "#3C3B47"});
        this.setState({StatePage: <LogIn allUsers={this.state.allUsers} listUsers={this.state.listUsers}/>});
    }
    ChangeToSingUp(){
        this.setState({color2: "#3BC079"});
        this.setState({color1: "#3C3B47"});
        this.setState({StatePage:<SignUp 
                                    allUsers={this.state.allUsers} 
                                    listUsers={this.state.listUsers} 
                                    posts={this.state.posts}
                                    categorys ={this.state.categorys}
                                    />});
    }

    render(){
        return (
            <div className="DivBase ">
                <h3>Welcome to WokerPage</h3>
                <div className="DivForm">
                    <div>

                        <div 
                        style={{background: this.state.color1}} 
                        className="DivButton" 
                        onClick={()=>this.ChangeToLogin()}>
                            Log In
                        </div>

                        <div
                        style={{background: this.state.color2, margin: "0 0 0 6px"}} 
                        className="DivButton" 
                        onClick={()=>this.ChangeToSingUp()}>
                            Sign Up
                        </div>

                    </div>
                    {this.state.StatePage}
                </div>
            </div>
        );
    }
}

class LogIn extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            password: "",
            allUsers: this.props.allUsers,
            listUsers: this.props.listUsers,
            divErr: "",
          };
        this.handleChangeUser = this.handleChangeUser.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
      };
    
    handleClick = (event) => {
        if(this.state.user.length !== 0){
            if(!this.state.listUsers.includes(this.state.user.toLowerCase())){
                this.setState({divErr: <div style={{color: "red"}}>Your Username doesn't exist*</div> })
            }else{
                let numberPassowrd = this.state.listUsers.indexOf(this.state.user.toLowerCase())
                if(this.state.password.length === 0){
                    this.setState({divErr: <div style={{color: "red"}}>Enter your password*</div> })
                }else{
                    if(this.state.allUsers[numberPassowrd].User.UserInfo.Password !== this.state.password){
                        this.setState({divErr: <div style={{color: "red"}}>your password is wrong*</div> })
                    }else{
                        this.setState({divErr: <div style={{color: "green"}}><Link to="/postAndcategory">Go to Post And Category</Link></div> })
                    }
                };
            };
        };
    };
    
    handleChangeUser(e) {
        this.setState({ user: e.target.value });
      };
    handleChangePassword(e) {
        this.setState({ password: e.target.value });
    };

    render(){
        return (
            <div className="DivLogin">
                <Form>

                    <FormGroup>
                        <Label for="exampleUser">User</Label>
                        <Input 
                        onChange={this.handleChangeUser}  
                        type="user" 
                        name="user" 
                        id="exampleUser" 
                        placeholder="Write your username"
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input
                        onChange={this.handleChangePassword}  
                        type="password" 
                        name="password" 
                        id="examplePassword" 
                        placeholder="Write your password"
                        />
                    </FormGroup>   
                         
                </Form>
                <Button color="success" onClick={this.handleClick}>Start</Button>
                <div style={{display: "inline-block", float: "right"}}>{this.state.divErr}</div>
            </div> 
        );
    }
}

class SignUp extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            lastName: "",
            user: "",
            password: "",
            confirmPassword: "",
            replyErr: null,
            allUsers: this.props.allUsers,
            listUsers: this.props.listUsers,
          };
          this.handleChangeName = this.handleChangeName.bind(this);
          this.handleChangeLastName = this.handleChangeLastName.bind(this);
          this.handleChangeUser = this.handleChangeUser.bind(this);
          this.handleChangePassword = this.handleChangePassword.bind(this);
          this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(this);
      };
    
    handleClick = (event) => {
        if(this.state.name.length === 0 || this.state.lastName.length  === 0 || this.state.user.length === 0 || this.state.password.length === 0 || this.state.confirmPassword.length === 0){
            this.setState({replyErr: "You must fill all the fields*"})
        }else{
            if(this.state.listUsers.includes(this.state.user.toLowerCase())){
                this.setState({replyErr: "This username already exists*"})
            }else{
                if(this.state.password !== this.state.confirmPassword){
                    this.setState({replyErr: "Your password doesn't match*"})
                }else{
                    var named = this.state.name.charAt(0).toUpperCase()+this.state.name.slice(1).toLowerCase()
                    var lastNamed = this.state.lastName.charAt(0).toUpperCase()+this.state.lastName.slice(1).toLowerCase()
                    this.setState(
                        {
                            replyErr: <div style={{color: "green"}}>Welcome {named} {lastNamed}. Go to Log In and let's begin.</div>
                        }
                    )
                    var usuarios = this.state.allUsers
                    var NewUser = {
                        "User": {
                          "PostAndCategory": {
                            "Category": [],
                            "Post": []
                          },
                          "UserInfo": {
                            "LastName": lastNamed,
                            "Name": named,
                            "Password": this.state.password,
                            "Username": this.state.user.toLowerCase()
                          }
                        }
                      };
                      NewUser.User.PostAndCategory.Category = this.props.categorys
                      NewUser.User.PostAndCategory.Post = this.props.posts
                      usuarios.push(NewUser)
                      this.setState({allUsers: usuarios})
                      this.setState({listUsers: this.state.allUsers.map(val => {return val.User.UserInfo.Username})})
                      //save the new user
                      refAllUsers.set(this.state.allUsers)
                      this.setState({ name: "" });
                      this.setState({ lastName: "" });
                      this.setState({ user: "" });
                      this.setState({ password: "" });
                      this.setState({ confirmPassword: "" });

                }
            }
        }
    };
    
    handleChangeName(e) {
        this.setState({ name: e.target.value });
      };
    handleChangeLastName(e) {
        this.setState({ lastName: e.target.value });
    };
    handleChangeUser(e) {
        this.setState({ user: e.target.value });
      };
    handleChangePassword(e) {
        this.setState({ password: e.target.value });
    };
    handleChangeConfirmPassword(e) {
        this.setState({ confirmPassword: e.target.value });
    };

    render(){    
        return (
            <div className="DivSignup">
                <Form inline>
                <FormGroup>
                        <Label for="name" style={{margin: "0 12px 0 0"}}>Name</Label>
                        <Input
                        value={this.state.name}
                        onChange={this.handleChangeName}   
                        type="name" 
                        name="name" 
                        id="name" 
                        placeholder="Write your Name"
                        />

                        <Label for="lastName" style={{margin: "0 12px 0 30px"}}>Last Name</Label>
                        <Input
                        value={this.state.lastName}
                        onChange={this.handleChangeLastName}
                        type="lastName" 
                        name="lastName" 
                        id="lastName" 
                        placeholder="Write your Last Name"
                        />
                    </FormGroup>
                </Form>

                <Form style={{margin: "20px 0 0 0"}}>
                    <FormGroup>
                        <Label for="exampleUser">New User</Label>
                        <Input
                        value={this.state.user}
                        onChange={this.handleChangeUser} 
                        type="user" 
                        name="user" 
                        id="newUser" 
                        placeholder="Write your username"
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="examplePassword">New Password</Label>
                        <Input
                        value={this.state.password}
                        onChange={this.handleChangePassword} 
                        type="password" 
                        name="password" 
                        id="newPassword" 
                        placeholder="Write a password"
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="examplePassword">Confirm Password</Label>
                        <Input
                        value={this.state.confirmPassword}
                        onChange={this.handleChangeConfirmPassword}
                        type="password" 
                        name="password" 
                        id="confirmPassword" 
                        placeholder="Write again a password"
                        />
                    </FormGroup> 

                </Form>
                <Button style={{float: "right"}} color="success" onClick={this.handleClick}>Submit</Button>
                <div className="replyErr">{this.state.replyErr}</div>
            </div> 
        );
    };
};

export default StartInterface;