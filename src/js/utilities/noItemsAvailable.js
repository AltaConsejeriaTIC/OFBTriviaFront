// Orquesta Filarmónica de Bogotá
// noItemsAvailable.js

import React from 'react';
//Styled components
import styled from 'styled-components';
//Custom Constants
import * as Constants from '../../constants.js';

const ErrorMessageContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;

  h2 {
    font-family: Bitter;
    color: ${Constants.NO_ITEMS_AVAILABLE_TEXT_COLOR};
    margin-bottom: 0;
  }

  p {
    text-align: center;
    font-family: Bitter;
    color: ${Constants.NO_ITEMS_AVAILABLE_TEXT_COLOR};
  }
`;

const ERROR_HEADERS = {
  trivia: 'Todavía no hay preguntas publicadas',
  details: 'Todavía no hay respuestas de usuarios',
  videos: 'Todavía no hay videos publicados',
  audios: 'Todavía no hay audios publicados',
  newsLetter: 'No hay usuarios suscritos al boletín de noticias',
}

const ERROR_PARAGRAPH = {
  triviaA: `Puedes añadir una nueva trivia haciéndo click en el botón`,
  triviaB: `"Agregar una trivia nueva"`,
  details: ``,
  videosA: `Puedes añadir un nuevo video haciéndo click en el botón`,
  videosB: `"Agregar un video nuevo"`,
  audiosA: `Puedes añadir un nuevo audio haciéndo click en el botón`,
  audiosB: `"Agregar un audio nuevo"`,
  newsLetterA: 'Cuando un usuario marque el campo "deseo recibir notificaciones por correo"',
  newsLetterB: 'su email aparecerá en esta sección.',
}

function NoItemsAvailable(props){
  return(
    <ErrorMessageContainer className='no-items-available'>
      <h2>{ERROR_HEADERS[props.section]}</h2>
      <p>{ERROR_PARAGRAPH[props.section + 'A']}<br/>{ERROR_PARAGRAPH[props.section + 'B']}</p>
    </ErrorMessageContainer>
  );
}


export default NoItemsAvailable;