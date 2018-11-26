// Orquesta Filarmónica de Bogotá - Trivia admin.
// ironhackApp.js - Main router

import React from 'react';
import { Switch, Route, Redirect} from "react-router-dom";
//Styled components
//import styled from 'styled-components';
// Custom Components
import Loader from './js/utilities/loader.js';
import Header from './js/components/header/header.js';
import Footer from './js/components/footer/footer.js';
import Login from './js/components/login/login.js';
import Trivia from './js/components/trivia/trivia.js';

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

  onLogin = () => {
    this.setState({user: true})
  }

  onLogout = () => {
    this.setState({user: false})
  }

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
            <Route render={(props) => (<Header onLogout={this.onLogout} {...props}/>)}/>
          </Switch>
          <Switch>
            <Route exact path='/' render={(props) => (<Login onLogin={this.onLogin} {...props}/>)}/>
            <Route exact path='/dashboard/trivia' render={(props) => (<Trivia {...props}/>)}/>
            
          </Switch>
          <Switch>
            <Route exact path='/' render={() => null}/>
            <Route component={Footer}/>
          </Switch>
        </div>
      );
    }
  };
}

export default OFBTriviaApp;