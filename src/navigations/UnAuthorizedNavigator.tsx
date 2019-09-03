import { createStackNavigator } from 'react-navigation';

import NavigatorMap from './NavigatorMap';
import SignInScreen from '../screens/SignIn';
import SignUpScreen from '../screens/SignUp';
import WelcomeScreen from '../screens/Welcome';
import LicenseScreen from '../screens/License';
import ForgotPasswordScreen from '../screens/ForgotPassword';

export const AuthStack = createStackNavigator(
  {
    [NavigatorMap.Welcome]: WelcomeScreen,
    [NavigatorMap.License]: LicenseScreen,
    [NavigatorMap.SignIn]: SignInScreen,
    [NavigatorMap.SignUp]: SignUpScreen,
    [NavigatorMap.ForgotPassword]: ForgotPasswordScreen,
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
    initialRouteName: NavigatorMap.Welcome,
  },
);
