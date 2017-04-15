import React from 'react';
import ReactDOM from 'react-dom';
import hello from './styles/hello.css';

class HelloWorld extends React.Component {
  render () {
    return <div>
      <h1 className={hello.hello} >green hello world</h1>
      <div className={hello.flex} >flex <a className={hello.flex_foo} >box</a></div>
    </div>;
  }
}


ReactDOM.render(<HelloWorld/>, document.querySelector('#app'));

