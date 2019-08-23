import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';

import { EvaluationItem } from '../../components';
import { SunImg, StormImg, MoonImg } from '../../assets/images';
import { theme } from '../../constants';
import I18n from "../../core/i18n";
import NavigatorMap from '../../navigations/NavigatorMap';

interface HomeProps {
  navigation: NavigationScreenProp<NavigationState>;
}

export default class extends Component<HomeProps> {
  _navigateToSummaryScreen = (evaluationType: theme.EvaluationType) => this.props.navigation.navigate(NavigatorMap.Summary, { evaluationType })

  render() {
    const { navigation } = this.props;
    return (
      <ScrollView contentContainerStyle={{ padding: theme.sizes.padding }}>
        <EvaluationItem
          colors={theme.gradients.pink}
          header={I18n.t('home.relationships')}
          headerColor={theme.colors.pink}
          text={3.6}
          icon={<SunImg />}
          onPressIcon={() => this._navigateToSummaryScreen(theme.EvaluationType.RELATIONSHIPS)}
        />
        <EvaluationItem
          colors={theme.gradients.blue}
          header={I18n.t('home.activities')}
          headerColor={theme.colors.blue}
          text={2.5}
          icon={<StormImg />}
          onPressIcon={() => this._navigateToSummaryScreen(theme.EvaluationType.ACTIVITIES)}
        />
        <EvaluationItem
          colors={theme.gradients.orange}
          header={I18n.t('home.intakes')}
          headerColor={theme.colors.orange}
          text={1.8}
          icon={<MoonImg />}
          onPressIcon={() => this._navigateToSummaryScreen(theme.EvaluationType.INTAKES)}
        />
        <EvaluationItem
          colors={theme.gradients.purple}
          text={3.6}
          header={I18n.t('home.other')}
          headerColor={theme.colors.purple}
          icon={<SunImg />}
          onPressIcon={() => this._navigateToSummaryScreen(theme.EvaluationType.OTHER)}
        />

        <EvaluationItem
          colors={theme.gradients.indigo}
          header={I18n.t('home.overall')}
          headerColor={theme.colors.indigo}
          text={4.5}
          icon={<MoonImg />}
          onPressIcon={() => this._navigateToSummaryScreen(theme.EvaluationType.OVERALL)}
        />
      </ScrollView>
    );
  }
}

