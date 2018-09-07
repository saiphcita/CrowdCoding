import React, { Component } from 'react';
import './SignUp.css';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import { refAllUsers } from '../Tools/DataBase.js'

class SignUp extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            password: "",
            confirmPassword: "",
            replyErr: null,
            allUsers: this.props.allUsers,
            listUsers: this.props.listUsers,
            wait: <div/>
          };

          this.handleChangeUser = this.handleChangeUser.bind(this);
          this.handleChangePassword = this.handleChangePassword.bind(this);
          this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(this);
      };
    
    handleClick = () => {
        if(this.state.user.length === 0 || this.state.password.length === 0 || this.state.confirmPassword.length === 0){
            this.setState({replyErr: "You must fill all the fields*"})
        }else{
            if(this.state.listUsers.includes(this.state.user.toLowerCase())){
                this.setState({replyErr: "This Worker ID already exists*"})
            }else{
                if(this.state.password !== this.state.confirmPassword){
                    this.setState({replyErr: "Your password doesn't match*"})
                }else{
                    var usuarios = this.state.allUsers
                    var NewUser = {
                        "PostAndCategory": {
                          "Category": [],
                          "Post": []
                        },
                        "UserInfo": {
                          "Password": this.state.password,
                          "Username": this.state.user.toLowerCase()
                        },
                        "UserState": "working"
                      };
                      NewUser.PostAndCategory.Category = this.props.categorys
                      NewUser.PostAndCategory.Post = this.props.posts
                      usuarios.push(NewUser);
                      //save the new user
                      refAllUsers.set(usuarios);
                      this.setState({workerId: this.state.user.toLowerCase()})
                      this.setState({workerPassword: this.state.password});
                      this.setState({wait:<div style={{color: "green"}}>Wait a Second...</div>});
                      setTimeout(()=> { window.location.reload(); }, 4000);
                }
            }
        }
    };
    
    handleChangeUser(e) {
        this.setState({ user: e.target.value.toLowerCase()});
        if(e.target.value.length !== 0){
            if(this.state.listUsers.includes(e.target.value.toLowerCase())){
                this.setState({replyErr: "This Worker ID already exists*"})
            }else{
                this.setState({replyErr: <div style={{color: "green"}}>Your Worker ID is correct.</div>})
            }
        }else{
            this.setState({replyErr: "Write your new Worker ID"})
        }
      };

    handleChangePassword(e) {
        this.setState({replyErr: ""})
        this.setState({ password: e.target.value });
    };

    handleChangeConfirmPassword(e) {
        this.setState({ confirmPassword: e.target.value });
        if(this.state.password !== e.target.value){
            this.setState({replyErr: "Your password doesn't match*"})
        }else{
            this.setState({replyErr: <div style={{color: "green"}}>Your Password is correct.</div>})
            this.setState({ confirmPassword: e.target.value });
        }
    };

    componentWillUpdate(nextProps, nextState){
        localStorage.setItem("WorkerId", nextState.workerId);
        localStorage.setItem("WorkerPassword", nextState.workerPassword)
    }

    render(){

        var divStatus = <div className="replyErr">{this.state.replyErr}</div>;
        var workerId = this.state.user;
        var passwordId = this.state.password;
        var confirmPasswordId = this.state.confirmPassword;
        if(workerId.length !== 0){
            if(!this.state.listUsers.includes(workerId)){
                if(passwordId.length !== 0 || confirmPasswordId.length !== 0){
                    if (confirmPasswordId === passwordId){
                        divStatus = <div className="replyErr"><div style={{color: "green"}}>Your Worker Id and your Password are correct</div></div>
                    }
                }
            }
        };

        return (
            <div className="DivSignup">
                <Form >
                    <FormGroup>
                        <Label for="exampleUser">New Worker ID</Label>
                        <Input
                        onChange={this.handleChangeUser} 
                        type="Worker ID" 
                        name="Worker ID" 
                        id="newUser" 
                        placeholder="Write your Worker ID"
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
                {divStatus}
                {this.state.wait}
            </div> 
        );
    };
};

export default SignUp;