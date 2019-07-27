import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

// Views
import App from './App';
import Header from './views/layout/Header';
import List from './views/lists/List';
import Error from './views/errors/Error';

ReactDOM.render(
  <Router>
    <Header />
    <App>
      <Route exact path="/" component={List} />
      <Route exact path="/error" component={Error} />
    </App>
  </Router>,

  document.getElementById('root')
);

serviceWorker.unregister();
