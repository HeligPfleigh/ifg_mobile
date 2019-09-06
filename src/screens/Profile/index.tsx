import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import isUndefined from 'lodash/isUndefined';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Block } from '../../components';
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
  static navigationOptions = {
    headerStyle: {
      elevation: 0,
      height: 15,
      borderBottomWidth: 0,
      backgroundColor: theme.colors.secondary,
    },
    headerBackImage: null,
    headerBackTitle: null,
  };

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
    const {
      me: {
        data: { username: name, avatar },
      },
    } = this.props;
    return (
      <Block style={styles.container}>
        <View style={styles.header}>
          <Image source={!isUndefined(avatar) ? { uri: avatar } : DefaultAvatar} style={styles.avatar} />
          <Block row middle center style={{ alignSelf: 'stretch' }}>
            <Text style={styles.name}>{name}</Text>
            <TouchableOpacity style={styles.headerNav} onPress={this._navigateToUserInfoScreen}>
              <MaterialCommunityIcons name="square-edit-outline" size={theme.sizes.icon} />
            </TouchableOpacity>
          </Block>
        </View>
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

export default connect(mapStateToProps)(Home);
