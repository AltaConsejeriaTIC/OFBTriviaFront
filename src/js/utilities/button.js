// Orquesta Filarmónica de Bogotá - Trivia admin.
// buttons.js
import { Link } from 'react-router-dom';
//Styled components
import styled, { css } from 'styled-components';
//Custom Constants
import * as Constants from '../../constants.js';

export const Button = styled('button')`
  width: ${(props) => props.width ? props.width : '100%'};
  height: ${(props) => props.height ? props.height : '35px'};
  margin: ${(props) => props.margin ? props.margin : '0'};
  font-weight: 700;
  font-size: 13px;
  color: ${Constants.PRIMARY_BUTTON_TEXT_COLOR};
  background-color: ${(props) => props.primary ? Constants.PRIMARY_COLOR : '#697281'};
  border-radius: ${Constants.UNIVERSAL_BORDER_RADIUS};
  border: none;
  cursor: pointer;

  ${(props) => props.header && css`
    color: white;
    background-color: transparent;
    text-align: right;
    padding-right: 20px;
  `}

  ${(props) => props.border && css`
    border: solid 1px ${(props) => props.primary ? Constants.PRIMARY_BORDER_COLOR : Constants.SECONDARY_BORDER_COLOR};
  `}

  ${(props) => props.cancel && css`
    color: white;
  `}

  ${(props) => props.winners && css`
    color: white;
    background-color: ${Constants.PUBLISH_WINNERS_BUTTON_BACKGROUND_COLOR};
    border: solid 1px ${Constants.PUBLISH_WINNERS_BUTTON_BORDER_COLOR};
  `}
`;

export const LinkButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.width ? props.width : '100%'};
  height: ${(props) => props.height ? props.height : '35px'};
  margin: ${(props) => props.margin ? props.margin : '0'};
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
  color: black;
  background-color: ${(props) => props.primary ? Constants.PRIMARY_COLOR : '#697281'};
  border-radius: ${Constants.UNIVERSAL_BORDER_RADIUS};
  border: none;
  cursor: pointer;

  ${(props) => props.header && css`
    color: white;
    background-color: transparent;
    text-align: right;
    padding-right: 20px;
  `}

  ${(props) => props.border && css`
    border: solid 1px ${(props) => props.primary ? Constants.PRIMARY_BORDER_COLOR : Constants.SECONDARY_BORDER_COLOR};
  `}
`;