// Orquesta Filarmónica de Bogotá - Trivia admin.
// header.js - Navigation bar

import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { SectionButton } from '../../utilities/button.js';
//Styled components
import styled, {ThemeProvider} from 'styled-components';
//Custom Constants
import * as Constants from '../../../constants.js';

import menuIcon from './img/menu-icon.svg';

const theme = Constants.HeaderTheme;

const HeaderContainer = styled('div')`
  height: ${props => props.theme.containerHeight};
  background-color: ${props => props.theme.backgroundColor};
  padding: 0 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 20%;
    height: 100%;
  
    &.title {
      color: white;
      height: auto;
      bottom: 15px;
      
      h3 {
        width: 100%;
        font-family: 'Bitter';
        font-weight: 800;
        font-size: 20px;
        margin: 0;
      }
      
      span {
        color: ${Constants.primaryColor}
        margin-top: 5px;
        font-size: 13px;
        letter-spacing: 1px;
        width: 100%;
      }
    }

    &.sections {
      flex-direction: row;
      align-items: center;
      flex-grow: 1;
    }
  }


`;
class Header extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showUserMenu: 'none',
      showMenu: 'none',
    }
  }

  logout = () => {

  };

  render() {
    if(this.state.signOut === true){
      return(
        <Redirect to='/'/>
      );
    };
    return (
      <ThemeProvider theme={theme}>
          <HeaderContainer>
            <div className='title'>
              <h3>Orquesta Fliarmónica de Bogotá</h3>
              <span>ADMINISTRADOR</span>
            </div>
            <div className='sections'>
              <SectionButton selected={false}>
                <span>Administrar Trivia:</span>
                <span>preguntas y ganadores</span>
              </SectionButton>
              <SectionButton selected={true}>
                <span>Administrar Contenido:</span>
                <span>audios y videos</span>
              </SectionButton>
            </div>
            <div>
            </div>
          </HeaderContainer>
      </ThemeProvider>
    );
  }
}

export default Header;