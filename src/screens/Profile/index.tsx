import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Block, WithTranslations } from '../../components';
import I18n from '../../core/i18n';
import MenuItem from './components/MenuItem';
import { DefaultAvatar } from '../../assets/images';
import NavigatorMap from '../../navigations/NavigatorMap';
import { AppState, MeState } from '../../store/types';
import { logout } from '../../store/actions';
import { theme } from '../../constants';
import { styles } from './styles';

interface HomeProps {
  dispatch: Dispatch<any>;
  navigation: NavigationScreenProp<NavigationState>;
  me: MeState;
}

class Home extends Component<HomeProps> {
  _navigateToUserInfoScreen = () => {
    return this.props.navigation.navigate(NavigatorMap.UserInfo);
  };

  _navigateToAccSettingsScreen = () => {
    return this.props.navigation.navigate(NavigatorMap.AccountSettings);
  };

  _navigateToParametersScreen = () => {
    return this.props.navigation.navigate(NavigatorMap.Parameters);
  };

  _navigateToContactUsScreen = () => {
    return this.props.navigation.navigate(NavigatorMap.ContactUS);
  };

  _logout = () => {
    this.props.dispatch(logout());
    this.props.navigation.navigate(NavigatorMap.Welcome);
  };

  render() {
    const isFetching = get(this.props, 'me.isFetching', true);
    if (isFetching) {
      return (
        <Block middle>
          <ActivityIndicator size="large" color={theme.colors.blue} />
        </Block>
      );
    }

    const avatar = get(this.props, 'me.data.user.avatar', undefined);
    const name = `${get(this.props, 'me.data.user.firstName', '')} ${get(this.props, 'me.data.user.lastName', '')}`;
    return (
      <Block style={styles.container}>
        <Block flex={1.5} style={styles.header}>
          <Block flex={2} center middle>
            <View style={styles.avatar}>
              <Image source={!isEmpty(avatar) ? { uri: avatar } : DefaultAvatar} style={styles.image} />
            </View>
          </Block>
          <Block flex={0.8} row center middle>
            <Text style={styles.name}>{name}</Text>
            <TouchableOpacity style={styles.headerNav} onPress={this._navigateToUserInfoScreen}>
              <MaterialCommunityIcons name="square-edit-outline" size={theme.sizes.icon} />
            </TouchableOpacity>
          </Block>
        </Block>
        <Block flex={3} style={styles.content}>
          <MenuItem
            iconSize={20}
            iconName="lock"
            itemLabel={I18n.t('profile.account_settings.title')}
            onPress={this._navigateToAccSettingsScreen}
          />
          <MenuItem
            iconSize={20}
            iconName="user"
            itemLabel={I18n.t('profile.account_parameters.title')}
            onPress={this._navigateToParametersScreen}
          />
          <MenuItem
            iconSize={19}
            iconName="list"
            itemLabel={I18n.t('profile.account_contact_us.title')}
            onPress={this._navigateToContactUsScreen}
          />
          <MenuItem
            iconSize={19}
            iconName="logout"
            isNavigator={false}
            iconColor={theme.colors.white}
            labelColor={theme.colors.white}
            backgroundColor={theme.colors.red}
            itemLabel={I18n.t('profile.logout')}
            onPress={this._logout}
          />
        </Block>
      </Block>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  me: state.me,
});

export default WithTranslations(connect(mapStateToProps)(Home));
