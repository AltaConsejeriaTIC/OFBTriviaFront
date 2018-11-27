// Orquesta Filarmónica de Bogotá - Trivia admin.
// navColumn.js
import React from 'react';
//Styled components
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
//Custom Constants
import * as Constants from '../../constants.js';

const NavColumnContainer = styled('div')`
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 25%;
  padding-right: 15px;

  h2 {
    margin-top: 0;
    font-size: 16px;
    color: ${Constants.NAV_COLUMN_TEXT_COLOR};
  }
`;

const NavLink = styled(Link)`
  width: 80%;
  height: ${(props) => props.single ? '40px' : '80px'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  text-decoration: none;
  font-size: 16px;
  color: ${Constants.NAV_COLUMN_WEAK_TEXT_COLOR};
  padding-left: 20px;
  margin-bottom: ${(props) => props.single ? '5px' : '15px'};;


  ${(props) => props.selected && css`
    border: solid 1px ${Constants.NAV_SELECTED_SECTION_BORDER_COLOR};
    border-left: solid 3px ${Constants.NAV_SELECTED_SECTION_LEFT_BORDER_COLOR};
    border-radius: 0 ${Constants.UNIVERSAL_BORDER_RADIUS} ${Constants.UNIVERSAL_BORDER_RADIUS} 0;
    background-color: ${Constants.NAV_SELECTED_SECTION_BACKGROUND_COLOR};
  `}
`;

class NavColumn extends React.Component {

  render() {
    return(
      <NavColumnContainer>
        <h2>TRIVIA</h2>
        <NavLink 
          to='/dashboard/trivia'
          selected={this.props.currentSection === 'trivia' ? 1 : 0}>
          Administrar preguntas<b/>y ganadores</NavLink>
        <h2>CONTENIDO MULTIMEDIA</h2>
        <NavLink 
          to='/dashboard/contenido/audio'
          selected={this.props.currentSection === 'audio' ? 1 : 0}
          single={1}>
          Administrar audios
        </NavLink>
        <NavLink
          to='/dashboard/contenido/video'
          selected={this.props.currentSection === 'video' ? 1 : 0}
          single={1}>
          Administrar videos
        </NavLink>
      </NavColumnContainer>
    )
  }
}

export default NavColumn;

