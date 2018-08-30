import React, { Component } from 'react';
import '../CSS/ListPost.css';

class ListPost extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  };

  render() {
    return (
        <div className="DivPostCategory" style={{height:this.state.heightPC, maxHeight:this.state.heightPC}}>
          <div className="titleList">
            <li style={{width:"4%", maxWidth:"4%"}}>No.</li>
            <li style={{width:"80%", maxWidth:"80%"}}>Comentario</li>
          </div>
          {this.props.arrayP.map((val, ind) =>{
            return (
              <div key={ind} className="NCClist">
                <li key={ind} style={{width:"4%", maxWidth:"4%", textAlign:"center", padding:"0"}}>{ind+1}</li>
                <li key={val.post} style={{width:"80%", maxWidth:"80%"}}>{val.post}</li>
              </div>
            )
          })}
        </div>
    );
  }
}

export default ListPost;