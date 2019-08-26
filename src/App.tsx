import React from 'react';
import { Provider } from 'react-redux';

import { store } from './store';
import AppNavigator from './navigations/AppNavigator';

export default () => (
  <Provider store={store}>
    <AppNavigator />
  </Provider>
);
