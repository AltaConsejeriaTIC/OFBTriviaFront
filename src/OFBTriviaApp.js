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
import NewTrivia from './js/components/trivia/new/new.js';
import TriviaDetails from './js/components/trivia/details/details.js';
import ContenidoAudio from './js/components/contenido/audio.js';
import NewAudio from './js/components/contenido/newAudio/newAudio.js';
import ContenidoVideo from './js/components/contenido/video.js';
import NewVideo from './js/components/contenido/newVideo/newVideo.js';

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
            <Route exact path='/dashboard/trivia/new' render={(props) => (<NewTrivia {...props}/>)}/>
            <Route exact path='/dashboard/trivia/edit' render={(props) => (<NewTrivia {...props}/>)}/>
            <Route exact path='/dashboard/trivia/:triviaId' render={(props) => (<TriviaDetails {...props}/>)}/>            
            <Route exact path='/dashboard/contenido/audio' render={(props) => (<ContenidoAudio {...props}/>)}/>
            <Route exact path='/dashboard/contenido/audio/new' render={(props) => (<NewAudio {...props}/>)}/>
            <Route exact path='/dashboard/contenido/video' render={(props) => (<ContenidoVideo {...props}/>)}/>
            <Route exact path='/dashboard/contenido/video/new' render={(props) => (<NewVideo {...props}/>)}/>

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