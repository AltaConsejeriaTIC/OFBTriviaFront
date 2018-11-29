// Orquesta Filarmónica de Bogotá.
// infoCard.js
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
//Styled components
import styled from 'styled-components';
//Custom Constants
import * as Constants from '../../../constants.js';
import { LinkButton } from '../../utilities/button.js';

const InfoCardContainer = styled('div')`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 110px;
  background-color: ${Constants.INFO_CARD_BACKGROUND_COLOR};
  border: solid 1px ${Constants.INFO_CARD_BORDER_COLOR};
  border-radius: ${Constants.UNIVERSAL_BORDER_RADIUS};
  margin-bottom: 5px;

  div {
    &.audio-content {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      height: 100%;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: 14px;
      font-family: 'Bitter';
      font-weight: 700;
      color ${Constants.INFO_CARD_STRONG_TEXT_COLOR};
      padding: 0 50px 0 15px;

      h2 {
        font-size: 15px;
        margin-bottom: 5px;
      }

      a {
        text-decoration: none;
        font-weight: 600;
        font-family: 'Open Sans';
        color: #2CABE2;
      }
    }

    &.edit-button {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      min-width: 20%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 0 20px;
    }
  }
`;

class ContentCard extends React.Component {
  render() {
    return(
      <InfoCardContainer>
        <div className='audio-content'>
          <h2>{this.props.item.name}</h2>
          <a href={this.props.item.link}>{this.props.item.link}</a>
        </div>
        <div className='edit-button'>
          <LinkButton to='#' primary={1} border={1}>Editar audio</LinkButton>
        </div>
      </InfoCardContainer>
    )
  }
}

export default ContentCard;