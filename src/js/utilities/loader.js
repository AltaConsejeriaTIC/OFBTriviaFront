// Orquesta Filarmónica de Bogotá.
// loader.js - This is just a css loader. Can be used on any container.
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
//Styled components
import styled from 'styled-components';
import LoaderSprites from '../../assets/img/loader/footerImage.svg';

//Section container
const SectionContainer = styled('div')`
  width: 120px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #292B3C;
  opacity: 0.9;
  border-radius: 4px;

  .sprites {
    width: 100%;
    height: 100%;
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
      background-position: 125%; 
    }
  }
`;

function Loader(props){
  return(
    <SectionContainer width={props.width} height={props.height}>
      <div className='sprites'/>
    </SectionContainer>
    )
}

export default Loader;  