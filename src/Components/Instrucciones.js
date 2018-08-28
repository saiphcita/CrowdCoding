import React from 'react';
import './Instrucciones.css';
import ModalExample  from './modal.js'
import { refGeneralCategory } from './DataBase.js'


class Instrucciones extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: []
    };
  }

  componentDidMount() {
    refGeneralCategory.on("value", (snapshot) => {
      let category = snapshot.val();
      this.setState({category : category})
    });
  }

  render() {
    return (
      <div className="DivInstrucciones">

          <header style={{backgroundColor:"black", color:"white", padding:"10px"}}>
            <h3>
              Instrucciones
            </h3>
          </header>

          <div className="ListInstruccion">
            <p>Estamos estudiando cómo se usaron las plataformas tecnológicas  después  del terremoto que sucedió en México el 19 de Septiembre de 2017.</p>
            <p>Te daremos una una hoja de cálculo donde está una lista de descripciones que nos dieron varias personas en una encuesta donde nos platican sobre su experiencia sobre el temblor y el uso de la tecnología.</p>
            <p>Cada renglón representa un comentario de una persona.</p>      
            <p>Objetivo: categoriza cada comentario con alguna de las categorías.</p>
          </div>

          <div className="DivDefinition2">
            <ul className="listDefiniton2">
              <li className="tittleList2">Category</li>
              {this.state.category.map(i => {
                return <li key={i.categoryName}>
                  {i.categoryName}
                </li>
              })}
            </ul>
            <ul className="listDefiniton2">
            <li className="tittleList2">Definition</li>
            {this.state.category.map(val => {
              if(val.categoryDefinition.length > 112){
                return <li key={val.categoryName}>
                  {val.categoryDefinition.substring(0,112)}...<ModalExample post={val.categoryDefinition} ind={val.categoryName} butN={"Show More"}/>
                </li>
              }else{
                return <li key={val.categoryName}>
                  {val.categoryDefinition}
                </li>
              }
            })}
            </ul>
            <ul className="listDefiniton2">
              <li className="tittleList2">Example</li>
              {this.state.category.map(i => {
                return <li key={i.categoryName}>
                  {i.categoryExample}
                </li>
              })}
            </ul>
          </div>

          <div style={{marginBottom:"30px"}} className="goButton">
            {this.props.button}
          </div>
      </div>
    );
  }
}

export default Instrucciones;