// Orquesta Filarmónica de Bogotá - Trivia admin.
// ironhackApp.js - Main router

import React from 'react';
import { Switch, Route, Redirect} from "react-router-dom";
import { withCookies } from 'react-cookie';
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
import NewsLetterList from './js/components/newsLetterList/newsLetterList.js';


//The main purpose of this class is to identify if there is a logged user and redirect him to the proper view.
class OFBTriviaApp extends React.Component {
  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      user: cookies.get('user') || null,
      mustNavigate: false,
    };
  };

  componentDidMount(){
  };

  onLogin = () => {
    const { cookies } = this.props;
    cookies.set('user', true, {expires: new Date(new Date().getTime()+(60*60*1000))})
    this.setState({user: true})
  };

  onLogout = () => {
    const { cookies } = this.props;
    cookies.remove('user');
    this.setState({user: false})
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
            <Route render={(props) => (<Header onLogout={this.onLogout} {...props}/>)}/>
          </Switch>
          <Switch>
            <Route exact path='/' render={(props) => (<Login onLogin={this.onLogin} {...props}/>)}/>
            <Route exact path='/admin/trivia' render={(props) => (<Trivia {...props}/>)}/>
            <Route exact path='/admin/trivia/new' render={(props) => (<NewTrivia {...props}/>)}/>
            <Route exact path='/admin/trivia/edit' render={(props) => (<NewTrivia {...props}/>)}/>
            <Route exact path='/admin/trivia/:triviaId' render={(props) => (<TriviaDetails {...props}/>)}/>            
            <Route exact path='/admin/contenido/audio' render={(props) => (<ContenidoAudio {...props}/>)}/>
            <Route exact path='/admin/contenido/audio/new' render={(props) => (<NewAudio {...props}/>)}/>
            <Route exact path='/admin/contenido/audio/edit/:audioId' render={(props) => (<NewAudio {...props}/>)}/>
            <Route exact path='/admin/contenido/video' render={(props) => (<ContenidoVideo {...props}/>)}/>
            <Route exact path='/admin/contenido/video/new' render={(props) => (<NewVideo {...props}/>)}/>
            <Route exact path='/admin/contenido/video/edit/:videoId' render={(props) => (<NewVideo {...props}/>)}/>
            <Route exact path='/admin/newsletter' render={(props) => (<NewsLetterList {...props}/>)}/>
            {this.state.user && <Redirect push to='/admin/trivia'/>}
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

export default withCookies(OFBTriviaApp);