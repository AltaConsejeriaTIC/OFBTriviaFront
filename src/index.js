// DO NOT MODIFY THE CONTENT NOR THE NAME OF THIS FILE.
// ORQUESTA FILARMÓNICA DE BOGOTA - TRIVIA ADMIN CLIENT
// index.js - Main entry point

import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import OFBTriviaApp from './OFBTriviaApp.js';

import { BrowserRouter } from 'react-router-dom' // Router

//Main CSS
import './main.css';

ReactDOM.render((
  <BrowserRouter>
    <OFBTriviaApp/>
  </BrowserRouter>
), document.getElementById('root'));

registerServiceWorker();

// DO NOT MODIFY THE CONTENT NOR THE NAME OF THIS FILE.