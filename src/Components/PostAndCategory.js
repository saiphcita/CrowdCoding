import React, { Component } from 'react';
import './CSS/PostAndCategory.css';
import SelectForCategory  from '../Components/Tools/SelectForCategory.js'
import { dbUser } from './Tools/DataBase.js'

class PostAndCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],
      value: [],
      category: [],
      heightPC: "88%",
      finishJob: false,
      messageFinish: <div/>
    };
  }

  componentDidMount() {
    const refUserPost = dbUser.ref("Users/"+this.props.numberUser+"/PostAndCategory/Post");    
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

    const refUserCategory = dbUser.ref("Users/"+this.props.numberUser+"/PostAndCategory/Category");
    refUserCategory.on("value", (snapshot) => {
      let category = snapshot.val();
      this.setState({category : category})
    });

    const refUserFinish = dbUser.ref("Users/"+this.props.numberUser);
    refUserFinish.on("value", (snapshot) => {
      let userFs = snapshot.val();
      this.setState({userFs: userFs})
      if(userFs.UserState === "finished"){
        this.setState({finishJob: true})
        this.setState({heightPC: "84%"})
        this.setState({messageFinish: <div style={{height:"4%", backgroundColor:"#4ECB0F", color:"white"}}>Thank you very much for having finished your work.</div>})
      }else{
        this.setState({finishJob: false})
        this.setState({heightPC: "88%"})
        this.setState({messageFinish: <div/>})
      };
      //verificando si ya termino
      var arrayPost0 = []
      for (let i = 0; i < userFs.PostAndCategory.Post.length; i++) { 
        if(Number(userFs.PostAndCategory.Post[i].category) === 0){ arrayPost0.push(i) };
      };
      var user = userFs
      if(arrayPost0.length === 0){
        user.UserState = "finished"
        refUserFinish.set(user)
      }else{
        user.UserState = "working"
        refUserFinish.set(user)
      };
    });
  };

  finishWork() {
    this.setState({heightPC: "84%"})
    this.setState({messageFinish: <div style={{height:"4%", backgroundColor:"#E82704", color:"white"}}>You have not finished Categorizing the Posts yet.</div>})
  };

  render() {
    var theFunction = this.finishWork.bind(this);
    if(this.state.finishJob){
      theFunction = this.props.change
    }

    return (
      <div style={{height:"92%", textAlign:"center"}}>
      {this.state.messageFinish}
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
                      const refUserPost = dbUser.ref("Users/"+this.props.numberUser+"/PostAndCategory/Post");
                      let newValue = this.state.value.slice();
                      newValue[ind] = event.target.value;
                      //save in firebase
                      let newPost = this.state.post;
                      for (let i = 0; i < newPost.length; i++) {
                        newPost[i].category = newValue[i]
                      };
                      this.setState({post: newPost});
                      refUserPost.set(newPost);
                      this.setState({messageFinish:<div/>}); 
                      this.setState({heightPC: "88%"});
                      let user = this.state.userFs
                      user.UserState = "working"
                      user.PostAndCategory.Post = newPost
                      const refUserFinish = dbUser.ref("Users/"+this.props.numberUser);
                      refUserFinish.set(user);
                    }}
                  />}
                </li>
              </div>
            )
          })}
        </div>
        <button onClick={theFunction} className="payButton">Finish Work</button>
      </div>
    );
  }
}

export default PostAndCategory;