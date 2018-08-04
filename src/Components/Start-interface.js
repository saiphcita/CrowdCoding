import React, { Component } from 'react';
import './Start-interface.css';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import firebase from 'firebase/app';
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
const db = app.database()
var refAllUsers = db.ref("0/AllUsers");


class StartInterface  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color1: "#3BC079",
            color2: "#3C3B47",
            LogIn: <LogIn/>,
            SignUp: <SignUp/>,
            StatePage: <LogIn/>
        };
      }

    ChangeToLogin(){
        this.setState({color1: "#3BC079"});
        this.setState({color2: "#3C3B47"});
        this.setState({StatePage: this.state.LogIn});
    }
    ChangeToSingUp(){
        this.setState({color2: "#3BC079"});
        this.setState({color1: "#3C3B47"});
        this.setState({StatePage: this.state.SignUp});
    }

    render(){
        return (
            <div className="DivBase ">
                <h3>Welcome to...</h3>
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
            user: null,
            password: null,
            allUsers: [],
            listUsers: [],
            divErr: "",
          };
        this.handleChangeUser = this.handleChangeUser.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
      };
    
    handleClick = (event) => {
        if(this.state.user !== null){
            if(!this.state.listUsers.includes(this.state.user)){
                this.setState({divErr: <div style={{color: "red"}}>Your Username doesn't exist*</div> })
            }else{
                let numberPassowrd = this.state.listUsers.indexOf(this.state.user)
                if(this.state.password === null){
                    this.setState({divErr: <div style={{color: "red"}}>Enter your password*</div> })
                }else{
                    if(this.state.allUsers[numberPassowrd].User.UserInfo.Password !== this.state.password){
                        this.setState({divErr: <div style={{color: "red"}}>your password is wrong*</div> })
                    }else{
                        this.setState({divErr: <div style={{color: "green"}}>Hello there.</div> })
                    }
                };
            };
        };
    };
    
    componentDidMount(){
        refAllUsers.on("value", (snapshot) => {
            let AllUsers = snapshot.val();
            this.setState({allUsers : AllUsers})
            this.setState({listUsers: this.state.allUsers.map(val => {return val.User.UserInfo.Username})})
          });
    }

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
            name: null,
            lastName: null,
            user: null,
            password: null,
            confirmPassword: null,
            usersExamples: [{user:"Senkar137", password: "hola"}, {user:"pac", password: "2323"}, {user:"juan", password: "222"}],
            userExample: [],
            replyErr: ""
          };
          this.handleChangeName = this.handleChangeName.bind(this);
          this.handleChangeLastName = this.handleChangeLastName.bind(this);
          this.handleChangeUser = this.handleChangeUser.bind(this);
          this.handleChangePassword = this.handleChangePassword.bind(this);
          this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(this);
      };
    
    handleClick = (event) => {
        if(this.state.name === null || this.state.lastName === null || this.state.user === null || this.state.password === null || this.state.confirmPassword === null){
            this.setState({replyErr: "You must fill all the fields*"})
        }else{
            if(this.state.userExample.includes(this.state.user)){
                this.setState({replyErr: "This username already exists*"})
            }else{
                if(this.state.password !== this.state.confirmPassword){
                    this.setState({replyErr: "Your password doesn't match*"})
                }else{
                    this.setState({replyErr: <div style={{color: "green"}}>Welcome {this.state.name} {this.state.lastName}.</div>})
                }
            }
        }
    };

    componentDidMount(){
        this.setState({userExample: this.state.usersExamples.map(val => {return val.user})})
    }
    
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
                        onChange={this.handleChangeName}   
                        type="name" 
                        name="name" 
                        id="name" 
                        placeholder="Write your Name"
                        />

                        <Label for="lastName" style={{margin: "0 12px 0 30px"}}>Last Name</Label>
                        <Input
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