// Testing
// - class properties (useful for react or avoiding bind on methods)
// - async - whether our babel-env triggers generator transform or not
// - object spread - which is now a standard
// - etc

export class HelloWorld {
  constructor() {}
  hello() {
    console.log('hello world', { ...undefined });
  }
  helloClassProperty = () => {
    console.log('hello class property');
  };
}

const hello = new HelloWorld();
hello.hello();
hello.helloClassProperty();

export function* hellogen() {
  yield 'hello world gen';
}

for (const msg of hellogen()) {
  console.log(msg);
}

export const helloPromise = async () => {
  console.log(await Promise.resolve('hello promise'));
};
helloPromise();

export default 'hello world';
