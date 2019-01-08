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

  p {
    color: ${Constants.LIST_HEADER_TEXT_COLOR};
  }

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

  table {
    border-collapse: collapse;
    width: 100%;
  }

  th, td {
    text-align: center;
    padding: 8px;
  }

  tr:nth-child(even){background-color: #f2f2f2}

  th {
    background-color: ${Constants.SECONDARY_BACKGROUND_COLOR};
    color: white;
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
    this.getEmailList()
  }

  compoenentWillUnmount() {
    this.setState({isMounted: false})
  }

  getEmailList = () => {
    const response =  ServerServices.getNewsLetter();
    response.then((emails) => {
      this.setState({emailList: emails});
    })
  };

  render() {
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
            <EmailList>
              <p>
                Esta sección contiene la lista de correos electrónicos de todos los participantes que solicitaron recibir noticias por este medio al responder la trivia. 
              </p>
              <table>
                <thead>
                  <tr>
                    <th>
                      NOMBRE
                    </th>
                    <th>
                      EMAIL
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.emailList && this.state.emailList.map((userData) => {
                    return (
                      <tr key={userData.email}>
                        <td>
                          {`${userData.name} ${userData.lastName}`} 
                        </td>
                        <td>
                          {userData.email}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              {this.state.emailList.length === 0 && 
                <NoItemsAvailable section='newsLetter'/>
              }
            </EmailList>
          </div>
        </NewsLettlerListContainer>
      </ThemeProvider>
    )
  }
}

export default NewsLetterList;