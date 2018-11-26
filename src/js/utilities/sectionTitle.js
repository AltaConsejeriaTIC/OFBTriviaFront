// Orquesta Filarmónica de Bogotá - Trivia admin.
// sectionTitle.js
//Styled components
import styled, { css } from 'styled-components';
//Custom Constants
import * as Constants from '../../constants.js';

const SectionTitle = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 75%;
  height: 60px;
  margin-left: 25%;

  h1 {
    color: ${Constants.STRONG_TEXT_COLOR};
    font-size: 20px;
  }

  .separator {
    margin: 0 15px;
    flex-grow: 1;
    height: 2px;
    background-color: #CCCCCC;
  }
`;

export default SectionTitle;