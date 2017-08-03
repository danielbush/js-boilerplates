export class HelloWorld {
  constructor () {}
  hello () { console.log('hello world'); }
}

const hello = new HelloWorld();
hello.hello();

export function* hellogen () {
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
