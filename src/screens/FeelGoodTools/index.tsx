import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { useSelector } from 'react-redux';
import get from 'lodash/get';

import { WithTranslations, EvaluationItem, Block, RoundIconButton } from '../../components';
import I18n from '../../core/i18n';

import { theme, Enum } from '../../constants';
import { Flag, ActionList } from '../../assets/images';
import { showWeatherIcon } from '../../core/utils';
import NavigatorMap from '../../navigations/NavigatorMap';
import { AppState } from '../../store/types';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white2,
  },
  containerScroll: {
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

const FeelGoodTools: React.FC<NavigationScreenProps> = ({ navigation }: NavigationScreenProps) => {
  const score = useSelector((state: AppState) => state.me.data.score);
  const relationshipsScore = get(score, Enum.EvaluationType.RELATIONSHIPS);
  const activitiesScore = get(score, Enum.EvaluationType.ACTIVITIES);
  const intakesScore = get(score, Enum.EvaluationType.INTAKES);
  const otherScore = get(score, Enum.EvaluationType.OTHER);

  const navigateToSummaryScreen = (evaluationType: Enum.EvaluationType) =>
    navigation.navigate(NavigatorMap.FeelGoodToolsSummary, {
      [Enum.NavigationParamsName.EVALUATION_TYPE]: evaluationType,
    });

  const navigateToDrafts = () => navigation.navigate(NavigatorMap.Drafts);

  const navigateToActionList = () => navigation.navigate(NavigatorMap.ActionList);

  return (
    <Block style={styles.container}>
      <ScrollView contentContainerStyle={styles.containerScroll}>
        <Block flex={false} middle row style={styles.groupIcon}>
          {relationshipsScore !== undefined ? (
            <RoundIconButton
              icon={showWeatherIcon(relationshipsScore, 30)}
              colors={theme.gradients.pink}
              text={I18n.t('summary.relationships')}
              onPress={() => navigateToSummaryScreen(Enum.EvaluationType.RELATIONSHIPS)}
            />
          ) : (
            <Block flex={false} />
          )}
          {activitiesScore !== undefined ? (
            <RoundIconButton
              icon={showWeatherIcon(activitiesScore, 30)}
              colors={theme.gradients.blue}
              text={I18n.t('summary.activities')}
              onPress={() => navigateToSummaryScreen(Enum.EvaluationType.ACTIVITIES)}
            />
          ) : (
            <Block flex={false} />
          )}
          {intakesScore !== undefined ? (
            <RoundIconButton
              icon={showWeatherIcon(intakesScore, 30)}
              colors={theme.gradients.orange}
              text={I18n.t('summary.intakes')}
              onPress={() => navigateToSummaryScreen(Enum.EvaluationType.INTAKES)}
            />
          ) : (
            <Block flex={false} />
          )}
          {otherScore !== undefined ? (
            <RoundIconButton
              icon={showWeatherIcon(otherScore, 30)}
              colors={theme.gradients.purple}
              text={I18n.t('summary.other')}
              onPress={() => navigateToSummaryScreen(Enum.EvaluationType.OTHER)}
            />
          ) : (
            <Block flex={false} />
          )}
        </Block>
        <Text style={styles.header}>{I18n.t('feel_good_tools.header')}</Text>
        <EvaluationItem
          colors={theme.gradients.pink}
          header={I18n.t('feel_good_tools.draft')}
          icon={<Flag />}
          headerColor={theme.colors.black}
          round={false}
          onPress={navigateToDrafts}
        />
        <EvaluationItem
          colors={theme.gradients.pink}
          header={I18n.t('feel_good_tools.action_list')}
          icon={<ActionList />}
          headerColor={theme.colors.black}
          round={false}
          onPress={navigateToActionList}
        />
      </ScrollView>
    </Block>
  );
};

export default WithTranslations(FeelGoodTools);
