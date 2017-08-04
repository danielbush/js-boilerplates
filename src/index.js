import 'babel-polyfill';
import { render, renderToString } from './HelloFlow.jsx';
import hello from './HelloWorld.jsx';
import { HelloWorld } from './boilerplate';

console.log(renderToString());
render();
