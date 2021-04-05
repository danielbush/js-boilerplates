import React from 'react';
import { css } from '@emotion/react';
import PropTypes from 'prop-types';

import * as styles from './styles';
import HelloTypescript from './hello-ts-class.tsx';
import HelloTs from './hello-ts-func.tsx';

function HelloWorld({ name }) {
  return (
    <div>
      <p css={styles.green}>hello {name} (green text)</p>
      <p css={styles.red}>red text</p>
      <p
        css={css`
          font-weight: bold;
        `}
      >
        bold text using css prop
      </p>
      <HelloTypescript name="ts-class-hello" />
      <HelloTs name="ts-func-hello" />
    </div>
  );
}

HelloWorld.propTypes = {
  name: PropTypes.string.isRequired,
};

export default HelloWorld;
