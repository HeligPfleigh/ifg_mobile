import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import NavigatorMap from './NavigatorMap';
import { AuthStack } from './UnAuthorizedNavigator';
import AuthLoadingScreen from '../screens/AuthLoading';
import AppStack from './AuthorizedNavigator';

const AppNavigator = createSwitchNavigator(
  {
    [NavigatorMap.AuthLoading]: AuthLoadingScreen,
    [NavigatorMap.App]: AppStack,
    [NavigatorMap.Auth]: { screen: AuthStack, path: 'auth' },
  },
  {
    initialRouteName: NavigatorMap.AuthLoading,
  },
);

export default createAppContainer(AppNavigator);
