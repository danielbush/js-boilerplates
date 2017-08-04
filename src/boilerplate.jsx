import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import classes from 'classnames';

import style from './styles/hello.css';

const grey = style.grey;

class HelloWorld extends React.Component {

  shouldComponentUpdate () {
    return true;
  }

  render () {
    return (
      <div>
        <h1 className={style.hello} >green hello {this.props.name}</h1>
        <div className={style.flex} >
          flex <a className={style.flex_foo} >box</a>
          <span className={style.bar}>bar</span>
        </div>
        <div className={classes(style.flex, style.baz)}>baz</div>
      </div>
    );
  }

}

HelloWorld.propTypes = {
  name: PropTypes.string.isRequired
};

export default () => {
  ReactDOM.render(<HelloWorld name="world" />, document.querySelector('#hello-world'));
};

export const renderToString = () => {
  const element = React.createElement(HelloWorld, { name: 'world' });
  return ReactDOMServer.renderToString(element);
};
