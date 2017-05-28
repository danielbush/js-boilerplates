// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';

class Person { name: string }
class Employee extends Person { department: string }

const employee: { prop: Employee } = { prop: new Employee };
const person: { +prop: Person } = employee; // covariant

type helloFlow = {
  greeting: string,
  name: number
};

const asyncFoo = async () => {
  return await Promise.resolve('bar');
};
(async () => console.log(await asyncFoo()))();

// eslint-disable-next-line react/prefer-stateless-function
class HelloFlow extends React.Component {
  shouldComponentUpdate () {
    return true;
  }
  props: helloFlow
  render () {
    return <div>{this.props.greeting} {this.props.name}</div>;
  }
}

export const render = () => {
  ReactDOM.render(
    <HelloFlow
      greeting="hello"
      name={123}
    />,
    document.querySelector('#hello-flow')
  );
};

export const renderToString = () => {
  const element = React.createElement(HelloFlow, { greeting: 'hello', name: 123 });
  return ReactDOMServer.renderToString(element);
};
