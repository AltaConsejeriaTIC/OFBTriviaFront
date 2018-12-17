// Orquesta Filarmónica de Bogotá - Trivia admin.
// newAudio.js

import React from 'react';
import { Redirect } from 'react-router-dom';
import styled, {ThemeProvider} from 'styled-components';
import swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
//Custom Constants
import * as Constants from '../../../../constants.js';
import { Button } from '../../../utilities/button.js';
import * as ServerServices from '../../../utilities/serverServices.js';
import BreadCrumbs from '../../../utilities/breadCrumbs.js';

const theme = Constants.NEW_AUDIO_THEME;

//Section container
const SectionContainer = styled('div')`
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
    display: flex;
    flex-direction: column;
    width: 30%;

    h1 {
      display: flex;
      align-items: center;
      justify-content: space-between;
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
        font-family: 'Open Sans';
        font-size: 13px;
        width: 80%;
        width: 100%;
        height: 35px;
        margin: 5px 0 15px 0;
        padding-left: 10px;
        border-radius: ${Constants.UNIVERSAL_BORDER_RADIUS};
        border: solid 1px ${Constants.INPUT_BORDER_COLOR};
      
        &.red {
          border: 1px solid red;
        }
      }

    }
    
    .control {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
    }
  }
`;

const ErrorMessage = styled('p')`
  display: ${(props) => props.display ? 'block' : 'none'};
  font-size: 13px;
  color: #C53C3C;
  margin: 10px 0;
`;

class NewAudio extends React.Component {
  constructor(props){
    super(props);
    const propsState = props.location.state ? props.location.state : {};
    const {
      isEditing = false,
      title = '',
      artist = '',
      url,
      id,
    } = propsState;
    this.state = {
      isEditing,
      title,
      artist,
      url,
      id,
      mustNavigate: false,
      emptyFields: false,
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

  uploadAudio = () => {
    if(this.validateFields()){
      this.setState({loading: true});
      const audios = ServerServices.createAudio(this.state.title, this.state.artist, this.state.url, this.state.id);
      audios.then((result) => {
        if(result.status === 201 || result.status === 200){
          this.setState({mustNavigate: true});
          //Success
        }else{
          //Some error happened.
        }
      })
    } else {
      this.setState({emptyFields: true});
    }
  };

  validateFields = () => {
    if (this.state.title === '' || this.state.artist === '' || this.state.url === '') {
      return false;
    }else{
      return true;
    }
  };

  deleteItem = () => {
    swal(Constants.CONFIRM_DELETE_ACTION_ALERT_CONTENT)
    .then((dismiss) => {
      this.setState({loading: true});
      ServerServices.deleteAudio(this.state.id)
      .then((result) => {
        if(result.value) {
          swal(Constants.ITEM_DELETE_ALERT_CONTENT('audio'))
          .then(() => {
            this.setState({mustNavigate: true});
          })
        }
      }) 
    })
  }

  cancel = () => {
    this.setState({mustNavigate: true})
  };

  render() {
      console.log(this.state)
    if(this.state.mustNavigate){
      return <Redirect push to='/dashboard/contenido/audio'/>
    }
    return (
      <ThemeProvider theme={theme}>
        <SectionContainer>
          <BreadCrumbs mainSection={this.state.isEditing ? 'editAudio' : 'newAudio'}/>
          <div className='content'>
            <h1>
              {this.state.isEditing ? 'Editar audio' : 'Añadir audio'}
              {this.state.isEditing &&
                <Button
                  delete
                  border
                  width='30%'
                  onClick={this.deleteItem}>
                  Eliminar
                </Button>
              }
            </h1>
            <label>
              NOMBRE DEL AUDIO
              <input
                type='text'
                name='title'
                className={this.state.emptyFields && this.state.title === '' ? 'red' : ''}
                placeholder='Nombre del audio'
                defaultValue={this.state.title ? this.state.title : ''}
                onChange={this.handleInputChange}/>
            </label>
            <label>
              NOMBRE DEL ARTISTA
              <input
                type='text'
                name='artist'
                className={this.state.emptyFields && this.state.artist === '' ? 'red' : ''}
                placeholder='Nombre del artista'
                defaultValue={this.state.artist ? this.state.artist : ''}
                onChange={this.handleInputChange}/>
            </label>
            <label>
              LINK DEL AUDIO
              <input
                type='text'
                name='url'
                className={this.state.emptyFields && this.state.url === '' ? 'red' : ''}
                placeholder='Link del audio'
                defaultValue={this.state.url ? this.state.url : ''}
                onChange={this.handleInputChange}/>
            </label>
            <ErrorMessage display={this.state.emptyFields ? 1 : 0}>
              {Constants.CREATE_UPDATE_CONTENT_ERROR_MESSAGES.FIELDS_EMPTY}
            </ErrorMessage>
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
                onClick={this.uploadAudio}>
                {this.state.isEditing ? 'Guardar cambios' : 'Agregar audio'}
              </Button>
            </div>
          </div>
        </SectionContainer>
      </ThemeProvider>
    );
  }
}

export default NewAudio;