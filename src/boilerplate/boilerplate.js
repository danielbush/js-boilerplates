import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

// webpack-dev-server will server up /boilerlate.html
// - which loads react router
// - which lets react router handle other routes eg /flow

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
