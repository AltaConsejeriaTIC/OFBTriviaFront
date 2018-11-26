// Orquesta Filarmónica de Bogotá - Trivia admin.
// newTrivia.js

import React from 'react';
import { Redirect } from 'react-router-dom';
import styled, {ThemeProvider} from 'styled-components';
//Custom Constants
import * as Constants from '../../../../constants.js';
import { Button } from '../../../utilities/button.js';

const theme = Constants.NEW_TRIVIA_THEME;

//Section container
const SectionContainer = styled('div')`
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  height: ${(props) => props.theme.containerHeight};
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  position: relative;
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.textColor};
  padding: 0 50px;

  h1 {
    color: ${Constants.STRONG_TEXT_COLOR};
    font-size: 22px;
  }

  label {
    display: flex;
    flex-direction: column;
    color: ${Constants.STRONG_TEXT_COLOR};
    font-size: 13px;
    font-weight: 700;

    input {
      font-family: 'Open Sans';
      font-size: 13px;
      width: 80%;
      height: 35px;
      margin: 15px 0 20px 0;
      padding-left: 15px;
      border-radius: ${Constants.UNIVERSAL_BORDER_RADIUS};
      border: solid 1px ${Constants.INPUT_BORDER_COLOR};
    }

    textarea {
      font-family: 'Open Sans';
      width 100%;
      height: 100px;
      resize: none;
      margin-top: 15px;
      padding 10px 0 0 10px;
      border-radius: ${Constants.UNIVERSAL_BORDER_RADIUS};
      border: solid 1px ${Constants.INPUT_BORDER_COLOR};
    }
  }

  div {
    &.content {
      display: flex;
      flex-direction: row;
      width: 100%;

      .dates {
        height: 80%;
        width: 25%;
      }

      .trivia-content {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        height: 80%;
        width: 75%;
        display: flex;
        flex-direction: row;

        label {
          width: 40%;
          margin-left: 5%;
        }
      }
    }

    &.footer {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 20px;

      span {
        width: 25%;
        font-size: 13px;
      }

      .separator {
        margin: 0 20px;
        flex-grow: 1;
        height: 1px;
        background-color: #CCCCCC;
      }

      button {
        &:last-child {
          margin-left: 10px;
        }
      }
    }
  }
`;

class NewTrivia extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      mustNavigate: false,
    };
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = event.target.value;
    const name = target.name;
    
    this.setState({
      [name]: value
    });
  };

  cancel = () => {
    this.setState({mustNavigate: true})
  }

  render() { 
    if(this.state.mustNavigate){
      return <Redirect push to='/dashboard/trivia'/>
    }
    return (
      <ThemeProvider theme={theme}>
        <SectionContainer>
          <h1>Añadir pregunta</h1>
          <div className='content'>
            <div className='dates'>
              <label>
                FECHA DE PUBLICACIÓN
                <input type='text' name='startDate' placeholder='dd/mm/aaaa'/>
              </label>
              <label>
                FECHA DE CIERRE
                <input type='text' name='endDate' placeholder='dd/mm/aaaa'/>
              </label>
            </div>
            <div className='trivia-content'>
              <label>
                PREGUNTA
                <textarea name='questionContent' placeholder='Escribe aquí la pregunta.'/>
              </label>
              <label>
                RESPUESTA
                <textarea name='questionContent' placeholder='Escribe aquí la respuesta.'/>
              </label>
            </div>
          </div>
          <div className='footer'>
            <span>Recuerda que no puedes publicar una trivia hasta que hayan pasado al menos dos días desde la finalización de la anterios. Así, habrá tiempo para mostrar los ganadores.</span>
            <div className='separator'/>
            <Button primary border width='100px'onClick={this.cancel}>Cancelar</Button>
            <Button primary border width='150px'>Guardar Trivia</Button>
          </div>
        </SectionContainer>
      </ThemeProvider>
    );
  }
}

export default NewTrivia;