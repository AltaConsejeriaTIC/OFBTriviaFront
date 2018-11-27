// Orquesta Filarmónica de Bogotá.
// pageController.js
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
import { Link } from 'react-router-dom';
//Styled components
import styled, { css } from 'styled-components';
//Custom Constants
import * as Constants from '../../constants.js';

const PageControllerContainer = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 40px;
  background-color: ${Constants.PAGE_CONTROLLER_BACKGROUND_COLOR};
  border: solid 1px ${Constants.PAGE_CONTROLLER_BORDER_COLOR};
  border-radius: ${Constants.UNIVERSAL_BORDER_RADIUS};
  margin-bottom: 10px;
  padding: 0 10px;

  .vertical-separator {
    height: 29px;
    width: 1px;
    background-color: ${Constants.PAGE_CONTROLLER_TEXT_COLOR}; 
  }
`;

const PageButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 29px;
  text-decoration: none;
  font-size: 13px;
  background-color: transparent;
  color: ${Constants.PAGE_CONTROLLER_TEXT_COLOR};
  border-radius: ${Constants.UNIVERSAL_BORDER_RADIUS};
  margin: 0 5px;

  ${(props) => props.previus && css`
    width: auto;
    margin-right: 15px;
  `}

  ${(props) => props.next && css`
    width: auto;
    margin-left: 15px;
  `}

  ${(props) => props.selected && css`
    color: ${Constants.PAGE_CONTROLLER_STRONG_TEXT_COLOR};
    font-weight: 700;
    background-color: ${Constants.PRIMARY_COLOR};
  `}

`;

class PageController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: props.currentPage,
      totalItems: props.items,
    }
  }

  handleClick = (event) => {

  }


  render() {
    console.log(this.state)
    return(
      <PageControllerContainer>
        {this.state.currentPage !== 1 && <PageButton to='#' previus={1} onClick={this.handleClick}>Anterior</PageButton>}
        {this.state.currentPage !== 1 && <div className='vertical-separator'/>}
        <PageButton to='#' onClick={this.handleClick}>1</PageButton>
        <PageButton to='#' selected={1} onClick={this.handleClick}>2</PageButton>
        <PageButton to='#' onClick={this.handleClick}>3</PageButton>
        <PageButton to='#' onClick={this.handleClick}>4</PageButton>
        {this.state.currentPage * 4 <= this.state.totalItems && <div className='vertical-separator'/>}
        {this.state.currentPage * 4 <= this.state.totalItems && <PageButton to='#' next={1} onClick={this.handleClick}>Siguiente</PageButton>}
      </PageControllerContainer>
    )
  }
}

export default PageController;