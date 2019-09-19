import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';

import I18n from '../../core/i18n';
import { Block } from '../../components';
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Block style={styles.content}>
              <Accordion
                childComponent={<ChangePassword />}
                itemLabel={I18n.t('profile.account_settings.change_password')}
              />
              <Accordion
                childComponent={<ChangeUserEmail />}
                itemLabel={I18n.t('profile.account_settings.change_user_email')}
              />
              <MenuItem
                onPress={this._navigateToDeleteAccountScreen}
                itemLabel={I18n.t('profile.account_settings.delete_account')}
              />
              <Block flex={1} />
            </Block>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}

export default AccountSettings;
