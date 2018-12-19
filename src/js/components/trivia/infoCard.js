// Orquesta Filarmónica de Bogotá.
// infoCard.js
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
import { Redirect } from 'react-router-dom';
//Styled components
import styled from 'styled-components';
//Custom Constants
import * as Constants from '../../../constants.js';
import { Button } from '../../utilities/button.js';
import * as Formater from '../../utilities/dateFormater.js';

const InfoCardContainer = styled('div')`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 110px;
  background-color: ${Constants.INFO_CARD_BACKGROUND_COLOR};
  border: solid 1px ${(props) => props.selected ? Constants.SELECTED_INFOCARD_BORDER_COLOR : Constants.INFO_CARD_BORDER_COLOR};
  border-radius: ${Constants.UNIVERSAL_BORDER_RADIUS};
  margin-bottom: 5px;



  div {
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

    &.question-content {
      height: 100%;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: 14px;
      font-family: 'Bitter';
      font-weight: 700;
      color ${Constants.INFO_CARD_STRONG_TEXT_COLOR};
      padding-left: 10px;
    }

    &.status {
      min-width: 15%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: 13px;
      font-weight: 600;
      color ${(props) => props.selected ? Constants.SELECTED_INFOCARD_BORDER_COLOR : Constants.INFO_CARD_STRONG_TEXT_COLOR};
      text-align: center;
    }

    &.answer-amount {
      min-width: 20%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 0 20px;

      span {
        color: ${Constants.INFO_CARD_WEAK_TEXT_COLOR};
        font-size: 13px;
        margin-bottom: 10px;
      }

      button {
        color: white;
      }
    }
  }
`;

class InfoCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mustNavigate: false,
    }
  }

  navigateToDetails = () => {
    this.setState({mustNavigate: true});
  };

  render() {
    if(this.state.mustNavigate){
      return <Redirect push to={{
        pathname: this.props.path + '/' + this.props.question.id,
        state: this.props.question
      }}/>
    }
    return(
      <InfoCardContainer selected={this.props.selected ? 1 : 0}>
        <div className='date'>
          <span>Fecha de publicación:</span>
          <span>{Formater.fullDateString(this.props.question.startDate)}</span>
          <span>Fecha de cierre:</span>
          <span>{Formater.fullDateString(this.props.question.endDate)}</span>
        </div>
        <div className='question-content'>
          {this.props.question.content}
        </div>
        <div className='status'>
          {this.props.question.status}
        </div>
        <div className='answer-amount'>
          <span>{`${this.props.question.answersCount} respuestas`}</span>
          <Button onClick={this.navigateToDetails} border>Ver detalle</Button>
        </div>
      </InfoCardContainer>
    )
  }
}

export default InfoCard;