// Orquesta Filarmónica de Bogotá - Trivia admin.
// header.js - Navigation bar

import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from '../../utilities/button.js';
//Styled components
import styled, {ThemeProvider} from 'styled-components';
//Custom Constants
import * as Constants from '../../../constants.js';

const theme = Constants.HEADER_THEME;

const HeaderContainer = styled('div')`
  height: ${props => props.theme.containerHeight};
  background-color: ${props => props.theme.backgroundColor};
  padding: 0 5%;
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
        color: ${Constants.PRIMARY_COLOR}
        margin-top: 5px;
        font-size: 13px;
        letter-spacing: 1px;
        width: 100%;
      }
    }

    &.sections {
      position: relative;
      flex-direction: row;
      align-items: center;
      flex-grow: 1;

      a:first-child {
        margin-right: 30px;
      }
    }
  }


`;
class Header extends React.Component {
  constructor(props){
    super(props);
    const currentSection = props.location.pathname.split('/')[2];
    this.state = {
      showUserMenu: 'none',
      showMenu: 'none',
      currentSection: currentSection,
    }
  }

  logout = () => {
    this.props.onLogout();
  };

  onChangeSectionHandler = (section) => {
    this.setState({currentSection: section})
  }

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
            </div>
            <div>
              <Button header onClick={this.logout}>Cerrar sesión</Button>
            </div>
          </HeaderContainer>
      </ThemeProvider>
    );
  }
}

export default Header;