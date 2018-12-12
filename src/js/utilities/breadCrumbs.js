// Orquesta Filarmónica de Bogotá.
// loader.js - This is just a css loader. Can be used on any container.
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
import { Link }from 'react-router-dom';
//Styled components
import styled from 'styled-components';
//Custom Constants
import * as Constants from '../../constants.js';

const Container = styled('div')`
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 45px;
  margin-left: ${(props) => props.margin ? '-5%' : '0'};
  padding-left: 5%;
  background-color: white;
  border-bottom: solid 1px ${Constants.WEAK_BORDER_COLOR};
  color: ${Constants.BREAD_CRUMBS_TEXT_COLOR}

  a {
    text-decoration: none;
    color: ${Constants.BREAD_CRUMBS_TEXT_COLOR}
  }

  span {
    &.vertical-separator {
      margin: 0 5px;
    }

    &.current {
      font-weight: 700;
    }
  }
`;

const mainSectionsNames = {
  newTrivia: 'Trivias',
  editTrivia: 'Trivias',
  details: 'Trivias',
  newAudio: 'Audios',
  editAudio: 'Audios',
  newVideo: 'Videos',
  editVideo: 'Videos',
}

const mainSectionsURLs = {
  newTrivia: '/dashboard/trivia',
  editTrivia: '/dashboard/trivia',
  details: '/dashboard/trivia',
  newAudio: '/dashboard/contenido/audio',
  editAudio: '/dashboard/contenido/audio',
  newVideo: '/dashboard/contenido/video',
  editVideo: '/dashboard/contenido/video'
}

const subSectionNames = {
  newTrivia: 'Nueva trivia',
  editTrivia: 'Editar trivia',
  details: 'Detalle pregunta',
  newAudio: 'Nuevo audio',
  editAudio: 'Editar audio',
  newVideo: 'Nuevo video',
  editVideo: 'Editar video',
}

class BreadCrumbs extends React.Component {

  returnToDetails = (event) => {
    event.preventDefault();
    this.props.returnToDetails();
  }

  render() {
    return(
      <Container section={this.props.mainSection} margin={this.props.margin ? 1 : 0}>
        <Link to={mainSectionsURLs[this.props.mainSection]}>{mainSectionsNames[this.props.mainSection]}</Link>
        <span className='vertical-separator'>/</span>
        {this.props.mainSection === 'editTrivia' &&
          <React.Fragment>
            <Link
              to={`${mainSectionsURLs[this.props.mainSection]}/${this.props.questionId}`}
              onClick={this.returnToDetails}>
              Detalle pregunta 
            </Link>
            <span className='vertical-separator'>/</span>
          </React.Fragment>
        }
        <span className='current'>{subSectionNames[this.props.mainSection]}</span>
      </Container>
    )
  }
}

export default BreadCrumbs;