// Orquesta Filarmónica de Bogotá - Trivia admin.
// header.js - Navigation bar

import React from 'react';
import { Link } from 'react-router-dom';
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

  .title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 20%;
    text-decoration: none;
    color: white;
    height: 100%;
    bottom: 15px;
    
    h3 {
      width: 100%;
      font-family: 'Bitter';
      font-weight: 800;
      font-size: 20px;
      margin: 0;
    }
    
    span {
      color: ${Constants.PRIMARY_COLOR};
      font-size: 13px;
      letter-spacing: 1px;
      width: 100%;
    }
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 20%;
    height: 100%;

    &.sections {
      position: relative;
      flex-direction: row;
      align-items: center;
      flex-grow: 1;

      a:first-child {
        margin-right: 30px;
      }
    }

    button {
      position: block;
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
    this.props.onLogout();
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
          <HeaderContainer>
            <Link className='title' to='/admin/trivia'>
              <h3>Orquesta Fliarmónica de Bogotá</h3>
              <span>ADMINISTRADOR</span>
            </Link>
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