// Orquesta Filarmónica de Bogotá - Trivia admin.
// buttons.js
//Styled components
import styled, { css }from 'styled-components';
//Custom Constants
import * as Constants from '../../constants.js';

export const Button = styled('button')`
  width: ${(props) => props.width ? props.width : '100%'};
  height: ${(props) => props.height ? props.height : '30px'};
  margin: ${(props) => props.margin ? props.margin : '0'};
  font-weight: ${(props) => props.primary ? 700 : 500};
  background-color: ${(props) => props.primary ? Constants.primaryColor : 'lightgray'};
  border-radius: ${Constants.universalBorderRadius};
  border: none;
`;

export const SectionButton = styled('button')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: auto;
  height: 80%;
  background-color: transparent;
  border: none;
  color: ${(props) => props.selected ? 'red' : '#8D91AD'};

  ${(props) => {props.selected && css`
    color: orange;
  `}};
`;