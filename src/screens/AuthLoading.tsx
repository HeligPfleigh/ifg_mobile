import React, { PureComponent } from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';

import NavigatorMap from '../navigations/NavigatorMap';

interface AuthLoadingProps {
  navigation: NavigationScreenProp<any>;
}

export default class AuthLoadingScreen extends PureComponent<AuthLoadingProps> {
  constructor(props: AuthLoadingProps) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    /* eslint-disable-next-line */
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    /* eslint-disable-next-line */
    this.props.navigation.navigate(true ? NavigatorMap.App : NavigatorMap.Auth);
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
