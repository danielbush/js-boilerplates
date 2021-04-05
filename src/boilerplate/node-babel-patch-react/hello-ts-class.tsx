import React from 'react';

export interface HelloProps {
  greeting: string;
  name: string;
}

class HelloTypescript extends React.Component<HelloProps, {}> {
  static defaultProps = {
    greeting: 'Hello',
  };

  shouldComponentUpdate() {
    return true;
  }

  render() {
    return (
      <div>
        {this.props.greeting} {this.props.name} from ts
      </div>
    );
  }
}

export default HelloTypescript;
