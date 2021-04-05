// Enable these if you're an app (not a lib).
// Enable regenerator-runtime only if you're targeting old browsers.
//import 'core-js';
//import 'regenerator-runtime';

import React from 'react';
import ReactDOM from 'react-dom';

function ReplaceMe() {
  return <div>hello world</div>;
}

ReactDOM.render(<ReplaceMe />, document.querySelector('#app'));
