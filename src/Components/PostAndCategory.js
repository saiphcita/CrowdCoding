import React, { Component } from 'react';
import './CSS/PostAndCategory.css';
import SelectForCategory  from '../Components/Tools/SelectForCategory.js'
import { dbUser, refAllUsers } from './Tools/DataBase.js'

class PostAndCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],
      value: [],
      category: [],
      listUsers: [],
      finishJobM: 0,
      heightPC: "88%"
    };
  }

  componentDidMount() {
    const refUserPost = dbUser.ref("Users/"+this.props.numberUser+"/User/PostAndCategory/Post");
    const refUserCategory = dbUser.ref("Users/"+this.props.numberUser+"/User/PostAndCategory/Category");
    refUserPost.on("value", (snapshot) => {
      let posts = snapshot.val();
      this.setState({post : posts})
      this.setState({value: posts.map(val => {return val.category})})
      // var arrayxx = posts
      // for (let i = 0; i < posts.length; i++) { 
      //   arrayxx[i].category = 0;
      // };
      // refUserPost.set(arrayxx);
    });
    refUserCategory.on("value", (snapshot) => {
      let category = snapshot.val();
      this.setState({category : category})
    });
    refAllUsers.on("value", (snapshot) => {
      let AllUsers = snapshot.val();
      this.setState({listUsers: AllUsers})
      let PostOfUser = AllUsers.map( val => val.User.PostAndCategory.Post)
      this.setState({PostOfUser: PostOfUser})
    });
    const refUserFinish = dbUser.ref("Users/"+this.props.numberUser+"/User");
    refUserFinish.on("value", (snapshot) => {
      let userFs = snapshot.val();
      this.setState({userFs: userFs})
    });
  }

  finishWork() {
    const refUserFinish = dbUser.ref("Users/"+this.props.numberUser+"/User");
    var arrayPost0 = []
    for (let i = 0; i < this.state.post.length; i++) { 
      if(Number(this.state.post[i].category) === 0){
        arrayPost0.push(i)
      }
    };
    
    if(arrayPost0.length === 0){
      this.setState({finishJobM: 2})
      this.setState({heightPC: "84%"})
      let user = this.state.userFs
      user.UserState = "finished"
      refUserFinish.set(user);
    }else{
      this.setState({finishJobM: 1})
      this.setState({heightPC: "84%"})
      let user = this.state.userFs
      user.UserState = "working"
      refUserFinish.set(user);
    }
  };


  render() {
    var finishM = <div/>
    if(this.state.finishJobM === 0){
      finishM= <div/>
    }else if(this.state.finishJobM === 1){
      finishM= <div style={{height:"4%", backgroundColor:"#E82704", color:"white"}}>Aun no has Terminado de Categorizar los Comentarios.</div>
    }else if(this.state.finishJobM === 2){
      finishM= <div style={{height:"4%", backgroundColor:"#4ECB0F", color:"white"}}>Felicidades, ya has termiando tu Trabajo.</div>
    }

    return (
      <div style={{height:"92%", textAlign:"center"}}>
        {finishM}
        <div className="DivPostCategory" style={{height:this.state.heightPC, maxHeight:this.state.heightPC}}>
          <div className="titleList">
            <li style={{width:"4%", maxWidth:"4%"}}>No.</li>
            <li style={{width:"80%", maxWidth:"80%"}}>Comentario</li>
            <li style={{width:"16%", maxWidth:"16%"}}>Categoría</li>
          </div>
          {this.state.post.map((val, ind) =>{
            return (
              <div key={ind} className="NCClist">
                <li key={ind} style={{width:"4%", maxWidth:"4%", textAlign:"center", padding:"0"}}>{ind+1}</li>
                <li key={val.post} style={{width:"80%", maxWidth:"80%"}}>{val.post}</li>
                <li style={{width:"16%", maxWidth:"16%", padding:"0"}}>
                  {<SelectForCategory id={ind} listCategory={this.state.category} categoryValue={this.state.value[ind]}
                    handleChange={(event) =>{
                      const refUserPost = dbUser.ref("Users/"+this.props.numberUser+"/User/PostAndCategory/Post");
                      let newValue = this.state.value.slice();
                      newValue[ind] = event.target.value;
                      //save in firebase
                      let newPost = this.state.post;
                      for (let i = 0; i < newPost.length; i++) {
                        newPost[i].category = newValue[i]
                      };
                      this.setState({post: newPost});
                      refUserPost.set(newPost);
                      this.setState({finishJobM: 0})
                      this.setState({heightPC: "88%"})
                    }}
                  />}
                </li>
              </div>
            )
          })}
        </div>
        <button onClick={this.finishWork.bind(this)} className="payButton">Terminar Trabajo</button>
      </div>
    );
  }
}

export default PostAndCategory;