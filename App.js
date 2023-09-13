import React, {Component} from 'react';
import Navigator from './src/navigation/Navigator';
import {
  requestUserPermission,
  setupFCMListeners,
} from './src/utils/pushnotification_helper';
class App extends Component {
  componentDidMount() {
    requestUserPermission();
    setupFCMListeners();
  }

  render() {
    return <Navigator />;
  }
}

export default App;
