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
import * as ServerServices from '../../utilities/serverServices.js';
import NoItemsAvailable from '../../utilities/noItemsAvailable.js';
import Loader from '../../utilities/loader.js';

const theme = Constants.TRIVIA_THEME;

const TriviaContainer = styled('div')`
  display: flex;
  flex-direction: column;
  min-height: ${props => props.theme.containerHeight};
  background-color: ${props => props.theme.backgroundColor};
  padding: 0 5%;

  .content {
    position: relative;
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    padding-bottom: 15px;
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

class ContenidoVideo extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      videos: [],
      loading: true,
    };
  };

  componentDidMount() {
    this.getVideosList();
  }

  onPageChange = (page) => {
    this.setState({currentPage: page});
  };

  getVideosList = () => {
    const videos = ServerServices.getVideoList();
    videos.then((videos) => {
      this.setState({
        videos: videos,
        loading: false
      })
    })
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
            { this.state.loading &&
              <Loader/>
            }
            { !this.state.loading &&
              <AudioList className='item-list'>
                {this.state.videos.map((item, index) => {
                  return <ContentCard key={index} item={item} type='video' id={index + 1}/>
                })}
                {this.state.videos.length === 0 && 
                  <NoItemsAvailable section='videos'/>
                }
              </AudioList>
            }
          </div>
        </TriviaContainer>
      </ThemeProvider>
    )
  }
}

export default ContenidoVideo;