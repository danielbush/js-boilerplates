import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import HelloWorld from './boilerplate.jsx';
import HelloFlow from './boilerplate.flow.jsx';

// webpack-dev-server will server up /boilerlate.html
// - which loads react router
// - which lets react router handle other routes eg /flow

const MainRoute = (props) => (
  <div>
    <HelloWorld name="default route" />
    <Link to="/flow" >/flow</Link>
  </div>
);

const FlowRoute = (props) => (
  <div>
    <HelloFlow name="default flow route" />
    <Link to="/" >/root</Link>
  </div>
);

const App = (props) => (
  <Switch>
    <Route exact path="/" component={MainRoute} />
    <Route exact path="/boilerplate.html" component={MainRoute} />
    <Route path="/flow" component={FlowRoute} />
  </Switch>
);

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.querySelector('#hello-world')
);
