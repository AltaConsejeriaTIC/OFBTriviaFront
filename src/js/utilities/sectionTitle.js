// Orquesta Filarmónica de Bogotá - Trivia admin.
// sectionTitle.js
//Styled components
import styled from 'styled-components';
//Custom Constants
import * as Constants from '../../constants.js';

const SectionTitle = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 75%;
  height: 60px;
  padding-top: 15px;
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

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    border: 1px solid ${Constants.PRIMARY_BORDER_COLOR};
    border-radius: ${Constants.UNIVERSAL_BORDER_RADIUS}
    background-color: ${Constants.PRIMARY_COLOR};
    color: black;
    font-size: 13px;
    font-weight: 700;
    width: 25%;
    height: 30px;
  }
`;

export default SectionTitle;