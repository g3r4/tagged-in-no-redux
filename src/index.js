import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';


ReactDOM.render(
  <BrowserRouter>
    <div>
        <Switch>
          <Route path="/" component ={App} />
        </Switch>
    </div>
  </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
