import React, { Component } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { connect } from 'react-redux';
import get from 'lodash/get';

import I18n from '../../core/i18n';
import { EvaluationItem, Block, RoundIconButton } from '../../components';
import { theme, Enum } from '../../constants';
import { LightBulb, Flag, ActionList } from '../../assets/images';
import { showWeatherIcon } from '../../core/utils';
import NavigatorMap from '../../navigations/NavigatorMap';
import { AppState, MeState } from '../../store/types';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.sizes.padding,
    paddingVertical: theme.sizes.padding / 2,
  },
  header: {
    textAlign: 'center',
    marginBottom: theme.sizes.margin,
  },
  groupIcon: {
    margin: theme.sizes.margin,
    marginTop: 0,
  },
});

interface FeelGoodToolsProps {
  navigation: NavigationScreenProp<NavigationState>;
  me: MeState;
}

class FeelGoodTools extends Component<FeelGoodToolsProps> {
  _navigateToSummaryScreen = (evaluationType: Enum.EvaluationType) =>
    this.props.navigation.navigate(NavigatorMap.Summary, { evaluationType });

  render() {
    const {
      me: {
        data: { score },
      },
    } = this.props;

    const relationshipsScore = get(score, Enum.EvaluationType.RELATIONSHIPS);
    const activitiesScore = get(score, Enum.EvaluationType.ACTIVITIES);
    const intakesScore = get(score, Enum.EvaluationType.INTAKES);
    const otherScore = get(score, Enum.EvaluationType.OTHER);

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Block flex={false} middle row style={styles.groupIcon}>
          {relationshipsScore && (
            <RoundIconButton
              icon={showWeatherIcon(relationshipsScore, 30)}
              colors={theme.gradients.pink}
              text={I18n.t('summary.relationships')}
              onPress={() => this._navigateToSummaryScreen(Enum.EvaluationType.RELATIONSHIPS)}
            />
          )}
          {activitiesScore && (
            <RoundIconButton
              icon={showWeatherIcon(activitiesScore, 30)}
              colors={theme.gradients.blue}
              text={I18n.t('summary.activities')}
              onPress={() => this._navigateToSummaryScreen(Enum.EvaluationType.ACTIVITIES)}
            />
          )}
          {intakesScore && (
            <RoundIconButton
              icon={showWeatherIcon(intakesScore, 30)}
              colors={theme.gradients.orange}
              text={I18n.t('summary.intakes')}
              onPress={() => this._navigateToSummaryScreen(Enum.EvaluationType.INTAKES)}
            />
          )}
          {otherScore && (
            <RoundIconButton
              icon={showWeatherIcon(otherScore, 30)}
              colors={theme.gradients.purple}
              text={I18n.t('summary.other')}
              onPress={() => this._navigateToSummaryScreen(Enum.EvaluationType.OTHER)}
            />
          )}
        </Block>
        <Text style={styles.header}>{I18n.t('feel_good_tools.header')}</Text>
        <EvaluationItem
          colors={theme.gradients.pink}
          header={I18n.t('feel_good_tools.tip')}
          icon={<LightBulb />}
          headerColor={theme.colors.black}
          round={false}
        />
        <EvaluationItem
          colors={theme.gradients.pink}
          header={I18n.t('feel_good_tools.draft')}
          icon={<Flag />}
          headerColor={theme.colors.black}
          round={false}
        />
        <EvaluationItem
          colors={theme.gradients.pink}
          header={I18n.t('feel_good_tools.action_list')}
          icon={<ActionList />}
          headerColor={theme.colors.black}
          round={false}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  me: state.me,
});

export default connect(mapStateToProps)(FeelGoodTools);
