import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { NavigationScreenProp, NavigationState, ScrollView } from 'react-navigation';

import NavigatorMap from '../../navigations/NavigatorMap';
import Notifications from './components/Notifications';
import Newsletter from './components/Newsletter';
import MotivationMessages from './components/MotivationMessages';
import { styles } from './styles';

interface ScreenProps {
  dispatch: Dispatch<any>;
  navigation: NavigationScreenProp<NavigationState>;
}

class Parameters extends Component<ScreenProps> {
  _navigateToGlobalScoresScreen = () => {
    return this.props.navigation.navigate(NavigatorMap.GlobalScores);
  };

  render() {
    return (
      <ScrollView scrollEnabled={false} style={styles.container}>
        <Notifications />
        <Newsletter />
        <MotivationMessages />
      </ScrollView>
    );
  }
}

export default Parameters;
