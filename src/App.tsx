import React from 'react';
import { Provider } from 'react-redux';
import { ModalContainer } from './components';

import { store } from './store';
import AppNavigator from './navigations/AppNavigator';

export default () => (
  <Provider store={store}>
    <AppNavigator />
    <ModalContainer />
  </Provider>
);
