import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';

import HelloWorld from './boilerplate';

ReactDOM.render(<HelloWorld name="world" />, document.querySelector('#hello-world'));
ReactDOM.render(<HelloWorld name="flow" />, document.querySelector('#hello-flow'));
console.log(ReactDOMServer.renderToString(React.createElement(HelloWorld, { name: 'world' })));
