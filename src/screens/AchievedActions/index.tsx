import React, { useEffect } from 'react';
import { Text, ScrollView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loadActions } from '../../store/actions';
import { theme, Enum } from '../../constants';
import { Block, Loader } from '../../components';
import I18n from '../../core/i18n';
import { AppState } from '../../store/types';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white2,
  },
  scrollview: {
    width: '100%',
    backgroundColor: theme.colors.white2,
  },
  header: {
    textAlign: 'center',
    paddingHorizontal: theme.sizes.padding,
    fontSize: theme.sizes.h2,
    paddingVertical: theme.sizes.margin,
  },
  item: {
    marginVertical: theme.sizes.margin / 2,
    paddingVertical: theme.sizes.margin,
    backgroundColor: theme.colors.white,
    paddingLeft: theme.sizes.padding,
  },
});

const AchievedAction = ({ action: { action } }: any) => (
  <Block flex={1} row style={styles.item}>
    <Text>{action}</Text>
  </Block>
);

export const AchievedActions: React.FC = () => {
  const dispatch = useDispatch();
  const achievedActions = useSelector((state: AppState) => state.myaction.data.archieved);
  const isFetching = useSelector((state: AppState) => state.myaction.isFetching);
  useEffect(() => {
    dispatch(loadActions(Enum.ActionStatus.ARCHIEVED));
  }, [dispatch]);
  return (
    <Block center style={styles.container}>
      <Loader loading={isFetching} />
      <Text style={styles.header}>{I18n.t('achieved_actions.header')}</Text>
      <ScrollView style={styles.scrollview}>
        {achievedActions.map((achievedAction: any) => (
          <AchievedAction action={achievedAction} key={`${achievedAction.id}`} />
        ))}
      </ScrollView>
    </Block>
  );
};

export default AchievedActions;
