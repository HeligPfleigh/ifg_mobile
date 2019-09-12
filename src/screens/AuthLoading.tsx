import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import firebase from 'react-native-firebase';

import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../store/types';
import NavigatorMap from '../navigations/NavigatorMap';
import { authorizeApi } from '../core/api';
import { theme } from '../constants';
import { Block } from '../components';
import { saveFirebaseToken } from '../store/actions';
import I18n from '../core/i18n';

interface AuthLoadingProps {
  navigation: NavigationScreenProp<NavigationState>;
}

const AuthLoadingScreen: React.FC<AuthLoadingProps> = (props: AuthLoadingProps) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const authToken = useSelector((state: AppState) => state.auth.token);
  const firebaseTk = useSelector((state: AppState) => state.notification.firebaseToken);
  const locale = useSelector((state: AppState) => state.language.locale);
  authorizeApi(authToken);
  navigation.navigate(authToken ? NavigatorMap.App : NavigatorMap.Auth);
  const getToken = async () => {
    if (!firebaseTk) {
      const firebaseToken = await firebase.messaging().getToken();
      dispatch(saveFirebaseToken({ firebaseToken }));
    }
  };

  const requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
    } catch (error) {
      // TODO
    }
  };

  const checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      getToken();
    } else {
      requestPermission();
    }
  };

  const createNotificationListeners = async () => {
    firebase.notifications().onNotification(notification => {
      notification.android.setChannelId('insider').setSound('default');
      firebase.notifications().displayNotification(notification);
    });
  };

  useEffect(() => {
    const channel = new firebase.notifications.Android.Channel(
      'insider',
      'insider channel',
      firebase.notifications.Android.Importance.Max,
    );
    firebase.notifications().android.createChannel(channel);
    checkPermission();
    createNotificationListeners();

    // load language setting
    I18n.locale = locale;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Block middle>
      <ActivityIndicator size="large" color={theme.colors.blue} />
    </Block>
  );
};

export default AuthLoadingScreen;
