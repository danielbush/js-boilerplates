import React from 'react';
import ReactDOM from 'react-dom';
import hello from './styles/hello.css';

class HelloWorld extends React.Component {
  render () {
    return <h1 className="hello" >green hello world</h1>;
  }
}


ReactDOM.render(<HelloWorld/>, document.querySelector('#app'));

