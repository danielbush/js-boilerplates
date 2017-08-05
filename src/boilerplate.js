import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HelloWorld from './boilerplate.jsx';
import HelloFlow from './boilerplate.flow.jsx';

const App = (props) => (
  <div>
    <HelloWorld name="world" />
    <HelloFlow name="flow" />
  </div>
);

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.querySelector('#hello-world')
);
