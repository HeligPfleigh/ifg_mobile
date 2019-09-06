import React, { useEffect } from 'react';
import { Text, ScrollView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loadActions } from '../../store/actions';
import { theme, Enum } from '../../constants';
import { Block } from '../../components';
import I18n from '../../core/i18n';
import { AppState } from '../../store/types';

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    paddingHorizontal: theme.sizes.padding,
    fontSize: theme.sizes.h2,
    paddingVertical: theme.sizes.margin,
  },
  item: {
    marginVertical: theme.sizes.margin,
    paddingVertical: theme.sizes.margin,
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    paddingLeft: theme.sizes.padding,
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
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
  useEffect(() => {
    dispatch(loadActions(Enum.ActionStatus.ARCHIEVED));
  }, [dispatch]);
  return (
    <Block center>
      <Text style={styles.header}>{I18n.t('achieved_actions.header')}</Text>
      <ScrollView>
        {achievedActions.map((achievedAction: any) => (
          <AchievedAction action={achievedAction} key={`${achievedAction.id}`} />
        ))}
      </ScrollView>
    </Block>
  );
};

export default AchievedActions;
