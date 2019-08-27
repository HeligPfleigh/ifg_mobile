import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { View, Text, Image } from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';

import { Block } from '../../components';
import { theme } from '../../constants';
import I18n from '../../core/i18n';
import MenuItem from './components/MenuItem';
import { DefaultAvatar } from '../../assets/images';
import NavigatorMap from '../../navigations/NavigatorMap';
import { AppState, MeState } from '../../store/types';
import { me } from '../../store/actions';
import { styles } from './styles';

interface HomeProps {
  dispatch: Dispatch<any>;
  navigation: NavigationScreenProp<NavigationState>;
  me: MeState;
}

class Home extends Component<HomeProps> {
  componentDidMount() {
    this.props.dispatch(me());
  }

  _navigateToGlobalScoresScreen = () => {
    return this.props.navigation.navigate(NavigatorMap.GlobalScores);
  };

  _navigateToSummaryScreen = (evaluationType: theme.EvaluationType) => {
    return this.props.navigation.navigate(NavigatorMap.Summary, { evaluationType });
  };

  render() {
    const {
      me: {
        data: { name, avatar },
      },
    } = this.props;
    return (
      <Block style={{ backgroundColor: 'gray' }}>
        <View style={styles.header}>
          <Image source={avatar || DefaultAvatar} style={styles.avatar} />
          <Block middle center>
            <Text>{name}</Text>
          </Block>
        </View>
        <Block flex={3} style={styles.content}>
          <MenuItem
            iconSize={20}
            iconName="lock"
            itemLabel={I18n.t('profile.account_settings')}
            onPress={this._navigateToGlobalScoresScreen}
          />
          <MenuItem
            iconSize={20}
            iconName="user"
            itemLabel={I18n.t('profile.account_parameters')}
            onPress={this._navigateToGlobalScoresScreen}
          />
          <MenuItem
            iconSize={19}
            iconName="list"
            itemLabel={I18n.t('profile.account_contact_us')}
            onPress={this._navigateToGlobalScoresScreen}
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
