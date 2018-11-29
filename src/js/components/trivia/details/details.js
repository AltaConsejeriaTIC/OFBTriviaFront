// Orquesta Filarmónica de Bogotá - Trivia admin.
// details.js

import React from 'react';
import { Redirect } from 'react-router-dom';
import styled, {ThemeProvider} from 'styled-components';
//Custom Constants
import * as Constants from '../../../../constants.js';
import AnswerCard from './answerCard.js';
import PageController from '../../../utilities/pageController.js';
import { Button } from '../../../utilities/button.js';
import * as Formater from '../../../utilities/dateFormater.js';

const theme = Constants.DETAILS_TRIVIA_THEME;

const TriviaDetailsContainer = styled('div')`
  display: flex;
  flex-direction: column;
  min-height: ${props => props.theme.containerHeight};
  background-color: ${props => props.theme.backgroundColor};
  padding: 0 5%;

  .nav-header {
    position: absolute;
    width: 100%;
    height: 35px;
    margin-left: -5%;
    background-color: white;
    border-bottom: solid 1px ${Constants.WEAK_BORDER_COLOR};
  }

  .section-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;

    h2 {
      margin: 0;
      font-size: 20px;
      color: ${props => props.theme.superStrongTextColor};
    }

    .question-mark {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 10px;
      font-weight: 800;
      color: ${props => props.theme.superStrongTextColor}
      background-color: white;
      border-radius: 50%;
      height: 30px;
      width: 30px;
    }

    p {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      flex-grow: 1;
      width: 400px;
      padding: 15px;
      margin: 0;
      font-size: 13px;
      color: ${props => props.theme.strongTextColor}
      background-color: white;
      border: solid 1px ${Constants.WEAK_BORDER_COLOR};
      border-radius: ${Constants.UNIVERSAL_BORDER_RADIUS};

      span {
        font-weight: 700;
        color: ${Constants.SELECTED_ANSWER_CARD_BORDER_COLOR};
      }
    }

    button {
      margin-left: 8px;
      padding: 0 15px;
    }
  }
  
  .trivia-info {
    display: flex;
    flex-direction: row;
    margin: 40px 0 20px 0;

    div {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;

      &:nth-child(2) {
        padding-left: 40px;
        min-width: 40%; 
      }

      &:last-child {
        min-width: 40%; 
      }
    }

    h4 {
      color: ${props => props.theme.strongTextColor};
      letter-spacing: 1px;
      font-weight: 700;
      font-size: 11px;
      margin-bottom: 12px;
    }

    h3 {
      color: ${props => props.theme.superStrongTextColor};
      font-family: 'Bitter';
      font-weight: 500;
      font-size: 16px;
      margin-top: 0;
      margin-bottom: 12px;
    }

    h2 {
      color: ${props => props.theme.superStrongTextColor};
      font-family: 'Bitter';
      font-weight: 700;
      font-size: 18px;
      margin-top: 0;
      margin-bottom: 12px;
    }

    .date {
      min-width: 20%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;

      span {

        &:nth-child(2), &:nth-child(4) {
          color: ${props => props.theme.normalTextColor};
          font-size: 11px;
        };

        &:nth-child(3), &:last-child {
          font-size: 13px;
          font-weight: 700;
          color: ${props => props.theme.superStrongTextColor}; 
        };

        &:nth-child(3) {
          margin-bottom: 10px;
        };
      }
    }


  }
`;

const AnswersList = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;

  .answers-list-header {
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
        flex-grow: 1; 
      }

      &:nth-child(3) {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding-left: 20px;
        text-align: left;
        width: 20%;
      }
    }
  }
`;

const answerPrototipe = {
  username: 'Alejandro Díaz Vecchio',
  hour: '23:59',
  date: '12 de Noviembre',
  body: 'El solista del próximo concierto es el violinista Samuel Jiménez',
  email: 'aldiazve@unal.edu.co',
  phone: 'xxx-xxx-xxxx'
}

class TriviaDetails extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      redirectToEdit: false,
      question: this.props.location.state,
      answers: [answerPrototipe, answerPrototipe, answerPrototipe, answerPrototipe]
    };
  };

  PageChange = (page) => {
    this.setState({currentPage: page});
  };

  goToEdit = () => {
    this.setState({redirectToEdit: true})
  }

  render() {
    if(this.state.redirectToEdit){
      return <Redirect push to={{
        pathname: '/dashboard/trivia/edit',
        state: {question: this.state.question, onEdit: true}
      }}/>
    } 
    return (
      <ThemeProvider theme={theme}>
        <TriviaDetailsContainer>
          <div className='nav-header'>
          </div>
          <div className='trivia-info'>
            <div className='date'>
              <h4>FECHA</h4>
              <span>Fecha de la publicación:</span>
              <span>{Formater.formatDate(this.state.question.startDate.getDate(),
                                         this.state.question.startDate.getMonth(),
                                         this.state.question.startDate.getFullYear())
              }</span>
              <span>Fecha de cierre:</span>
              <span>{Formater.formatDate(this.state.question.endDate.getDate(),
                                         this.state.question.endDate.getMonth(),
                                         this.state.question.endDate.getFullYear())
              }</span>
            </div>
            <div>
              <h4>RESPUESTA CORRECTA</h4>
              <h2>Samuel Jímenez, violín (Colombia)</h2>
            </div>
            <div>
              <h4>PREGUNTA</h4>
              <h3>{this.state.question.content}</h3>
            </div>
          </div>
          <div className='section-header'>
            <h2>
              Respuestas de los usuarios
            </h2>
            <span className='question-mark'>?</span>
            <p>
              Las respuestas resaltadas con color <span>azul</span> son las respuestas que segun nuestro algoritmo se parecen más a la respuesta correcta.
            </p>
            <Button
              primary
              width='auto'
              border
              onClick={this.goToEdit}>
              Editar Pregunta
            </Button>
            <Button
              primary
              width='auto'
              border>
              Seleccionar Ganadores
            </Button>
          </div>
          <AnswersList>
            <div className='answers-list-header'>
              <span>USUARIO</span>
              <span>RESPUESTA</span>
              <span>FECHA Y HORA</span>
            </div>
            {this.state.answers.map((item, index) => {
              if(index === 1){
                return <AnswerCard
                  key={index}
                  answer={item}
                  path={this.props.location.pathname}
                  selected/>  
              }
              return <AnswerCard key={index} answer={item}/>
            })}
            <PageController items={this.state.totalQuestions} currentPage={this.state.currentPage} onPageChange={this.onPageChange}/>
          </AnswersList>
        </TriviaDetailsContainer>
      </ThemeProvider>
    )
  }
}

export default TriviaDetails;