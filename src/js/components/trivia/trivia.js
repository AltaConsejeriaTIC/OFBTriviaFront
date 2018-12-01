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

const TriviaList = styled('div')`
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
`;

const questionPrototipe = {
  startDate: '19 Noviembre de 2018',
  endDate: '21 Noviembre de 2018',
  question: '¿Quién será el solista del concierto de la Orquesta Filarmónica de Bogotá este sábado 3 de noviembre?',
  status: 'Programada',
  answers: 13
}

class Trivia extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentPage: 1,
      totalQuestions: 0,
      questions: []
    };
  };


  componentDidMount() {
    this.getTriviaPage(1);
  }

  getTriviaPage = (page) => {
    const questions = ServerServices.getTriviaList(null, page);
    questions.then((questions) => {
      questions.forEach((question) => {
        question.startDate = new Date(question.startDate);
        question.endDate = new Date(question.endDate);
      })
      this.setState({questions: questions})
    })
  }

  PageChange = (page) => {
    this.setState({currentPage: page});
  };

  render() {
    console.log(this.state)
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
            <TriviaList className='item-list'>
              {this.state.totalQuestions > 4 &&
              <div className='list-header'>
                <span>FECHA</span>
                <span>PREGUNTA</span>
                <span>ESTADO</span>
                <span>RESPUESTA</span>
              </div>
              }
              {this.state.questions.map((item, index) => {
                if(index === 1){
                  return <InfoCard
                    key={index}
                    question={item}
                    id={index}
                    path={this.props.location.pathname}  
                    selected={item.status === 'Publicada' ? 1 : 0}/>
                }
                return <InfoCard 
                  key={index}
                  question={item}
                  id={index}
                  path={this.props.location.pathname} />
              })}
              {this.state.totalQuestions > 4 &&
              <PageController 
                items={this.state.totalQuestions}
                currentPage={this.state.currentPage}
                onPageChange={this.onPageChange}/>
              }
              {this.state.totalQuestions === 0 && 
                <NoItemsAvailable section='trivia'/>
              }
            </TriviaList>
          </div>
        </TriviaContainer>
      </ThemeProvider>
    )
  }
}

export default Trivia;