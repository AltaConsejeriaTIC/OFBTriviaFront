// Orquesta Filarmónica de Bogotá - Trivia admin.
// trivia.js - Trivia Home page

import React from 'react';
import { Link } from 'react-router-dom';
import styled, {ThemeProvider} from 'styled-components';
//Custom Constants
import * as Constants from '../../../constants.js';
import { Button } from '../../utilities/button.js';
import SectionTitle from '../../utilities/sectionTitle.js';

const theme = Constants.TRIVIA_THEME;

const TriviaContainer = styled('div')`
  min-height: ${props => props.theme.containerHeight};
  background-color: ${props => props.theme.backgroundColor};
  padding: 0 5%;

  .content {
    display: flex;
    flex-direction: row;
  }
`;

const NavColumn = styled('div')`
  display: flex;
  flex-direction: column;
  width: 25%;

  a {
    text-decoration: none;
    padding-left: 20px;
  }
`;

class Trivia extends React.Component {
  constructor(props){
    super(props);
    this.state = {
     
    };
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <TriviaContainer>
          <SectionTitle>
            <h1>Administrar preguntas y respuestas</h1>
            <div className='separator'/>
            <Button primary width='25%' height='40px'>Agregar una trivia nueva</Button>
          </SectionTitle>
          <div className='content'>
            <NavColumn>
              <h2>TRIVIA</h2>
                <Link to='/dashboard/trivia'>Administrar preguntas y ganadores</Link>
              <h2>TRIVIA</h2>
                <Link to='/dashboard/contenido'>Administrar audios</Link>
                <Link to='/dashboard/trivia'>Administrar videos</Link>
            </NavColumn>
          </div>
        </TriviaContainer>
      </ThemeProvider>
    )
  }
}

export default Trivia;