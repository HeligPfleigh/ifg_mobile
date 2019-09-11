import React from 'react';
import { Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import I18n from '../../../../core/i18n';
import { theme } from '../../../../constants';
import { Block, WithTranslations } from '../../../../components';
import { RadioGroup } from '../../../../components/FormFields';
import styles from './styles';
import { toggleIsReceiveNotification } from '../../../../store/actions';
import { AppState } from '../../../../store/types';

const data = [{ label: 'Yes', value: true }, { label: `I DON'T need feel good information`, value: false }];

const MotivationMessages: React.FC = () => {
  const dispatch = useDispatch();
  const isReceiveNotification = useSelector((state: AppState) => state.notification.isReceiveNotification);

  const onSelected = (value: boolean) => {
    dispatch(toggleIsReceiveNotification(value));
  };

  return (
    <Block style={styles.container}>
      <Block left flex={false} style={{ maxHeight: 155, marginBottom: 5 }}>
        <Text style={styles.title}>{I18n.t('profile.account_parameters.notifications')}</Text>
        <Text style={styles.subtitle}>{I18n.t('profile.account_parameters.notifications_subtitle')}</Text>
      </Block>
      <RadioGroup
        horizontal
        values={data}
        selectedValue={isReceiveNotification}
        circleColor={theme.colors.blue}
        contentStyle={styles.radioGroup}
        labelStyle={styles.radioLabel}
        onPress={onSelected}
      />
    </Block>
  );
};

export default WithTranslations(MotivationMessages);
