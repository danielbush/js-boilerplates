import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

// See boilerplate changelog.

const MainRoute = (props) => (
  <div>
    This is the the main route.<br />
    <Link to="/flow" >/flow</Link>
  </div>
);

const FlowRoute = (props) => (
  <div>
    This is the the flow route.<br />
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

export default App;
