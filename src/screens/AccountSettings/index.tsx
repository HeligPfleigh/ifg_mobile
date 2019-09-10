import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Dispatch } from 'redux';
import { NavigationScreenProp, NavigationState } from 'react-navigation';

import I18n from '../../core/i18n';
import MenuItem from './components/MenuItem';
import Accordion from './components/Accordion';
import ChangePassword from './components/Form/ChangePassword';
import ChangeUserEmail from './components/Form/ChangeEmail';
import NavigatorMap from '../../navigations/NavigatorMap';
import { styles } from './styles';

interface ScreenProps {
  dispatch: Dispatch<any>;
  navigation: NavigationScreenProp<NavigationState>;
}

class AccountSettings extends Component<ScreenProps> {
  _navigateToDeleteAccountScreen = () => {
    return this.props.navigation.navigate(NavigatorMap.DeleteAccount);
  };

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.container}>
        <Accordion itemLabel={I18n.t('profile.account_settings.change_password')} childComponent={<ChangePassword />} />
        <Accordion
          childComponent={<ChangeUserEmail />}
          itemLabel={I18n.t('profile.account_settings.change_user_email')}
        />
        <MenuItem
          onPress={this._navigateToDeleteAccountScreen}
          itemLabel={I18n.t('profile.account_settings.delete_account')}
        />
      </ScrollView>
    );
  }
}

export default AccountSettings;
