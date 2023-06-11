import React from 'react';
import {observer} from 'mobx-react';
import {observable} from 'mobx';

const withState = (Component, State) => {
  return observer(class extends React.Component {
    uiState = observable();

    async componentWillMount() {
      this.uiState = new State();

      if (this.uiState.receiveProps) {
        this.uiState.receiveProps(this.props);
      }
      if (this.uiState.load) {
        await Promise.resolve(this.uiState.load());
      }

      this.isLoaded = true;
    }

    render() {
      return <Component {...this.props} uiState={this.uiState}/>;
    }
  });
};

export default withState;
