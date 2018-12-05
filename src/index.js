// DO NOT MODIFY THE CONTENT NOR THE NAME OF THIS FILE.
// ORQUESTA FILARMÓNICA DE BOGOTA - TRIVIA ADMIN CLIENT
// index.js - Main entry point

import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';
import serviceWorker from './serviceWorker';

import OFBTriviaApp from './OFBTriviaApp.js';

import { BrowserRouter } from 'react-router-dom' // Router

//Main CSS
import './main.scss';

ReactDOM.render((
  <CookiesProvider>
  	<BrowserRouter>
    	<OFBTriviaApp/>
  	</BrowserRouter>
  </CookiesProvider>
), document.getElementById('root'));

serviceWorker();

// DO NOT MODIFY THE CONTENT NOR THE NAME OF THIS FILE.