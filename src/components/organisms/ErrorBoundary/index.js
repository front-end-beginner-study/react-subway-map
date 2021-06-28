import { Component } from 'react';

import { ErrorBlueScreen } from '../../';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null,
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error(error);
  }

  render() {
    const { error } = this.state;
    const { FallbackComponent, children } = this.props;

    if (error) {
      if (!FallbackComponent) {
        return <ErrorBlueScreen />;
      }
      return <FallbackComponent />;
    }

    return children;
  }
}

export { ErrorBoundary };
