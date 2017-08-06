// @flow
import React from 'react';
import ReactDOM from 'react-dom';

class HelloFlow extends React.Component {

  static defaultProps = {
    greeting: 'Hello'
  }

  props: {
    greeting?: string,
    name: number
  }

  shouldComponentUpdate () {
    return true;
  }

  render () {
    return <div>{this.props.greeting} {this.props.name}</div>;
  }

}

export default HelloFlow;
