// Orquesta Filarmónica de Bogotá - Trivia admin.
// trivia.js - Trivia Home page

import React from 'react';
import { Link } from 'react-router-dom';
import styled, {ThemeProvider} from 'styled-components';
//Custom Constants
import * as Constants from '../../../constants.js';
import SectionTitle from '../../utilities/sectionTitle.js';
import NavColumn from '../../utilities/navColumn.js';
import InfoCard from './infoCard.js';
import * as ServerServices from '../../utilities/serverServices.js';
import NoItemsAvailable from '../../utilities/noItemsAvailable.js';
import Loader from '../../utilities/loader.js';

const theme = Constants.TRIVIA_THEME;

const TriviaContainer = styled('div')`
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

const TriviaList = styled('div')`
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

class Trivia extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentPage: 1,
      questions: [],
      isMounted: false,
    };
  };

  componentDidMount() {
    this.setState({isMounted: true})
    this.getTriviaPage();
  }

  compoenentWillUnmount() {
    this.setState({isMounted: false})
  }

  getTriviaPage = (customPage) => {
    const page = this.state.currentPage;
    const questions = ServerServices.getTriviaList(null, page);
    questions.then((questions) => {
      if(questions.length > 0){
        questions.forEach((question) => {
          question.startDate = new Date(question.startDate);
          question.endDate = new Date(question.endDate);
        })
        if(this.state.isMounted) {
          this.setState((prevState, props) => {
            prevState.questions = prevState.questions.concat(questions);
            prevState.currentPage += 1;
            return prevState;
          }, this.getTriviaPage())
        }
      }
    })
  };

  PageChange = (page) => {
    this.setState({currentPage: page});
  };

  trackScrolling = (event) => {
    if (event.target.scrollTop + 1 > event.target.scrollHeight - event.target.getBoundingClientRect().height) {
      console.log(this.state.currentPage)
      this.getTriviaPage();
    }
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <TriviaContainer>
          <SectionTitle>
            <h1>Administrar preguntas y respuestas</h1>
            <div className='separator'/>
            <Link to='/dashboard/trivia/new'>Agregar una trivia nueva</Link>
          </SectionTitle>
          <div className='content'>
            <NavColumn currentSection={this.props.location.pathname.split('/')[2]}/>
            { this.state.loading &&
              <Loader/>
            }
            { !this.state.loading &&
              <TriviaList>
                {this.state.questions.length > 0 &&
                <div className='list-header'>
                  <span>FECHA</span>
                  <span>PREGUNTA</span>
                  <span>ESTADO</span>
                  <span>RESPUESTA</span>
                </div>
                }
                {this.state.questions && 
                  <div className='cards-container' onScroll={this.trackScrolling}>
                    {this.state.questions.map((item, index) => {
                      return <InfoCard 
                        key={index}
                        question={item}
                        id={index}
                        selected={item.status === 'Publicada' ? 1 : 0}
                        path={this.props.location.pathname} />
                    })}
                  </div>
                }
                {this.state.questions.length === 0 && 
                  <NoItemsAvailable section='trivia'/>
                }
              </TriviaList>
            }
          </div>
        </TriviaContainer>
      </ThemeProvider>
    )
  }
}

export default Trivia;