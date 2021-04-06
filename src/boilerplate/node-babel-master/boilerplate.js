// Testing
// - class properties (useful for react or avoiding bind on methods)
// - async - whether our babel-env triggers generator transform or not
// - object spread - which is now a standard
// - etc

export { tsvar } from './boilerplatets';
export class HelloWorld {
  constructor() {}
  hello() {
    console.log('hello world', { ...undefined });
  }
  helloClassProperty = () => {
    console.log('hello class property');
  };
}


export function* hellogen() {
  yield 'hello world gen';
}


export const helloPromise = async () => {
  console.log(await Promise.resolve('hello promise'));
};

export default 'hello world';
