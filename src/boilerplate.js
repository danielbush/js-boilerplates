import 'babel-polyfill';

import render2 from './boilerplate.flow.jsx';
import render, { renderToString } from './boilerplate.jsx';

console.log(renderToString());
render();
render2();
