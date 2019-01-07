// Orquesta Filarmónica de Bogotá - Trivia admin.
// trivia.js - Trivia Home page

import React from 'react';
import { Link } from 'react-router-dom';
import styled, {ThemeProvider} from 'styled-components';
//Custom Constants
import * as Constants from '../../../constants.js';
import SectionTitle from '../../utilities/sectionTitle.js';
import NavColumn from '../../utilities/navColumn.js';
import * as ServerServices from '../../utilities/serverServices.js';
import NoItemsAvailable from '../../utilities/noItemsAvailable.js';
import Loader from '../../utilities/loader.js';

const theme = Constants.TRIVIA_THEME;

const NewsLettlerListContainer = styled('div')`
  display: flex;
  flex-direction: column;
  height: ${props => props.theme.containerHeight};
  background-color: ${props => props.theme.backgroundColor};
  padding: 0 5%;

  .content {
    display: flex;
    flex-direction: row;
    flex-grow: 1;
  }
`;

const EmailList = styled('div')`
  display: flex;
  flex-direction: column;
  max-height: 100%;
  width: 75%;

  .list-header {
    display: flex;
    flex-direction: row;
    width: 100%;
    min-height: 30px;
    margin-top: 10px;

    span {
      color: ${Constants.LIST_HEADER_TEXT_COLOR};
      letter-spacing: 1px;
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

  .cards-container {
    overflow: auto;
    flex-grow: 1;
  }
`;

class NewsLetterList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      emailList: [],
      isMounted: false,
    };
  };

  componentDidMount() {
    this.setState({isMounted: true})
  }

  compoenentWillUnmount() {
    this.setState({isMounted: false})
  }

  getEmailList = () => {
    //this.setState({currentPage: page});
  };

  render() {
    console.log(this.props)
    return (
      <ThemeProvider theme={theme}>
        <NewsLettlerListContainer>
          <SectionTitle>
            <h1>Boletín de noticias</h1>
            <div className='separator'/>
          </SectionTitle>
          <div className='content'>
            <NavColumn currentSection={this.props.location.pathname.split('/')[2]}/>
            { this.state.loading &&
              <Loader/>
            }
            <p>
              Esta sección contiene la lista de correos electrónicos de todos los participantes que solicitaron recibir noticias por este medio al responder la trivia. 
            </p>
            <EmailList>
            {this.state.emailList && this.state.emailList.map((userData) => {
              return (
                <div>
                  <p>{userData.email}</p>
                </div>
              )
            })}
            </EmailList>
          </div>
        </NewsLettlerListContainer>
      </ThemeProvider>
    )
  }
}

export default NewsLetterList;