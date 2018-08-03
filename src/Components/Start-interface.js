import React, { Component } from 'react';
import './Start-interface.css';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';


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
                <h3>Welcom to...</h3>
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
            userV:'',
            passwordV:'',
            user: '',
            password: '',
            divUP: <div/>,
            userExample: {user:"Senkar137", passowrd: "sionoraza"}
          };
        this.handleChangeUser = this.handleChangeUser.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
      };
    
    handleClick = (event) => {
        event.preventDefault();
        //this.setState({ user: this.state.userV });
        //this.setState({ password: this.state.passwordV });

        if(this.state.user !== "" && this.state.password !== ""){ 
            return this.setState({ divUP: <div>User: {this.state.user} y su password: {this.state.password}</div> })                 
        }
      };
    
    handleChangeUser(e) {
        this.setState({ userV: e.target.value });
        this.setState({ user: e.target.value });
      };

    handleChangePassword(e) {
        this.setState({ passwordV: e.target.value });
        this.setState({ password: e.target.value });
    };


    render(){
        return (
            <div className="DivLogin">
                <Form>

                    <FormGroup>
                        <Label for="exampleUser">User</Label>
                        <Input 
                        value={this.state.userV}
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
                        value={this.state.passwordV}
                        onChange={this.handleChangePassword}  
                        type="password" 
                        name="password" 
                        id="examplePassword" 
                        placeholder="Write your password"
                        />
                    </FormGroup>   
                         
                </Form>
                <Button color="success" onClick={this.handleClick}>Start</Button>
                {this.state.divUP}
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
            userExample: [{user:"Senkar137", password: "hola"}, {user:"pac", password: "2323"}, {user:"juan", password: "222"}]
          };

          this.handleChangeName = this.handleChangeName.bind(this);
          this.handleChangeLastName = this.handleChangeLastName.bind(this);
          this.handleChangeUser = this.handleChangeUser.bind(this);
          this.handleChangePassword = this.handleChangePassword.bind(this);
          this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(this);
      };
    
    handleClick = (event) => {
        if(this.state.name === null || this.state.lastName === null || this.state.user === null || this.state.password === null || this.state.confirmPassword === null){
            console.log("Debes llenar todos los CAMPOS")
        }else{
            for (let i = 0; i < this.state.userExample.length; i++) {
                let userFound = false;
                if(this.state.userExample[i].user === this.state.user){
                    console.log("usuario existente")
                    userFound = true;
                }
                if(userFound){
                    return
                }
                if(this.state.password === this.state.confirmPassword){
                    console.log("la contraseña coincide")
                }else{
                    console.log("tu contraseña NO coincide")
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
            </div> 
        );
    }
}   


export default StartInterface;