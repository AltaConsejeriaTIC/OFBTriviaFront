// Orquesta Filarmónica de Bogotá 
// video.js

import React from 'react';
import { Link } from 'react-router-dom';
import styled, {ThemeProvider} from 'styled-components';
//Custom Constants
import * as Constants from '../../../constants.js';
import SectionTitle from '../../utilities/sectionTitle.js';
import NavColumn from '../../utilities/navColumn.js';
import ContentCard from '../../utilities/contentCard.js';
import PageController from '../../utilities/pageController.js';

const theme = Constants.TRIVIA_THEME;

const TriviaContainer = styled('div')`
  display: flex;
  flex-direction: column;
  min-height: ${props => props.theme.containerHeight};
  background-color: ${props => props.theme.backgroundColor};
  padding: 0 5%;

  .content {
    display: flex;
    flex-direction: row;
    flex-grow: 1;
  }
`;

const AudioList = styled('div')`
  display: flex;
  flex-direction: column;
  width: 75%;

  .list-header {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 30px;

    span {
      color: ${Constants.LIST_HEADER_TEXT_COLOR};
      font-weight: 700;
      font-size: 11px;

      &:first-child {
        width: 20%;
      }

      &:nth-child(2) {
        padding-left: 40px;
        flex-grow: 1; 
      }

      &:nth-child(3) {
        text-align: center;
        width: 15%;
      }

      &:last-child {
        text-align: center;
        width: 20%; 
      }
    }
  }
`;

const videoPrototipe = {
  name: '¿Quién será el solista del concierto de la Orquesta Filarmónica de Bogotá este sábado 3 de noviembre?',
  link: 'https://open.spotify.com/track/0j3obufLXq5toSs592dX9U',
}


class ContenidoVideo extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentPage: 1,
      totalQuestions: 17,
      questions: [videoPrototipe, videoPrototipe, videoPrototipe, videoPrototipe]
    };
  };

  onPageChange = (page) => {
    this.setState({currentPage: page});
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <TriviaContainer>
          <SectionTitle>
            <h1>Administrar videos</h1>
            <div className='separator'/>
            <Link to='/dashboard/contenido/video/new'>Agregar un video nuevo</Link>
          </SectionTitle>
          <div className='content'>
            <NavColumn currentSection={this.props.location.pathname.split('/')[3]}/>
            <AudioList className='item-list'>
              {this.state.questions.map((item, index) => {
                return <ContentCard key={index} item={item}/>
              })}
              <PageController items={this.state.totalQuestions} currentPage={this.state.currentPage} onPageChange={this.onPageChange}/>
            </AudioList>
          </div>
        </TriviaContainer>
      </ThemeProvider>
    )
  }
}

export default ContenidoVideo;