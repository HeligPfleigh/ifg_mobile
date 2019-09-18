import { createStackNavigator } from 'react-navigation';
import React from 'react';
import { Platform } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ChooseLanguage from '../components/ChooseLanguage';
import { theme } from '../constants';
import NavigatorMap from './NavigatorMap';
import SignInScreen from '../screens/SignIn';
import SignUpScreen from '../screens/SignUp';
import WelcomeScreen from '../screens/Welcome';
import ForgotPasswordScreen from '../screens/ForgotPassword';
import ResetPasswordScreen from '../screens/ResetPassword';
import { NavigationParamsName } from '../constants/enum';

export const AuthStack = createStackNavigator(
  {
    [NavigatorMap.Welcome]: {
      screen: WelcomeScreen,
      navigationOptions: { headerTitle: <ChooseLanguage /> },
    },
    [NavigatorMap.SignIn]: SignInScreen,
    [NavigatorMap.SignUp]: SignUpScreen,
    [NavigatorMap.ForgotPassword]: ForgotPasswordScreen,
    [NavigatorMap.ResetPassword]: {
      screen: ResetPasswordScreen,
      path: `resetPwd/:${NavigationParamsName.RESET_PASSWORD_TOKEN}`,
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        elevation: 0,
        borderBottomWidth: 0,
        marginRight: Platform.OS === 'android' ? theme.sizes.margin : theme.sizes.padding,
        marginLeft: Platform.OS === 'android' ? theme.sizes.margin : theme.sizes.padding,
      },
      headerBackImage: <MaterialIcons size={theme.sizes.icon} name="keyboard-backspace" color={theme.colors.gray4} />,
      headerBackTitle: null,
    },
    headerLayoutPreset: 'center',
    initialRouteName: NavigatorMap.Welcome,
  },
);
