// Enable these if you're an app (not a lib).
// Enable regenerator-runtime only if you're targeting old browsers.
//import 'core-js';
//import 'regenerator-runtime';

import { tsvar, HelloWorld, hellogen, helloPromise } from './boilerplate';

console.log('ts var:', tsvar);

for (const msg of hellogen()) {
  console.log(msg);
}

helloPromise();

const hello = new HelloWorld();
hello.hello();
hello.helloClassProperty();