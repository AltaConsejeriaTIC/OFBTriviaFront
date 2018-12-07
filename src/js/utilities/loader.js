// Orquesta Filarmónica de Bogotá.
// loader.js - This is just a css loader. Can be used on any container.
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
//Styled components
import styled from 'styled-components';
//Custom Constants
import LoaderSprites from '../../assets/img/loader/footerImage.svg';

//Section container
const SectionContainer = styled('div')`
  width: 100%;
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #292B3C;
  opacity: 0.9;

  .sprites {
    width: 200px;
    height: 165px;
    background: url(${LoaderSprites});
    animation: 4s infinite run;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
    z-index: 3;
  }

  h1 {
    color: white;
    margin-left: 20px;
    font-family: Bitter;
    font-weight: 500;
    z-index: 3;
  }

  @keyframes run {
    0% {
      background-position: 0%;
    }

    100% {
      background-position: 152%; 
    }
  }
`;

class Loader extends React.Component {

  render() {
    return(
      <SectionContainer>
        <div className='sprites'/>
        <h1>Orquesta<br/>Filarmónica<br/>de Bogotá</h1>
      </SectionContainer>
    )
  }
}

export default Loader;  