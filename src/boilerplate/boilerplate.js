import 'babel-polyfill';
import React from 'react';
import PropTypes from 'prop-types';
import classes from 'classnames';

import style from '../styles/boilerplate.css';
import HelloFlow from './boilerplate.flow.jsx';

const grey = style.grey;
console.log('imported css colour var', grey);

class HelloWorld extends React.Component {

  shouldComponentUpdate () {
    return true;
  }

  render () {
    return (
      <div>
        <h1 className={style.hello} >hello {this.props.name} (green)</h1>
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

export default HelloWorld;
