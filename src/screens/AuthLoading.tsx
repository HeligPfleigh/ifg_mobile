import React from 'react';
import { ActivityIndicator } from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';

import { useSelector } from 'react-redux';
import { AppState } from '../store/types';
import NavigatorMap from '../navigations/NavigatorMap';
import { authorizeApi } from '../core/api';
import { theme } from '../constants';
import { Block } from '../components';

interface AuthLoadingProps {
  navigation: NavigationScreenProp<NavigationState>;
}

const AuthLoadingScreen: React.FC<AuthLoadingProps> = (props: AuthLoadingProps) => {
  const { navigation } = props;
  const authToken = useSelector((state: AppState) => state.auth.token);
  authorizeApi(authToken);
  navigation.navigate(authToken ? NavigatorMap.App : NavigatorMap.Auth);
  return (
    <Block middle>
      <ActivityIndicator size="large" color={theme.colors.blue} />
    </Block>
  );
};

export default AuthLoadingScreen;
