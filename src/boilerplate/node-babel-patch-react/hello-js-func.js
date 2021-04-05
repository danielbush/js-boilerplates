import React from 'react';
import PropTypes from 'prop-types';

import style from './styles.module.css';
import HelloTypescript from './hello-ts-class.tsx';
import HelloWorldTs from './hello-ts-func.tsx';

function HelloWorld({ name }) {
  return (
    <div className="some-global-class">
      <p className={style.green}>hello {name} (green text)</p>
      <p className={style.red}>red text</p>
      <HelloTypescript name="ts-class" />
      <HelloWorldTs name="ts-func" />
    </div>
  );
}

HelloWorld.propTypes = {
  name: PropTypes.string.isRequired,
};

export default HelloWorld;
