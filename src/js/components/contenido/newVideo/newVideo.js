// Orquesta Filarmónica de Bogotá - Trivia admin.
// newVideo.js

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
import Loader from '../../../utilities/loader.js';
import * as DateFormater from '../../../utilities/dateFormater.js';

const theme = Constants.NEW_VIDEO_THEME;

//Section container
const SectionContainer = styled('div')`
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  min-height: ${(props) => props.theme.containerHeight};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.textColor};
  padding: 45px 50px;
  margin-top: 1px;

  .content {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 40%;

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

        &.red {
          border: 1px solid red;
        }
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

const LoaderContainer = styled('div')`
  margin: 30px 0; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;

  span {
    margin-top: 15px;
  }
`;

const Preview = styled('div')`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: left;

  h2, h3 {
    color: ${Constants.STRONG_TEXT_COLOR};
  }

  h3 {
    margin-bottom: 0;
  }

  span {
    font-size: 14px;
    margin-top: 15px;

    b {
      color: ${Constants.STRONG_TEXT_COLOR};
    }
  }

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
`;

const AditionalInfo = styled('div')`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: left;

  h2 {
    color: ${Constants.STRONG_TEXT_COLOR};
    margin-bottom: 15px;
  }

  p {
    margin-top: 0;
    margin-bottom: 15px;
    text-align: justify;

    b {
      color: ${Constants.STRONG_TEXT_COLOR};
    }
  }

  span {
    b {
      color: ${Constants.STRONG_TEXT_COLOR};
    }
  }
`;

const Separator = styled('div')`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.textColor};
  margin-top: 10px;
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
      url = '',
      id,
    } = propsState;
    this.state = {
      isEditing,
      title,
      url,
      id,
      mustNavigate: false,
      loadingPreview: false,
      showingPreview: false,
      errorMessage: '', 
    };
  };

  componentDidMount() {
    if(this.state.isEditing){
      this.setState({loadingPreview: true});
      this.getYoutubeVideoData();
    }
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = event.target.value;
    const name = target.name;
    
    this.setState({
      [name]: value
    }, this.validateFields);

  };

  uploadVideo = () => {
    if(this.validateFields()){
      this.setState({loading: true});
      const response = ServerServices.createVideo(this.state.title, this.state.url, this.state.id);
      response.then((result) => {
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
    if (this.state.url === '') {
      this.setState({
        loadingPreview: false,
        showingPreview: false,
        emptyFields: true,
        errorMessage: Constants.CREATE_UPDATE_CONTENT_ERROR_MESSAGES.FIELDS_EMPTY,
      });
    }else if(!this.youtubeParser(this.state.url)){
      this.setState({
        loadingPreview: false,
        showingPreview: false,
        invalidUrl: true,
        errorMessage: Constants.CREATE_UPDATE_CONTENT_ERROR_MESSAGES.INVALID_URL,
      });
    }else{
      this.setState({
        loadingPreview: true,
        invalidUrl: false,
        emptyFields: false,
        errorMessage: '',
      }, this.getYoutubeVideoData);
    }
  };

  getYoutubeVideoData = () => {
    const response = ServerServices.getYoutubeData(this.state.url);
    response.then((youtubeData) => {
      this.setState({
        loadingPreview: false,
        showingPreview: true,
        videoData: youtubeData.items[0],
        selectedThumbnail: this.selectThumbnail(youtubeData.items[0]),
        videoDuration: DateFormater.youtubeTime(youtubeData.items[0].contentDetails.duration)
      })
    })
  };

  selectThumbnail = (youtubeData) => {
    if(youtubeData.snippet.thumbnails.maxres) {
      return youtubeData.snippet.thumbnails.maxres
    }
    if(youtubeData.snippet.thumbnails.standard) {
      return youtubeData.snippet.thumbnails.standard
    }
    if(youtubeData.snippet.thumbnails.high) {
      return youtubeData.snippet.thumbnails.high
    }
    if(youtubeData.snippet.thumbnails.medium) {
      return youtubeData.snippet.thumbnails.medium
    }
    if(youtubeData.snippet.thumbnails.default) {
      return youtubeData.snippet.thumbnails.default
    }
  }

  // Esta función extrae el ID de un video de youtube desde la URL: url soportadas:
  // http://www.youtube.com/watch?v=0zM3nApSvMg&feature=feedrec_grec_index
  // http://www.youtube.com/user/IngridMichaelsonVEVO#p/a/u/1/QdK8U-VIH_o
  // http://www.youtube.com/v/0zM3nApSvMg?fs=1&amp;hl=en_US&amp;rel=0
  // http://www.youtube.com/watch?v=0zM3nApSvMg#t=0m10s
  // http://www.youtube.com/embed/0zM3nApSvMg?rel=0
  // http://www.youtube.com/watch?v=0zM3nApSvMg
  // http://youtu.be/0zM3nApSvMg
  youtubeParser = (url) => {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : false;
  }

  deleteItem = () => {
    swal(Constants.CONFIRM_DELETE_ACTION_ALERT_CONTENT)
    .then((dismiss) => {
      swal(Constants.SERVICE_NOT_AVAILABLE_ON_BACKEND)
    })
  }

  cancel = () => {
    this.setState({mustNavigate: true})
  };

  render() {
    console.log(this.state, this.props)
    if(this.state.mustNavigate){
      return <Redirect push to='/dashboard/contenido/video'/>
    }
    return (
      <ThemeProvider theme={theme}>
        <SectionContainer>
          <BreadCrumbs mainSection={this.state.isEditing ? 'editVideo' : 'newVideo'}/>
          <div className='content'>
            <h1>
              {this.state.isEditing ? 'Editar video' : 'Añadir video'}
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
              LINK DEL VIDEO
              <input 
                type='text'
                name='url'
                className={
                  `${this.state.emptyFields && this.state.url === '' ? 'red' : ''}
                   ${this.state.invalidUrl ? 'red' : ''}
                  `}
                placeholder='Link del video'
                defaultValue={this.state.url ? this.state.url : ''}
                onChange={this.handleInputChange}/>
            </label>
            <ErrorMessage display={this.state.emptyFields || this.state.invalidUrl ? 1 : 0}>
              {this.state.errorMessage}
            </ErrorMessage>
            {this.state.loadingPreview && 
              <LoaderContainer>
                <Loader width='50%' height='100px'/>
                <span>Cargando previsualización...</span>
              </LoaderContainer>
            }
            {this.state.showingPreview &&
              <React.Fragment>
                <Preview>
                  <h2>Previsualización</h2>
                  <img src={this.state.selectedThumbnail.url} alt='video_thumbnail'/>
                  <div className='videoData'>
                    <h3>{this.state.videoData.snippet.title}</h3>
                    <span><b>Duración:</b> {this.state.videoDuration}</span>
                  </div>
                </Preview>
                <Separator/>
                <AditionalInfo>
                  <h2>Información adicional</h2>
                  <p><b>Canal:</b><br/> {this.state.videoData.snippet.channelTitle}</p>
                  <p><b>Descripción:</b><br/>{this.state.videoData.snippet.description}</p>
                  <span><b>Fecha de publicación:</b><br/>{`${DateFormater.fullDateString(new Date(this.state.videoData.snippet.publishedAt))}`}</span>
                </AditionalInfo>
              </React.Fragment>
            }
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
                disabled={this.state.url === '' ? true : false}
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