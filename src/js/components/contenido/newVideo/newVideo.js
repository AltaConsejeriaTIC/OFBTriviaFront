// Orquesta Filarmónica de Bogotá - Trivia admin.
// newVideo.js

import React from 'react';
import { Redirect } from 'react-router-dom';
import styled, {ThemeProvider} from 'styled-components';
//Custom Constants
import * as Constants from '../../../../constants.js';
import { Button } from '../../../utilities/button.js';
import * as ServerServices from '../../../utilities/serverServices.js';

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
        margin: 5px 0 15px 0;
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
    const propsState = props.location.state ? props.location.state : {};
    const {
      isEditing = false,
      title = '',
      url,
      id,
    } = propsState;
    this.state = {
      isEditing,
      title,
      url,
      id,
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

  uploadVideo = () => {
    const response = ServerServices.createVideo(this.state.title, this.state.url, this.state.id);
    response.then((result) => {
      console.log(result)
    })
  };

  cancel = () => {
    this.setState({mustNavigate: true})
  };

  render() {
    console.log(this.state)
    if(this.state.mustNavigate){
      return <Redirect push to='/dashboard/contenido/video'/>
    }
    return (
      <ThemeProvider theme={theme}>
        <SectionContainer>
          <div className='content'>
            <h1>{this.state.isEditing ? 'Editar video' : 'Añadir video'}</h1>
            <label>
              NOMBRE DEL VIDEO
              <input
                type='text'
                name='title'
                placeholder='Nombre del video'
                defaultValue={this.state.title ? this.state.title : ''}
                onChange={this.handleInputChange}/>
            </label>
            <label>
              LINK DEL VIDEO
              <input 
                type='text'
                name='url'
                placeholder='Link del video'
                onChange={this.handleInputChange}/>
            </label>
            <div className='control'>
              <Button
                primary
                border
                width='42%'
                onClick={this.cancel}>
                Cancelar
              </Button>
              <Button
                primary
                border
                width='55%'
                onClick={this.uploadVideo}>
                {this.state.isEditing ? 'Guardar cambios' : 'Agregar video'}
              </Button>
            </div>
          </div>
        </SectionContainer>
      </ThemeProvider>
    );
  }
}

export default NewAudio;