import React from 'react';
import { ScrollView } from 'react-native';
import get from 'lodash/get';
import { useSelector, useDispatch } from 'react-redux';
import noop from 'lodash/noop';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { EvaluationItem, ScoreText, WithTranslations } from '../../components';
import { theme, Enum } from '../../constants';
import I18n from '../../core/i18n';
import NavigatorMap from '../../navigations/NavigatorMap';
import { showWeatherIcon } from '../../core/utils';
import { AppState } from '../../store/types';
import { showModal } from '../../store/actions';

const GlobalScores: React.FC<NavigationStackScreenProps> = ({ navigation }: NavigationStackScreenProps) => {
  const dispatch = useDispatch();

  const navigateToSummaryScreen = (evaluationType: Enum.EvaluationType) =>
    navigation.navigate(NavigatorMap.Summary, {
      [Enum.NavigationParamsName.EVALUATION_TYPE]: evaluationType,
    });

  const showRemindModal = () => dispatch(showModal({ onModalPress: noop, modalType: Enum.ModalType.SELF_EVALUATION }));

  const score = useSelector((state: AppState) => state.me.data.score);
  const relationshipScore = get(score, Enum.EvaluationType.RELATIONSHIPS);
  const activityScore = get(score, Enum.EvaluationType.ACTIVITIES);
  const intakeScore = get(score, Enum.EvaluationType.INTAKES);
  const otherScore = get(score, Enum.EvaluationType.OTHER);
  const overallScore = get(score, Enum.EvaluationType.OVERALL);
  return (
    <ScrollView contentContainerStyle={{ padding: theme.sizes.padding }}>
      <EvaluationItem
        colors={theme.gradients.indigo}
        header={I18n.t('home.overall')}
        headerColor={theme.colors.indigo}
        icon={overallScore !== undefined ? showWeatherIcon(overallScore) : null}
        onPress={() =>
          overallScore !== undefined ? navigateToSummaryScreen(Enum.EvaluationType.OVERALL) : showRemindModal()
        }
        detailComponent={overallScore !== undefined ? <ScoreText score={overallScore} /> : undefined}
      />
      <EvaluationItem
        colors={theme.gradients.pink}
        header={I18n.t('home.relationships')}
        headerColor={theme.colors.pink}
        icon={relationshipScore !== undefined ? showWeatherIcon(relationshipScore) : null}
        onPress={() =>
          relationshipScore !== undefined
            ? navigateToSummaryScreen(Enum.EvaluationType.RELATIONSHIPS)
            : showRemindModal()
        }
        detailComponent={relationshipScore !== undefined ? <ScoreText score={relationshipScore} /> : undefined}
      />
      <EvaluationItem
        colors={theme.gradients.blue}
        header={I18n.t('home.activities')}
        headerColor={theme.colors.blue}
        icon={activityScore !== undefined ? showWeatherIcon(activityScore) : null}
        onPress={() =>
          activityScore !== undefined ? navigateToSummaryScreen(Enum.EvaluationType.ACTIVITIES) : showRemindModal()
        }
        detailComponent={activityScore !== undefined ? <ScoreText score={activityScore} /> : undefined}
      />
      <EvaluationItem
        colors={theme.gradients.orange}
        header={I18n.t('home.intakes')}
        headerColor={theme.colors.orange}
        icon={intakeScore !== undefined ? showWeatherIcon(intakeScore) : null}
        onPress={() =>
          intakeScore !== undefined ? navigateToSummaryScreen(Enum.EvaluationType.INTAKES) : showRemindModal()
        }
        detailComponent={intakeScore !== undefined ? <ScoreText score={intakeScore} /> : undefined}
      />
      <EvaluationItem
        colors={theme.gradients.purple}
        header={I18n.t('home.other')}
        headerColor={theme.colors.purple}
        icon={otherScore !== undefined ? showWeatherIcon(otherScore) : null}
        onPress={() =>
          otherScore !== undefined ? navigateToSummaryScreen(Enum.EvaluationType.OTHER) : showRemindModal()
        }
        detailComponent={otherScore !== undefined ? <ScoreText score={otherScore} /> : undefined}
      />
    </ScrollView>
  );
};

export default WithTranslations(GlobalScores);
