import React, { Component } from 'react';
import './Interface.css';

class EmailBar extends Component {
  render() {
    return (
      <div className="Bar">
        <header className="Bar-header">
          <div className="Email">Here will be the EMAIL</div>
          <div className="ButtonLogOut">Here will be the LOG OUT</div>      
        </header>
      </div>
    );
  }
}

class AsideBar extends Component {
  render() {
    return (
      <div className="Aside">
        <p>Category</p>
      </div>
    );
  }
}
 
let PossiblePosts = [
  "Mauris porttitor eros massa, quis bibendum nisi ves",
  "ibulum eu. Duis vestibulum et sapien i",
  "d hendrerit. Nunc quis pharetra metus. ",
  "Cras ultricies nisl odio, vitae gravida lorem ",
  "consectetur egestas. Morbi semper elementum blandit. ",
  "Suspendisse dignissim ligula libero, eu sodales dolor"
]

let PossibleCategorys = [
  "category1", "category2", "category3", "category4", "category5", "category6", "category7", 
]

const PQ = ({pq,}) => (
      <span>{pq}</span>
);

class List extends Component {
  render() {
    return (
          <PQ/>
    );
  }
}

class PostAndCategory extends Component {
  render() {
    return (
      <div className="DivPC">
          <List/>
      </div>
    );
  }
}

  export  {
    EmailBar,
    AsideBar,
    PostAndCategory,
  }
