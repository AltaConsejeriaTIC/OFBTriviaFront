// Orquesta Filarmónica de Bogotá 
// video.js

import React from 'react';
import { Link } from 'react-router-dom';
import styled, {ThemeProvider} from 'styled-components';
//Custom Constants
import * as Constants from '../../../constants.js';
import SectionTitle from '../../utilities/sectionTitle.js';
import NavColumn from '../../utilities/navColumn.js';
import ContentCard from './contentCard.js';
import PageController from '../../utilities/pageController.js';
import * as ServerServices from '../../utilities/serverServices.js';
import NoItemsAvailable from '../../utilities/noItemsAvailable.js';

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

class ContenidoAudio extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      audios: []
    };
  };

  componentDidMount() {
    this.getAudioList();
  }

  onPageChange = (page) => {
    this.setState({currentPage: page});
  };

  getAudioList = () => {
    const audios = ServerServices.getAudioList();
    audios.then((audios) => {
      this.setState({audios: audios})
    })
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <TriviaContainer>
          <SectionTitle>
            <h1>Administrar audios</h1>
            <div className='separator'/>
            <Link to='/dashboard/contenido/audio/new'>Agregar un audio nuevo</Link>
          </SectionTitle>
          <div className='content'>
            <NavColumn currentSection={this.props.location.pathname.split('/')[3]}/>
            <AudioList className='item-list'>
              {this.state.audios.map((item, index) => {
                return <ContentCard key={index} item={item} id={index + 1} type='audio'/>
              })}
              {this.state.audios.length > 4 &&
                <PageController items={this.state.totalQuestions} currentPage={this.state.currentPage} onPageChange={this.onPageChange}/>
              }
              {this.state.audios.length === 0 &&
                <NoItemsAvailable section='audios'/>
              }
            </AudioList>
          </div>
        </TriviaContainer>
      </ThemeProvider>
    )
  }
}

export default ContenidoAudio;