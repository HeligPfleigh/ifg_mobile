import React, { useEffect } from 'react';
import firebase from 'react-native-firebase';
import NetInfo from '@react-native-community/netinfo';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Enum } from './constants';
import { store, persistor } from './store';
import { ModalContainer } from './components';
import AppNavigator from './navigations/AppNavigator';
import { showModal } from './store/actions';

// console.disableYellowBox = true;

export default () => {
  // https://github.com/oblador/react-native-vector-icons#option-with-cocoapods
  SimpleLineIcons.loadFont();
  MaterialCommunityIcons.loadFont();
  MaterialIcons.loadFont();

  const checkNetworkStatus = () => {
    NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        store.dispatch(showModal({ onModalPress: () => {}, modalType: Enum.ModalType.NETWORK_NOT_AVAILABLE }));
      }
    });
  };

  const checkPermissionNotification = async () => {
    if (!(await firebase.messaging().hasPermission())) {
      try {
        await firebase.messaging().requestPermission();
      } catch (error) {
        // TODO
      }
    }
  };

  const createNotificationChannel = () => {
    const channel = new firebase.notifications.Android.Channel(
      'insider',
      'insider channel',
      firebase.notifications.Android.Importance.Max,
    );
    firebase.notifications().android.createChannel(channel);
  };

  const createNotificationListeners = async () => {
    firebase.notifications().onNotification(notification => {
      notification.android.setChannelId('insider').setSound('default');
      firebase.notifications().displayNotification(notification);
    });
  };

  useEffect(() => {
    checkNetworkStatus();
    checkPermissionNotification();
    createNotificationChannel();
    createNotificationListeners();
  });

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator uriPrefix={Enum.SUFFIX} />
        <ModalContainer />
      </PersistGate>
    </Provider>
  );
};
