import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { Router, Route, Switch } from 'react-router'

import HelloWorld from './boilerplate.jsx';
import HelloFlow from './boilerplate.flow.jsx';

ReactDOM.render(<HelloWorld name="world" />, document.querySelector('#hello-world'));
ReactDOM.render(<HelloWorld name="flow" />, document.querySelector('#hello-flow'));
console.log(ReactDOMServer.renderToString(React.createElement(HelloWorld, { name: 'world' })));
