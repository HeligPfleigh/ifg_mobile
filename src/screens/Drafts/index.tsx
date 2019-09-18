import React from 'react';
import { ScrollView, Text, StyleSheet, TouchableOpacity, GestureResponderEvent } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationScreenProps, NavigationInjectedProps, withNavigation } from 'react-navigation';
import { useSelector } from 'react-redux';
import { Block } from '../../components';
import { theme, Enum } from '../../constants';
import I18n from '../../core/i18n';
import NavigatorMap from '../../navigations/NavigatorMap';
import { AppState, DraftState } from '../../store/types';

interface DraftProps {
  type: Enum.EvaluationType | null;
  name?: string;
  label?: string | null;
  desc?: string;
  score?: number;
  onPress?: (e: GestureResponderEvent) => void;
}

const styles = StyleSheet.create({
  draftContainer: {
    backgroundColor: theme.colors.white,
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
    marginVertical: theme.sizes.margin,
  },
  draftGradient: {
    padding: theme.sizes.padding,
  },
  draftType: {
    fontSize: theme.sizes.h2,
    fontWeight: '600',
    marginBottom: theme.sizes.margin,
  },
  draftBody: {
    color: theme.colors.blue,
  },
});

interface DraftGroupProps extends NavigationInjectedProps {
  colors: string[];
  drafts: DraftState[];
  type: string;
}

const DraftsGroup: React.FC<DraftGroupProps> = ({ type, colors, drafts, navigation }: DraftGroupProps) => {
  if (!drafts.length) return null;

  const navigateToEvaluate = (draft: DraftState) => {
    navigation.navigate(NavigatorMap.Evaluate, {
      [Enum.NavigationParamsName.EVALUATION_TYPE]: draft.type,
      [Enum.NavigationParamsName.EVALUATION_DATA]: draft,
    });
  };

  return (
    <Block style={styles.draftContainer}>
      <LinearGradient colors={colors} start={{ x: 0.0, y: 0.0 }} end={{ x: 1.0, y: 0.0 }} style={styles.draftGradient}>
        <Text style={styles.draftType}>{I18n.t(`home.${type}`)}</Text>
        {drafts.map((draft: DraftState) => {
          const { name, label, desc, score } = draft;
          let displayText = '';
          displayText += name || '';
          displayText += label ? ` - ${label}` : '';
          displayText += desc ? ` - ${desc}` : '';
          displayText += score ? ` - ${score}` : '';
          return (
            <TouchableOpacity key={`${draft.id}`} onPress={() => navigateToEvaluate(draft)}>
              <Text style={styles.draftBody}>{displayText}</Text>
            </TouchableOpacity>
          );
        })}
      </LinearGradient>
    </Block>
  );
};

const DraftGroupWithNavigation = withNavigation(DraftsGroup);

const Drafts: React.FC<NavigationScreenProps> = () => {
  const draftList = useSelector((state: AppState) => state.drafts.data);
  const email = useSelector((state: AppState) => state.me.data.user.email);
  const myDraftList = draftList.filter((draft: DraftState) => draft.email === email);

  const activityDrafts = myDraftList.filter((draft: DraftState) => draft.type === Enum.EvaluationType.ACTIVITIES);
  const relationshipDrafts = myDraftList.filter(
    (draft: DraftState) => draft.type === Enum.EvaluationType.RELATIONSHIPS,
  );
  const intakeDrafts = myDraftList.filter((draft: DraftState) => draft.type === Enum.EvaluationType.INTAKES);
  const otherDrafts = myDraftList.filter((draft: DraftState) => draft.type === Enum.EvaluationType.OTHER);

  if (myDraftList.length === 0) {
    return (
      <Block center middle flex={1}>
        <Text>{I18n.t('drafts.no_draft')}</Text>
      </Block>
    );
  }

  return (
    <ScrollView>
      <DraftGroupWithNavigation
        drafts={relationshipDrafts}
        colors={theme.gradients.lightpink}
        type={Enum.EvaluationType.ACTIVITIES}
      />
      <DraftGroupWithNavigation
        drafts={activityDrafts}
        colors={theme.gradients.lightblue}
        type={Enum.EvaluationType.RELATIONSHIPS}
      />
      <DraftGroupWithNavigation
        drafts={intakeDrafts}
        colors={theme.gradients.lightorange}
        type={Enum.EvaluationType.INTAKES}
      />
      <DraftGroupWithNavigation
        drafts={otherDrafts}
        colors={theme.gradients.lightpurple}
        type={Enum.EvaluationType.OTHER}
      />
    </ScrollView>
  );
};

export default Drafts;
