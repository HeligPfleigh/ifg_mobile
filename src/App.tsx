import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ModalContainer } from './components';

import { store, persistor } from './store';
import AppNavigator from './navigations/AppNavigator';

export default () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppNavigator />
      <ModalContainer />
    </PersistGate>
  </Provider>
);
