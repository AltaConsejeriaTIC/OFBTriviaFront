// Orquesta Filarmónica de Bogotá.
// infoCard.js
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
import { Redirect } from 'react-router-dom';
//Styled components
import styled from 'styled-components';
//Custom Constants
import * as Constants from '../../../constants.js';
import { Button } from '../../utilities/button.js';

const InfoCardContainer = styled('div')`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 110px;
  background-color: ${Constants.INFO_CARD_BACKGROUND_COLOR};
  border: solid 1px ${Constants.INFO_CARD_BORDER_COLOR};
  border-radius: ${Constants.UNIVERSAL_BORDER_RADIUS};
  margin-bottom: 5px;

  div {
    &.item {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      height: 100%;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: 14px;
      font-family: 'Bitter';
      font-weight: 700;
      color ${Constants.INFO_CARD_STRONG_TEXT_COLOR};
      padding: 0 50px 0 15px;

      h2 {
        font-size: 15px;
        margin-bottom: 5px;
      }

      a {
        text-decoration: none;
        font-weight: 600;
        font-family: 'Open Sans';
        color: #2CABE2;
      }
    }

    &.edit-button {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      min-width: 20%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 0 20px;
    }
  }
`;

class ContentCard extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      mustNavigate: false
    }
  }

  editItem = () => {
    const itemType = this.props.type;
    this.setState({
      itemType: itemType,
      mustNavigate: true
    })
  }

  render() {
    console.log(this.props)
    if (this.state.mustNavigate) {
      return (
        <Redirect to={{
          pathname: `/dashboard/contenido/${this.state.itemType}/edit/${this.props.id}`,
          state: {
            title: this.props.item.title,
            artist: this.props.item.artist,
            url: this.props.item.url,
            id: this.props.id,
            isEditing: true,
          }
        }}/>
      )
    }
    return(
      <InfoCardContainer>
        <div className='item'>
          <h2>{`${this.props.item.title}${this.props.item.artist ? ` - ${this.props.item.artist}` : ''}`}</h2>
          <a target='_blank' rel="noopener noreferrer" href={this.props.item.url}>{this.props.item.url}</a>
        </div>
        <div className='edit-button'>
          <Button onClick={this.editItem} primary={1} border={1}>{`Editar ${this.props.type}`}</Button>
        </div>
      </InfoCardContainer>
    )
  }
}

export default ContentCard;