import React from 'react';
import PropTypes from 'prop-types';

// Importing styles in typescript requires a declaration for *.css modules.
import style from './styles.module.css';

function HelloWorldTs({ name }: { name: string }) {
  return (
    <div className="some-global-class">
      <p className={style.green}>
        hello {name} (green text) from ts func component
      </p>
    </div>
  );
}

HelloWorldTs.propTypes = {
  name: PropTypes.string.isRequired,
};

export default HelloWorldTs;
