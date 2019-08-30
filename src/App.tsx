import React from 'react';
import { Provider } from 'react-redux';
import { StyleProvider } from 'native-base';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './store';
import getTheme from './theme/components';
import custom from './theme/variables/custom';
import { ModalContainer } from './components';
import AppNavigator from './navigations/AppNavigator';

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
