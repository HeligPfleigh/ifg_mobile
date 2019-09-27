import React, { useEffect } from 'react';
import firebase from 'react-native-firebase';
import { ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationScreenProp, NavigationState } from 'react-navigation';

import I18n from '../core/i18n';
import { AppState } from '../store/types';
import { theme } from '../constants';
import { authorizeApi } from '../core/api';
import { Block } from '../components';
import { saveFirebaseToken } from '../store/actions';
import NavigatorMap from '../navigations/NavigatorMap';

interface AuthLoadingProps {
  navigation: NavigationScreenProp<NavigationState>;
}

const AuthLoadingScreen: React.FC<AuthLoadingProps> = (props: AuthLoadingProps) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const authToken = useSelector((state: AppState) => state.auth.token);
  const locale = useSelector((state: AppState) => state.language.locale);
  const firebaseTk = useSelector((state: AppState) => state.notification.firebaseToken);
  const rehydrated = useSelector((state: AppState) => state._persist.rehydrated);

  const updateFirebaseToken = async () => {
    if (!firebaseTk) {
      dispatch(saveFirebaseToken({ firebaseToken: await firebase.messaging().getToken() }));
    }
  };

  useEffect(() => {
    updateFirebaseToken();
    // load language setting
    I18n.locale = locale;
    // attachment token
    authorizeApi(authToken);
    if (rehydrated) {
      navigation.navigate(authToken ? NavigatorMap.App : NavigatorMap.Auth);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Block middle>
      <ActivityIndicator size="large" color={theme.colors.blue} />
    </Block>
  );
};

export default AuthLoadingScreen;
