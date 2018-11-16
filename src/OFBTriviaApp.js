// IronHacks Platform
// ironhackApp.js - Main router
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
import { Switch, Route, Redirect} from "react-router-dom";
//Styled components
import styled from 'styled-components';
// Custom Components
//import Loader from './js/utilities/loader.js';
import Loader from './js/utilities/loader.js';

const LoaderContainer = styled('div')`
  width: 100vw;
  height: 100vh;
`;

//The main purpose of this class is to identify if there is a logged user and redirect him to the proper view.
class OFBTriviaApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      mustNavigate: false,
    };
  };

  componentDidMount(){
    this.isUserConected();
  };

  isUserConected = () => {
    
  };

  render() {
    if(!this.state.mustNavigate){
      return(
        <h1>Inserte aquí un loader :V</h1>
      );
    }else{
      return (
        <CookiesProvider>
          <div className='App'>
            <Switch>
              <Route path='/login' component={Login}/>
            </Switch>
          </div>
        </CookiesProvider>
      );
    }
  };
}

export default OFBTriviaApp;