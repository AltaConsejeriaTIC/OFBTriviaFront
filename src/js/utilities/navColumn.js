// Orquesta Filarmónica de Bogotá - Trivia admin.
// navColumn.js
import React from 'react';
//Styled components
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
//Custom Constants
import * as Constants from '../../constants.js';

const NavColumnContainer = styled('div')`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 25%;
  padding-right: 15px;

  h2 {
    margin-top: 0;
    font-size: 16px;
    color: ${Constants.NAV_COLUMN_TEXT_COLOR};
  }
`;

const Leyend = styled('div')`
  display: ${(props) => props.display === 1 ? 'block' : 'none'}
  position: absolute;
  bottom: 25px;
  padding-right: 25px;

  h5 {
    color: #7C7F92;
    margin-bottom: 10px;
  }

  p {
    font-size: 13px;
    color: ${Constants.NAV_COLUMN_TEXT_COLOR};
  
    span {
      font-weight: 700;
      color: ${Constants.SELECTED_INFOCARD_BORDER_COLOR}; 
    }
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
          to='/admin/trivia'
          selected={this.props.currentSection === 'trivia' ? 1 : 0}>
          Administrar preguntas<b/>y ganadores</NavLink>
        <h2>CONTENIDO MULTIMEDIA</h2>
        <NavLink 
          to='/admin/contenido/audio'
          selected={this.props.currentSection === 'audio' ? 1 : 0}
          single={1}>
          Administrar audios
        </NavLink>
        <NavLink
          to='/admin/contenido/video'
          selected={this.props.currentSection === 'video' ? 1 : 0}
          single={1}>
          Administrar videos
        </NavLink>
        <h2>BOLETÍN DE NOTICIAS</h2>
        <NavLink
          to='/admin/newsletter'
          selected={this.props.currentSection === 'newsletter' ? 1 : 0}
          single={1}>
          Usuarios registrados
        </NavLink>
        <Leyend display={this.props.currentSection === 'trivia' ? 1 : 0}>
          <h5>NOTA</h5>
          <p>
            La pregunta resaltada con color <span>rosado</span> es la que se muestra actualmente en la aplicación. 
          </p>
        </Leyend>
      </NavColumnContainer>
    )
  }
}

export default NavColumn;

