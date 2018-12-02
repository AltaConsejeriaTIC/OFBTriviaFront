// Orquesta Filarmónica de Bogotá - Trivia admin.
// details.js

import React from 'react';
import { Redirect } from 'react-router-dom';
import styled, {ThemeProvider} from 'styled-components';
//Sweet Alert 2
import swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
//Custom Constants
import * as Constants from '../../../../constants.js';
import AnswerCard from './answerCard.js';
import PageController from '../../../utilities/pageController.js';
import { Button } from '../../../utilities/button.js';
import * as Formater from '../../../utilities/dateFormater.js';
import * as ServerServices from '../../../utilities/serverServices.js';
import NoItemsAvailable from '../../../utilities/noItemsAvailable.js';

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

class TriviaDetails extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      redirectToEdit: false,
      question: this.props.location.state,
      scoring: false,
      answers: [],
      winners: [],
    };
  };

  componentDidMount() {
    this.getAnswersList();
  }

  getAnswersList = () => {
    const answers = ServerServices.getAnswersList(this.state.question.id);
    answers.then((answers) => {
      this.setState({answers: answers})
    })
  };

  onPageChange = (page) => {
    this.setState({currentPage: page});
  };

  startScoring = () => {
    this.setState((prevState, props) => {
      return {scoring: !prevState.scoring};
    });
  };

  onScoringHandler = (userId, scored) => {
    if(scored) {
      this.setState((prevState, props) => {
        prevState.winners.push(userId);
        return prevState;
      })
    } else {
      this.setState((prevState, props) => {
        const winnersToRemove = [userId];
        prevState.winners = prevState.winners.filter(item => !winnersToRemove.includes(item));
        return prevState;
      })
    }
  };

  saveWinners = () => {
    swal(Constants.SAVE_WINNERS_ALERT_CONTENT)
    .then((dismiss) => {
      if (dismiss.dismiss) {
        return;
      }else {
        console.log(this.state.question.id)
        const result = ServerServices.saveWinners(this.state.winners, this.state.question.id);
        result.then((response) => {
          if(response.status === 200) {
            this.setState({scoring: false});
          }
        })
      }
    })
  };

  goToEdit = () => {
    this.setState({redirectToEdit: true})
  };

  render() {
    if(this.state.redirectToEdit){
      return <Redirect push to={{
        pathname: '/dashboard/trivia/edit',
        state: {question: this.state.question, onEdit: true}
      }}/>
    } 
      console.log(this.state)
    return (
      <ThemeProvider theme={theme}>
        <TriviaDetailsContainer>
          <div className='nav-header'>
          </div>
          <div className='trivia-info'>
            <div className='date'>
              <h4>FECHA</h4>
              <span>Fecha de la publicación:</span>
              <span>{Formater.fullDateString(this.state.question.startDate)
              }</span>
              <span>Fecha de cierre:</span>
              <span>{Formater.fullDateString(this.state.question.endDate)
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
            {!this.state.scoring &&
            <Button
              primary
              width='auto'
              height='40px'
              border
              onClick={this.goToEdit}>
              Editar Pregunta
            </Button>
            }
            {!this.state.scoring &&
            <Button
              primary
              width='auto'
              height='40px'
              border
              onClick={this.startScoring}>
              Seleccionar Ganadores
            </Button>
            }
            {this.state.scoring &&
            <Button
              cancel
              width='auto'
              height='40px'
              border
              onClick={this.startScoring}>
              CANCELAR
            </Button>
            }
            {this.state.scoring &&
            <Button
              winners
              width='auto'
              height='40px'
              border
              onClick={this.saveWinners}>
              PUBLICAR GANADORES
            </Button>
            }
          </div>
          <AnswersList>
            {this.state.answers.length > 0 &&
              <div className='answers-list-header'>
                <span>USUARIO</span>
                <span>RESPUESTA</span>
                <span>FECHA Y HORA</span>
              </div>
            }
            {this.state.answers.map((item, index) => {
              return <AnswerCard
                key={index}
                answer={item}
                scoring={this.state.scoring}
                onScoring={this.onScoringHandler}
                selected={item.score}/>
            })}
            {this.state.answers.length > 4 &&
            <PageController
              items={this.state.totalQuestions}
              currentPage={this.state.currentPage}
              onPageChange={this.onPageChange}/>
            }
            {this.state.answers.length === 0 &&
              <NoItemsAvailable section='details'/>
            }
          </AnswersList>
        </TriviaDetailsContainer>
      </ThemeProvider>
    )
  }
}

export default TriviaDetails;