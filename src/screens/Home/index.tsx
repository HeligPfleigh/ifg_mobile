import React, { Component } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import get from 'lodash/get';

import { Block, EvaluationItem } from '../../components';
import { theme } from '../../constants';
import I18n from '../../core/i18n';
import { showWeatherIcon } from '../../core/utils';
import { DefaultAvatar } from '../../assets/images';
import Summarize from './components/Summarize';
import { styles } from './styles';
import NavigatorMap from '../../navigations/NavigatorMap';
import { AppState, MeState } from '../../store/types';
import { me } from '../../store/actions';

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
        data: { name, score, avatar },
      },
    } = this.props;
    return (
      <Block>
        <View style={styles.headerContainer}>
          <Image source={avatar || DefaultAvatar} style={styles.avatar} />
          <Block flex={0.5} middle center>
            <Text>{name}</Text>
          </Block>
          <Summarize score={get(score, theme.EvaluationType.OVERALL)} onPress={this._navigateToGlobalScoresScreen} />
        </View>
        <Block flex={2}>
          <ScrollView contentContainerStyle={{ padding: theme.sizes.padding }}>
            <EvaluationItem
              colors={theme.gradients.pink}
              header={I18n.t('home.relationships')}
              text={I18n.t('home.view_details')}
              headerColor={theme.colors.pink}
              icon={showWeatherIcon(get(score, theme.EvaluationType.RELATIONSHIPS, 0))}
              onPressText={() => this._navigateToSummaryScreen(theme.EvaluationType.RELATIONSHIPS)}
            />
            <EvaluationItem
              colors={theme.gradients.blue}
              header={I18n.t('home.activities')}
              text={I18n.t('home.view_details')}
              headerColor={theme.colors.blue}
              icon={showWeatherIcon(get(score, theme.EvaluationType.ACTIVITIES, 0))}
              onPressText={() => this._navigateToSummaryScreen(theme.EvaluationType.ACTIVITIES)}
            />
            <EvaluationItem
              colors={theme.gradients.orange}
              header={I18n.t('home.intakes')}
              text={I18n.t('home.view_details')}
              headerColor={theme.colors.orange}
              icon={showWeatherIcon(get(score, theme.EvaluationType.INTAKES, 0))}
              onPressText={() => this._navigateToSummaryScreen(theme.EvaluationType.INTAKES)}
            />
            <EvaluationItem
              colors={theme.gradients.purple}
              text={I18n.t('home.view_details')}
              header={I18n.t('home.other')}
              headerColor={theme.colors.purple}
              icon={showWeatherIcon(get(score, theme.EvaluationType.OTHER, 0))}
              onPressText={() => this._navigateToSummaryScreen(theme.EvaluationType.OTHER)}
            />
          </ScrollView>
        </Block>
      </Block>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  me: state.me,
});

export default connect(mapStateToProps)(Home);
