// Orquesta Filarmónica de Bogotá - Trivia admin.
// footer.js

import React from 'react';
//Styled components
import styled, {ThemeProvider} from 'styled-components';
//Custom Constants
import * as Constants from '../../../constants.js';

const theme = Constants.FOOTER_THEME;

const HeaderContainer = styled('div')`
  height: ${props => props.theme.containerHeight};
  background-color: ${props => props.theme.backgroundColor};
  color:  ${props => props.theme.textColor};
  padding: 0 5%;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    width: 100%;
    height: 100%;
  
    &.title {
      height: 100%;
      bottom: 15px;
      
      h3 {
        width: 100%;
        font-family: 'Bitter';
        font-weight: 800;
        font-size: 18px;
        margin: 0;
      }
      
      span {
        font-size: 11px;
        letter-spacing: 1px;
        width: 100%;
      }

      p {
        color: ${Constants.UNDEREMPHASIZE_FOOTER_HEADER_TEXT_COLOR};
        font-size: 11px
        margin-bottom: 0;
;      }
    }
  }


`;
class Footer extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
          <HeaderContainer>
            <div className='title'>
              <h3>Orquesta Fliarmónica de Bogotá</h3>
              <span>ADMINISTRADOR</span>
              <p>{'\xA9 Derechos reservados Orquesta Filarmónica de Bogotá'}</p>
            </div>
          </HeaderContainer>
      </ThemeProvider>
    );
  }
}

export default Footer;