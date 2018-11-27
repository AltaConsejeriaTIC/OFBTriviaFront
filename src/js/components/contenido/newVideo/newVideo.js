// Orquesta Filarmónica de Bogotá - Trivia admin.
// newVideo.js

import React from 'react';
import { Redirect } from 'react-router-dom';
import styled, {ThemeProvider} from 'styled-components';
//Custom Constants
import * as Constants from '../../../../constants.js';
import { Button } from '../../../utilities/button.js';

const theme = Constants.NEW_VIDEO_THEME;

//Section container
const SectionContainer = styled('div')`
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  height: ${(props) => props.theme.containerHeight};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.textColor};
  padding: 0 50px;

  .content {
    margin-top: -50px;
    display: flex;
    flex-direction: column;
    width: 30%;

    h1 {
      color: ${Constants.STRONG_TEXT_COLOR};
      font-size: 20px;
    }

    label {
      display: flex;
      flex-direction: column;
      color: ${Constants.STRONG_TEXT_COLOR};
      font-size: 13px;
      font-weight: 700;

      input {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        font-family: 'Open Sans';
        font-size: 13px;
        width: 80%;
        width: 100%;
        height: 35px;
        margin: 15px 0 0 0;
        padding-left: 15px;
        border-radius: ${Constants.UNIVERSAL_BORDER_RADIUS};
        border: solid 1px ${Constants.INPUT_BORDER_COLOR};
      }

      span {
        margin-top: 10px;
        text-align: right;
      }

    }
    
    .control {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
    }
  }

`;

class NewAudio extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      mustNavigate: false,
      videoName: '',
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
      return <Redirect push to='/dashboard/contenido/video'/>
    }
    return (
      <ThemeProvider theme={theme}>
        <SectionContainer>
          <div className='content'>
            <h1>Añadir video</h1>
            <label>
              NOMBRE DEL VIDEO
              <input
                type='text'
                name='videoName'
                placeholder='Nombre del video'
                maxLength={Constants.VIDEO_NAME_MAX_CHARACTERS}
                onChange={this.handleInputChange}/>
              <span>{this.state.videoName.length + ' DE 40 CARACTERES'}</span>
            </label>
            <label>
              LINK DEL VIDEO
              <input type='text' name='link' placeholder='Link del video'/>
            </label>
            <div className='control'>
              <Button primary border width='42%'onClick={this.cancel}>Cancelar</Button>
              <Button primary border width='55%'>Agregar video</Button>
            </div>
          </div>
        </SectionContainer>
      </ThemeProvider>
    );
  }
}

export default NewAudio;