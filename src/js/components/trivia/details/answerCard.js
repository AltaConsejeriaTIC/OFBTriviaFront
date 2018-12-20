// Orquesta Filarmónica de Bogotá.
// anwerCard.js
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
//Styled components
import styled from 'styled-components';
//Custom Constants
import * as Constants from '../../../../constants.js';
import * as Formater from '../../../utilities/dateFormater.js';
import * as ServerServices from '../../../utilities/serverServices.js';
import CheckedIcon from '../../../../assets/img/trivia/checkedIcon.svg'

const InfoCardContainer = styled('div')`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 110px;
  background-color: ${Constants.INFO_CARD_BACKGROUND_COLOR};
  border: solid 1px ${(props) => props.selected ? Constants.SELECTED_ANSWER_CARD_BORDER_COLOR : Constants.INFO_CARD_BORDER_COLOR};
  border-radius: ${Constants.UNIVERSAL_BORDER_RADIUS};
  margin-bottom: 5px;

  div {
    &.user-info {
      min-width: 20%;
      width: 20%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 0 20px;

      span {
        width: 100%;
        margin-top: 3px;
        overflow: hidden;
        text-overflow: ellipsis;

        &:first-child {
          font-size: 13px;
          font-weight: 700;
          color: ${Constants.INFO_CARD_STRONG_TEXT_COLOR}
        }

        &:nth-child(2), &:last-child {
          font-size: 13px;
          color: ${Constants.INFO_CARD_WEAK_TEXT_COLOR}
        }
      }
    }

    &.date {
      min-width: 20%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: 20px;

      span {
        &:first-child, &:nth-child(3) {
          font-size: 11px;
          color: ${Constants.INFO_CARD_WEAK_TEXT_COLOR}
        }

        &:nth-child(2), &:last-child {
          font-size: 13px;
          font-weight: 700;
          color: ${Constants.INFO_CARD_STRONG_TEXT_COLOR} 
        }

        &:nth-child(2) {
          margin-bottom: 10px;
        }
      }
    }

    &.answer-body {
      height: 100%;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: 14px;
      font-family: 'Bitter';
      font-weight: 700;
      color ${Constants.INFO_CARD_STRONG_TEXT_COLOR};
    }
  }
`;

const CheckboxInput = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 10%;
  height: 100%;

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 25px;
    width: 25px;
    padding: 2px;
    cursor: pointer;
    background-color: ${(props) => props.checked ? Constants.CHECKED_ANSWER_CHECKBOX_BACKGROUND_COLOR : Constants.UNCHECKED_ANSWER_CHECKBOX_BACKGROUND_COLOR};
    border: solid 1px ${(props) => props.checked ? Constants.CHECKED_ANSWER_CHECKBOX_BORDER_COLOR : Constants.UNCHECKED_ANSWER_CHECKBOX_BORDER_COLOR};
    border-radius: ${Constants.UNIVERSAL_BORDER_RADIUS};
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .container input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
  }

  .checkmark {
      display: none;
      top: 0;
      left: 0;
      height: 80%;
      width: 80%;
  }

  .container input:checked ~ .checkmark {
      display: block;
  }
`;

const CardStatus = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 10%;
  height: 100%;

  span {
    color: #009DC2;
    font-weight: 600;
  }
`;

class AnswerCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    }
  }

  componentDidMount(){
    this.getUserData();
  }

  handleInputChange = (event) => {
    this.setState((prevState, props) => {
      return {checked: !prevState.checked}
    }, () => this.props.onScoring(this.props.answer.userId, this.state.checked))
  };

  getUserData = () => {
    const response = ServerServices.getUserData(this.props.answer.userId);
    response.then((userData) => {
      this.setState({userData: userData})
    })
  }

  render() {
    return(
      <InfoCardContainer selected={this.props.selected ? 1 : 0}>
        <div className='user-info'>
          <span>{this.state.userData ? `${this.state.userData.name} ${this.state.userData.lastName}` : 'Cargando...'}</span>
          <span>{this.state.userData ? this.state.userData.cellphone : 'Cargando...'}</span>
          <span>{this.state.userData ? this.state.userData.email : 'Cargando...'}</span>
        </div>
        <div className='answer-body'>
          {this.props.answer.content}
        </div>
        {this.props.scoring &&
          <CheckboxInput checked={this.state.checked}>
            <label className="container">
              <input type="checkbox" onChange={this.handleInputChange}/>
              <img src={CheckedIcon} alt='checkmark' className="checkmark"/>
            </label>
          </CheckboxInput>
        }
        {this.props.answer.winner === 1 &&
          <CardStatus checked={this.state.checked}>
            <span>Ganador</span>
          </CardStatus>
        }
        <div className='date'>
          <span>Hora:</span>
          <span>{Formater.hourFromDate(new Date(this.props.answer.date))}</span>
          <span>Fecha:</span>
          <span>{Formater.dayAndMonthFromDate(new Date(this.props.answer.date))}</span>
        </div>
      </InfoCardContainer>
    )
  }
}

export default AnswerCard;