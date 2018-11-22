// Orquesta Filarmónica de Bogotá - Trivia admin.
// ironhackApp.js - Main router

import React from 'react';
import { Switch, Route, Redirect} from "react-router-dom";
//Styled components
import styled from 'styled-components';
// Custom Components
import Loader from './js/utilities/loader.js';
import Login from './js/components/login/login.js';
import Header from './js/components/header/header.js';

const LoaderContainer = styled('div')`
  width: 100vw;
  height: 100vh;
`;

//The main purpose of this class is to identify if there is a logged user and redirect him to the proper view.
class OFBTriviaApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: true,
      mustNavigate: false,
    };
  };

  componentDidMount(){
    this.isUserConected();
  };

  isUserConected = () => {
    
  };

  render() {
    if(this.state.mustNavigate){
      return(
        <Loader />
      );
    }else{
      return (
        <div className='App'>
          <Switch>
            <Route exact path='/' render={() => null}/>
            {!this.state.user && <Redirect to='/'/>}
            <Route render={(props) => (<Header {...props}/>)}/>
          </Switch>
          <Switch>
            <Route exact path='/' component={Login}/>
          </Switch>
        </div>
      );
    }
  };
}

export default OFBTriviaApp;