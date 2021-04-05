import React from 'react';
import { css } from '@emotion/react';
import PropTypes from 'prop-types';

import * as tsstyles from './ts-styles';
import HelloTypescript from './hello-ts-class';

function HelloWorld({ name }: { name: string }) {
  return (
    <div>
      <p css={tsstyles.purple}>hello {name} (purple text)</p>
      <p
        css={css`
          font-weight: bold;
        `}
      >
        bold text using css prop
      </p>
      <HelloTypescript name="typescript within js" />
    </div>
  );
}

HelloWorld.propTypes = {
  name: PropTypes.string.isRequired,
};

export default HelloWorld;
