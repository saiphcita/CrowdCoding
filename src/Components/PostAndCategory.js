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
      finishJOB: false,
      heightPC: "100%"
    };
  }

  componentDidMount() {
    const refUserPost = dbUser.ref("Users/"+this.props.numberUser+"/User/PostAndCategory/Post");
    const refUserCategory = dbUser.ref("Users/"+this.props.numberUser+"/User/PostAndCategory/Category");
    refUserPost.on("value", (snapshot) => {
      let posts = snapshot.val();
      this.setState({post : posts})
      this.setState({value: posts.map(val => {return val.category})})
      var arrayPost0 = []
      for (let i = 0; i < posts.length; i++) { 
        if(Number(posts[i].category) === 0){
          arrayPost0.push(i)
        }
      }
      if(arrayPost0.length === 0){
        this.setState({finishJOB: true})
        this.setState({heightPC: "85%"})
      }else{
        this.setState({finishJOB: false})
        this.setState({heightPC: "100%"})
      }
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
  }

  finishWork() {
    const refUserFinish = dbUser.ref("Users/"+this.props.numberUser+"/User");
    refUserFinish.on("value", (snapshot) => {
      let user = snapshot.val();
      user.UserState = "finished"
      refUserFinish.set(user);
    });
  }


  render() {
    var unBoton = <div/>
    if(this.state.finishJOB){
      unBoton= <button onClick={this.finishWork.bind(this)} className="payButton">Finish Work</button>
    }else{
      unBoton= <div/>
    }

    return (
      <div style={{height:"92%", textAlign:"center"}}>
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
                    }}
                  />}
                </li>
              </div>
            )
          })}
        </div>
        {unBoton}
      </div>
    );
  }
}

export default PostAndCategory;