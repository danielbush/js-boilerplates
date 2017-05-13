
class HelloWorld {
  constructor () {}
  hello () { console.log('hello world'); }
};

const hello = new HelloWorld();
hello.hello();

function* hellogen () {
  yield 'hello world gen';
}

for (const msg of hellogen()) {
  console.log(msg);
}

const helloPromise = async () => {
  console.log(await Promise.resolve('hello promise'));
};
helloPromise();

module.exports = HelloWorld;
