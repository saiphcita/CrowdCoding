import React, { Component } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import './Interface.css';

class EmailBar extends Component {
  render() {
    return (
        <header className="Bar-header">
          <div className="Emailside">Here will be the EMAIL</div>
          <div className="ButtonLogOut">Here will be the LOG OUT</div>      
        </header> 
    );
  }
}

class AsideBar extends Component {
  render() {
    return (
      <div className="aside">
        <p>Show the definition of the categories.</p>
        <div>
          <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Show</Button>
        </div>

        <div className="listCategory">
          {PossibleCategorys.map(categorys => {return<li className="eachLI">{categorys}</li>})}
        </div>
      </div>
    );
  }
}

class Definitiondiv extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    return (
      <div>
          <Collapse isOpen={this.state.collapse}>
          HOLA
          </Collapse>
      </div>
    );
  }
}

 
let PossiblePosts = [
  "Mauris porttitor eros massa, quis bibendum nisi",
  "ibulum eu. Duis vestibulum et sapien iasdasdasd",
  "d hendrerit. Nunc quis pharetra metusasdasdasdasd. ",
  "Cras ultricies nisl odio, vitae gravida loremasdasdasdasdasd ",
  "consectetur egestas. Morbi semper elementum blandit. ",
  "Suspendisse dignissim ligula libero, eu sodales dolor"
]

let PossibleCategorys = [
  "category 1", "category 2", "category 3", "category 4", "category 5", "category 6", "category 7", 
]

class PostAndCategory extends Component {
  render() {
    return (
      <div className="table12">
        <div className="list12">

          <div className="columm12">
            {PossiblePosts.map(i => {
              return <div className="row12">{i}</div>
            })}
          </div>

          <div className="columm12">
            {PossiblePosts.map(i => {
              return <div>
                        <select className="row12">
                          <option selected value="defect">Select Category</option>
                          {PossibleCategorys.map(categorys => {return<option value="defect">{categorys}</option>})}
                        </select>
                      </div>
            })}
          </div>

        </div>
      </div>
    );
  }
}

  export  {
    EmailBar,
    Definitiondiv,
    AsideBar,
    PostAndCategory,
  }
