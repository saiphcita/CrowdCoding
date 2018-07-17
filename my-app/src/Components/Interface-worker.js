import React, { Component } from 'react';
import { Collapse, Button} from 'reactstrap';
import './Interface-worker.css';
const PossibleCategorys = require('./category.json');

let PossiblePosts = [
  "Mauris porttitor eros massa, quis bibendum nisi",
  "ibulum eu. Duis vestibulum et sapien iasdasdasd",
  "d hendrerit. Nunc quis pharetra metusasdasdasdasd. ",
  "Cras ultricies nisl odio, vitae gravida loremasdasdasdasdasd ",
  "consectetur egestas. Morbi semper elementum blandit. ",
  "Suspendisse dignissim ligula libero, eu sodales dolor"
]

function EmailBar (props){
    return (
        <header className="Bar-header">
          <div className="Emailside">Here will be the EMAIL</div>
          <div className="ButtonLogOut">Here will be the LOG OUT</div>      
        </header> 
    );
}


class AsideBar extends Component {

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
      <div className="aside">
        <Collapse isOpen={this.state.collapse} className="collapseEstilo">
            <Button color="primary" onClick={this.toggle} className="buttonBack">Go Back</Button>
            <div className="DivDefinition">
                  Para mi corazón basta tu pecho, 
                  p ara tu libertad bastan mis alas. 
                  Desde mi boca llegará hasta el cielo 
                  lo que estaba dormido sobre tu alma. 
                  Es en ti la ilusión de cada día. 
                  Llegas como el rocío a las corolas. 
                  Socavas el horizonte con tu ausencia. 
                  Eternamente en fuga como la ola. 
                  He dicho que cantabas en el viento 
                  como los pinos y como los mástiles.
            </div>
        </Collapse>
      <p>Show the definition of the categories.</p>
      <div>
      <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Show</Button>
      </div>

      <div className="listCategory">
        {PossibleCategorys.map(i => {return<li className="eachLI">{i.categoryName}</li>})}
      </div>
    </div>
    );
  }
}

function PostAndCategory(props) {
  return (
    <div>
      <Button color="secondary" className="sectionPost" disabled>Post</Button>
      <Button outline color="success" className="buttonSave">Save Changes</Button>
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
                          {PossibleCategorys.map(i => {return<option value="defect">{i.categoryName}</option>})}
                        </select>
                      </div>
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function  WorkerPage (props) {
  return (
      <div className="divAPC">
        <EmailBar/>
        <AsideBar/>
        <PostAndCategory/>
      </div>
  );
}


export default WorkerPage;