// Orquesta Filarmónica de Bogotá - Trivia admin.
// buttons.js
import { Link } from "react-router-dom";
//Styled components
import styled, { css } from 'styled-components';
//Custom Constants
import * as Constants from '../../constants.js';

export const Button = styled('button')`
  width: ${(props) => props.width ? props.width : '100%'};
  height: ${(props) => props.height ? props.height : '35px'};
  margin: ${(props) => props.margin ? props.margin : '0'};
  font-weight: ${(props) => props.primary ? 700 : 500};
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

export const SectionButton = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: auto;
  height: 80%;
  background-color: transparent;
  border: none;
  color:${Constants.UNDEREMPHASIZE_FOOTER_HEADER_TEXT_COLOR};
  text-decoration: none;

  ${(props) => props.selected && css`
    span {
      &:first-child {
        font-weight: 700;
        font-size: 15px;
        color: ${Constants.PRIMARY_COLOR};
      }

      &:last-child {
        color: white;
      }
    }

    &:after {
      position: absolute;
      content: '';
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 5px solid white;
      bottom: 0px;
    }
  `};
`;