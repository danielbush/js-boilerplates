import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import HelloWorld from './hello-js-func';

import './global.css';

ReactDOM.render(<HelloWorld name="world" />, document.querySelector('#app'));
console.log(
  ReactDOMServer.renderToString(
    React.createElement(HelloWorld, { name: 'world' }),
  ),
);
