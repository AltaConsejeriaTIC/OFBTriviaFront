// Orquesta Filarmónica de Bogotá - Trivia admin.
// newTrivia.js

import React from 'react';
import { Redirect } from 'react-router-dom';
import styled, { ThemeProvider, css } from 'styled-components';
import swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
//Custom Constants
import * as Constants from '../../../../constants.js';
import { Button } from '../../../utilities/button.js';
import BreadCrumbs from '../../../utilities/breadCrumbs.js';
import * as ServerServices from '../../../utilities/serverServices.js';
import * as DateFormater from '../../../utilities/dateFormater.js';

//Calendar
import Calendar from './calendar.js';

const theme = Constants.NEW_TRIVIA_THEME;

//Section container
const SectionContainer = styled('div')`
  width: 100%;
  height: ${(props) => props.theme.containerHeight};
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  position: relative;
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.textColor};
  padding: 0 5%;
  overflow: hidden;

  .top-control {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    
    h1 {
      color: ${Constants.STRONG_TEXT_COLOR};
      font-size: 22px;
    }
  }


  label {
    display: flex;
    flex-direction: column;
    color: ${Constants.STRONG_TEXT_COLOR};
    font-size: 13px;
    font-weight: 700;

    input {
      font-family: 'Open Sans';
      font-size: 13px;
      width: 80%;
      height: 35px;
      margin: 15px 0 20px 0;
      padding-left: 15px;
      border-radius: ${Constants.UNIVERSAL_BORDER_RADIUS};
      border: solid 1px ${Constants.INPUT_BORDER_COLOR};

      &.red {
        border: 1px solid red;
      }
    }

    textarea {
      font-family: 'Open Sans';
      width 100%;
      height: 100px;
      resize: none;
      margin-top: 15px;
      padding 10px;
      border-radius: ${Constants.UNIVERSAL_BORDER_RADIUS};
      border: solid 1px ${Constants.INPUT_BORDER_COLOR};

      &.red {
        border: 1px solid red;
      }
    }

    span {
      margin-top: 10px;
      text-align: right;
    }
  }

  div {
    &.content {
      display: flex;
      flex-direction: row;
      width: 100%;

      .dates {
        position: relative;
        height: 80%;
        width: 25%;

        input {
          &.selected {
            background-color: #fcefc6;
          }
        }
      }

      .trivia-content {
        height: 80%;
        width: 75%;
        display: flex;
        flex-direction: row;

        label {
          width: 40%;
          margin-left: 5%;

          p {
            color: red;
          }
        }
      }
    }

    &.footer {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 20px;

      span {
        width: 25%;
        font-size: 13px;
      }

      .separator {
        margin: 0 20px;
        flex-grow: 1;
        height: 1px;
        background-color: #CCCCCC;
      }

      button {
        &:last-child {
          margin-left: 10px;
        }
      }
    }
  }
`;

const CalendarContainer = styled('div')`
  position: absolute;
  top: 0;
  left: 75%;
  background-color: white;
  border: solid 1px ${Constants.WEAK_BORDER_COLOR}
  border-radius: ${Constants.UNIVERSAL_BORDER_RADIUS};

  .Range .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: #f0f8ff !important;
    color: #4a90e2;
  }

  .Range .DayPicker-Day {
    border-radius: 0;
  }

  .Selectable .DayPicker-Day {
    border-radius: 0;
  }

  .Selectable .DayPicker-Day--start {
    border-top-left-radius: 50% !important;
    border-bottom-left-radius: 50% !important;
  }

  .Selectable .DayPicker-Day--end {
    border-top-right-radius: 50% !important;
    border-bottom-right-radius: 50% !important;
  }
  
  .DayPicker-Months, .DayPicker-NavBar {
    color: ${Constants.SECONDARY_BACKGROUND_COLOR};
    font-size: 11px;
  }

  ${(props) => props.currentType === 'startDate' && css`
    top: -30px;
  `}

  ${(props) => props.currentType === 'endDate' && css`
    top: 30px;
  `}
`;


class NewTrivia extends React.Component {
  constructor(props){
    super(props);
    const propsState = props.location.state ? props.location.state : {};
    const {
      isEditing = false,
      question = {content: '', answer: '', endDate: '', startDate: ''},
    } = propsState;
    if (question.startDate !== '') {
      question.startDate = DateFormater.triviaFormFormat(question.startDate);
      question.endDate = DateFormater.triviaFormFormat(question.endDate);
    }
    this.state = {
      isEditing,
      question,
      mustNavigate: false,
      returnToDetails: false,
      emptyFields: false,
      showCalendar: false,
      selectingDateType: null,
    };

    this.calendarRef = React.createRef();
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  };

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  };


  handleInputChange = (event) => {
    const target = event.target;
    const value = event.target.value;
    const name = target.name;
    
    this.setState((prevState, props) => {
      prevState.question[name] = value
      return prevState;
    });
  };

  returnToDetails = () => {
    this.setState({returnToDetails: true});
  };

  saveQuestion = () => {
    if(this.validateFields()){
      this.setState({loading: true});
      const questionData = this.state.question;
      if (this.state.isEditing) {questionData.id = this.state.question.id}
      const response = ServerServices.createQuestion(questionData);
      response.then((result) => {
        if(result.id){
          this.setState({
            newId: result.id,
            mustNavigate: true
          });
          //Success
        }else{
          swal(Constants.ERROR_TRIVIA_ALERT_CONTENT);
        }
      })
    } else {
      this.setState({emptyFields: true});
    }
  };

  validateFields = () => {
    if (this.state.question.startDate === '' ||
        this.state.question.endDate === '' ||
        this.state.question.content === '' ||
        this.state.question.answer === '') {
      return false;
    }else{
      return true;
    }
  };

  onStartDateSelection = (day) => {
    this.setState((prevState, props) => {
      prevState.question.startDate = day;
      prevState.showCalendar = false;
      return prevState;
    });
  };

  onEndDateSelection = (day) => {
    this.setState((prevState, props) => {
      prevState.question.endDate = day;
      prevState.showCalendar = false;
      return prevState;
    });
  };

  handleDateInput = (event) => {
    this.setState({
      selectingDateType: event.target.name,
      showCalendar: true,
    })
  };

  showCalendar = () => {
    this.setState({showCalendar: true})
  };

  hideCalendar = () => {
    this.setState({
      showCalendar: false,
      selectingDateType: null
    })
  };

  cancel = () => {
    this.setState({mustNavigate: true})
  };

  deleteItem = () => {
    swal(Constants.CONFIRM_DELETE_ACTION_ALERT_CONTENT)
    .then((result) => {
      if(result.value) {
        this.setState({loading: true});
        ServerServices.deleteTrivia(this.state.question.id)
        .then((response) => {
          if (response) {
            swal(Constants.ITEM_DELETE_ALERT_CONTENT('trivia'))
            .then(() => {
              this.setState({mustNavigate: true});
            })
          }
        }) 
      }
    })
  };

  handleClickOutside = (event) => {
    const ref = this.calendarRef.current;
    if (ref && !ref.contains(event.target)) {
      this.hideCalendar();
    }
  }

  render() {
    if(this.state.mustNavigate){
      return <Redirect push to='/admin/trivia'/>
    }

    if(this.state.returnToDetails){
      return <Redirect push to={{
        pathname: `/admin/trivia/${this.state.question.id}`,
        state: this.state.question
      }}/>
    }
    if(this.state.mustNavigate){
      return <Redirect push to={`/admin/trivia/${this.state.newId}`}/>
    }
    return (
      <ThemeProvider theme={theme}>
        <SectionContainer>
          <BreadCrumbs
            mainSection={this.state.isEditing ? 'editTrivia' : 'newTrivia'}
            questionId={this.state.question.id}
            returnToDetails={this.returnToDetails}
            margin/>
          <div className='top-control'>
            <h1>{this.state.isEditing ? 'Editar Pregunta' : 'Añadir pregunta'}</h1>
            {this.state.isEditing &&
              <Button
                delete
                border
                width='140px'
                onClick={this.deleteItem}>
                Eliminar
              </Button>
            }
          </div>
          <div className='content'>
            <div className='dates'>
              <label>
                FECHA DE PUBLICACIÓN
                <input 
                  type='text'
                  name='startDate'
                  readOnly
                  className={`${this.state.emptyFields && this.state.question.startDate === '' ? 'red' : ''} ${this.state.selectingDateType === 'startDate' ? 'selected' : ''}`}
                  placeholder='aaaa-mm-dd'
                  value={this.state.question.startDate}
                  onClick={this.handleDateInput}/>
              </label>
              <label>
                FECHA DE CIERRE
                <input
                  readOnly
                  type='text'
                  name='endDate'
                  className={`${this.state.emptyFields && this.state.question.endDate === '' ? 'red' : ''} ${this.state.selectingDateType === 'endDate' ? 'selected' : ''}`}
                  placeholder='aaaa-mm-dd'
                  value={this.state.question.endDate}
                  onClick={this.handleDateInput}/>
              </label>
              {this.state.showCalendar &&
                <CalendarContainer currentType={this.state.selectingDateType} 
                    ref={this.calendarRef}>
                  <Calendar 
                    currentType={this.state.selectingDateType}
                    from={this.state.question.startDate}
                    to={this.state.question.endDate}
                    onStartDateSelection={this.onStartDateSelection}
                    onEndDateSelection={this.onEndDateSelection}/>
                </CalendarContainer>
              }
            </div>
            <div className='trivia-content'>
              <label>
                PREGUNTA
                <textarea
                  name='content'
                  className={this.state.emptyFields && this.state.question.content === '' ? 'red' : ''}
                  placeholder='Escribe aquí la pregunta.'
                  onChange={this.handleInputChange}
                  maxLength={Constants.TRIVIA_QUESTION_MAX_CHARACTERS}
                  defaultValue={this.state.question.content}
                  onFocus={this.hideCalendar}/>
                <span>{this.state.question.content.length + ' DE 140 CARACTERES'}</span>
                {this.state.emptyFields && this.state.question.content === '' && 
                  <p>{Constants.CREATE_UPDATE_TRIVIA_ERROR_MESSAGES.CONTENT_FIELD_EMPTY}</p>
                }
              </label>
              <label>
                RESPUESTA
                <textarea
                  name='answer'
                  className={this.state.emptyFields && this.state.question.answer === '' ? 'red' : ''}
                  placeholder='Escribe aquí la respuesta.'
                  onChange={this.handleInputChange}
                  maxLength={Constants.TRIVIA_ANSWER_MAX_CHARACTERS}
                  defaultValue={this.state.question.answer}
                  onFocus={this.hideCalendar}/>
                <span>{this.state.question.answer.length + ' DE 140 CARACTERES'}</span>
                {this.state.emptyFields && this.state.question.answer === '' && 
                  <p>{Constants.CREATE_UPDATE_TRIVIA_ERROR_MESSAGES.ANSWER_FIELD_EMPTY}</p>
                }
              </label>
            </div>
          </div>
          <div className='footer'>
            <span>Recuerda que no puedes publicar una trivia hasta que hayan pasado al menos dos días desde la finalización de la anterior. Así, habrá tiempo para mostrar los ganadores.</span>
            <div className='separator'/>
            <Button primary border width='100px' onClick={this.cancel}>Cancelar</Button>
            <Button primary border width='150px' onClick={this.saveQuestion}>Guardar Trivia</Button>
          </div>
        </SectionContainer>
      </ThemeProvider>
    );
  }
}

export default NewTrivia;