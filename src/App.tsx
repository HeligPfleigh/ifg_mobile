import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { PersistGate } from 'redux-persist/integration/react';
import NetInfo from '@react-native-community/netinfo';

import { store, persistor } from './store';
import { ModalContainer } from './components';
import AppNavigator from './navigations/AppNavigator';
import { showModal } from './store/actions';
import { Enum } from './constants';

// console.disableYellowBox = true;

export default () => {
  // https://github.com/oblador/react-native-vector-icons#option-with-cocoapods
  SimpleLineIcons.loadFont();
  MaterialCommunityIcons.loadFont();
  MaterialIcons.loadFont();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        store.dispatch(showModal({ onModalPress: () => {}, modalType: Enum.ModalType.NETWORK_NOT_AVAILABLE }));
      }
    });
    return unsubscribe;
  });

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator />
        <ModalContainer />
      </PersistGate>
    </Provider>
  );
};

// XMLHttpRequest = global.originalXMLHttpRequest ? global.originalXMLHttpRequest : global.XMLHttpRequest;

// global._fetch = fetch;
// global.fetch = function(uri, options, ...args) {
//   return global._fetch(uri, options, ...args).then(response => {
//     console.log('Fetch', { request: { uri, options, ...args }, response });
//     return response;
//   });
// };
