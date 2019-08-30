import React from 'react';
import { Provider } from 'react-redux';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { PersistGate } from 'redux-persist/integration/react';
import { StyleProvider } from 'native-base';

import { store, persistor } from './store';
import { ModalContainer } from './components';
import AppNavigator from './navigations/AppNavigator';
import getTheme from '../native-base-theme/components';
import custom from '../native-base-theme/variables/custom';

export default () => {
  // https://github.com/oblador/react-native-vector-icons#option-with-cocoapods
  SimpleLineIcons.loadFont();
  MaterialCommunityIcons.loadFont();
  return (
    <StyleProvider style={getTheme(custom)}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigator />
          <ModalContainer />
        </PersistGate>
      </Provider>
    </StyleProvider>
  );
};
