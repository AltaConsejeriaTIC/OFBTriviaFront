// Orquesta Filarmónica de Bogotá.
// anwerCard.js
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
//Styled components
import styled from 'styled-components';
//Custom Constants
import * as Constants from '../../../../constants.js';

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
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      min-width: 20%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: 20px;

      span {

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
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
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

class AnswerCard extends React.Component {
  render() {
    console.log(this.props)
    return(
      <InfoCardContainer selected={this.props.selected ? 1 : 0}>
        <div className='user-info'>
          <span>{this.props.answer.username}</span>
          <span>{this.props.answer.phone}</span>
          <span>{this.props.answer.email}</span>
        </div>
        <div className='answer-body'>
          {this.props.answer.body}
        </div>
        <div className='answer-body'>
          {this.props.answer.body}
        </div>
        <div className='date'>
          <span>Hora:</span>
          <span>{this.props.answer.hour}</span>
          <span>Fecha:</span>
          <span>{this.props.answer.date}</span>
        </div>
      </InfoCardContainer>
    )
  }
}

export default AnswerCard;