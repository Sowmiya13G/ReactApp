import React, {Component} from 'react';
import {Provider} from 'react-redux';
import store from '../../../redux/store/store';
import NewsList from '../../../components/NewsData/NewsList';
export class PriceScreen extends Component {
  render() {
    return (
      <Provider store={store}>
        <NewsList />
      </Provider>
    );
  }
}

export default PriceScreen;
