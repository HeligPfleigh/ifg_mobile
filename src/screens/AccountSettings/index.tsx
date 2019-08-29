import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Dispatch } from 'redux';
import { NavigationScreenProp, NavigationState } from 'react-navigation';

import { Block } from '../../components';
import I18n from '../../core/i18n';
import MenuItem from './components/MenuItem';
import Accordion from './components/Accordion';
import ChangePassword from './components/Form/ChangePassword';
import NavigatorMap from '../../navigations/NavigatorMap';
import { styles } from './styles';

interface ScreenProps {
  dispatch: Dispatch<any>;
  navigation: NavigationScreenProp<NavigationState>;
}

class AccountSettings extends Component<ScreenProps> {
  _navigateToGlobalScoresScreen = () => {
    return this.props.navigation.navigate(NavigatorMap.GlobalScores);
  };

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.container}>
        <Block flex={1}>
          <Accordion
            childComponent={<ChangePassword />}
            itemLabel={I18n.t('profile.account_settings.change_password')}
          />
          <MenuItem itemLabel={I18n.t('profile.account_settings.delete_account')} />
        </Block>
      </ScrollView>
    );
  }
}

export default AccountSettings;
