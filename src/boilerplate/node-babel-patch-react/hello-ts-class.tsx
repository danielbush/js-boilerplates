import React, { ReactNode } from 'react';

export interface HelloProps {
  greeting: string;
  name: string;
}

class HelloTypescript extends React.Component<HelloProps> {
  static defaultProps = {
    greeting: 'Hello',
  };

  shouldComponentUpdate(): boolean {
    return true;
  }

  render(): ReactNode {
    return (
      <div>
        {this.props.greeting} {this.props.name} from ts
      </div>
    );
  }
}

export default HelloTypescript;
