import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin'
import App from './App';
import './index.css';

let messages = { name: " Adminsuite UI App", greeting: " Hello User!", modalState: true};
injectTapEventPlugin();
ReactDOM.render(
  <App {...messages}/>,
  document.getElementById('root')
);
