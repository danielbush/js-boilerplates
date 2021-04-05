import React from 'react';
import { css } from '@emotion/react';

export interface HelloProps {
  greeting: string;
  name: string;
}

const style = css`
  font-weight: bold;
`;

class HelloTypescript extends React.Component<HelloProps, {}> {
  static defaultProps = {
    greeting: 'Hello',
  };

  shouldComponentUpdate() {
    return true;
  }

  render() {
    return (
      <div css={style}>
        {this.props.greeting} {this.props.name}
      </div>
    );
  }
}

export default HelloTypescript;
