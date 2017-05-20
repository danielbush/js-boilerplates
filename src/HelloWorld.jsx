import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

import style from './styles/hello.css';

const grey = style.grey;

class HelloWorld extends React.Component {
  shouldComponentUpdate () {
    return true;
  }
  render () {
    return (
      <div>
        <h1 className={style.hello} >green hello world</h1>
        <div className={style.flex} >
          flex <a className={style.flex_foo} >box</a>
          <span className={style.bar}>bar</span>
        </div>
        <div className={classnames(style.flex, style.baz)}>baz</div>
      </div>
    );
  }
}


ReactDOM.render(<HelloWorld/>, document.querySelector('#app'));

