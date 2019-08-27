import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import get from 'lodash/get';

import { connect } from 'react-redux';
import { EvaluationItem } from '../../components';
import { theme, Enum } from '../../constants';
import I18n from '../../core/i18n';
import NavigatorMap from '../../navigations/NavigatorMap';
import { showWeatherIcon } from '../../core/utils';
import { MeState, AppState } from '../../store/types';

interface HomeProps {
  navigation: NavigationScreenProp<NavigationState>;
  me: MeState;
}

class GlobalScores extends Component<HomeProps> {
  _navigateToSummaryScreen = (evaluationType: Enum.EvaluationType) =>
    this.props.navigation.navigate(NavigatorMap.Summary, { evaluationType });

  render() {
    const {
      me: {
        data: { score },
      },
    } = this.props;
    return (
      <ScrollView contentContainerStyle={{ padding: theme.sizes.padding }}>
        <EvaluationItem
          colors={theme.gradients.pink}
          header={I18n.t('home.relationships')}
          headerColor={theme.colors.pink}
          text={get(score, Enum.EvaluationType.RELATIONSHIPS, 0)}
          icon={showWeatherIcon(get(score, Enum.EvaluationType.RELATIONSHIPS, 0))}
          onPressIcon={() => this._navigateToSummaryScreen(Enum.EvaluationType.RELATIONSHIPS)}
        />
        <EvaluationItem
          colors={theme.gradients.blue}
          header={I18n.t('home.activities')}
          headerColor={theme.colors.blue}
          text={get(score, Enum.EvaluationType.ACTIVITIES, 0)}
          icon={showWeatherIcon(get(score, Enum.EvaluationType.ACTIVITIES, 0))}
          onPressIcon={() => this._navigateToSummaryScreen(Enum.EvaluationType.ACTIVITIES)}
        />
        <EvaluationItem
          colors={theme.gradients.orange}
          header={I18n.t('home.intakes')}
          headerColor={theme.colors.orange}
          text={get(score, Enum.EvaluationType.INTAKES, 0)}
          icon={showWeatherIcon(get(score, Enum.EvaluationType.INTAKES, 0))}
          onPressIcon={() => this._navigateToSummaryScreen(Enum.EvaluationType.INTAKES)}
        />
        <EvaluationItem
          colors={theme.gradients.purple}
          text={get(score, Enum.EvaluationType.OTHER, 0)}
          header={I18n.t('home.other')}
          headerColor={theme.colors.purple}
          icon={showWeatherIcon(get(score, Enum.EvaluationType.OTHER, 0))}
          onPressIcon={() => this._navigateToSummaryScreen(Enum.EvaluationType.OTHER)}
        />

        <EvaluationItem
          colors={theme.gradients.indigo}
          header={I18n.t('home.overall')}
          headerColor={theme.colors.indigo}
          text={get(score, Enum.EvaluationType.OVERALL, 0)}
          icon={showWeatherIcon(get(score, Enum.EvaluationType.OVERALL, 0))}
          onPressIcon={() => this._navigateToSummaryScreen(Enum.EvaluationType.OVERALL)}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  me: state.me,
});

export default connect(mapStateToProps)(GlobalScores);
