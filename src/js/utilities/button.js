// Orquesta Filarmónica de Bogotá - Trivia admin.
// buttons.js
//Styled components
import styled, { css } from 'styled-components';
//Custom Constants
import * as Constants from '../../constants.js';

export const Button = styled('button')`
  width: ${(props) => props.width ? props.width : '100%'};
  height: ${(props) => props.height ? props.height : '35px'};
  margin: ${(props) => props.margin ? props.margin : '0'};
  font-weight: 600;
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