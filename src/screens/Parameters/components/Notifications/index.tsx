import React, { useState } from 'react';
import { Text } from 'react-native';
import firebase from 'react-native-firebase';

import I18n from '../../../../core/i18n';
import { theme } from '../../../../constants';
import { Block } from '../../../../components';
import { RadioGroup } from '../../../../components/FormFields';
import styles from './styles';
import api from '../../../../core/api';

const data = [{ label: 'Yes', value: true }, { label: `I DON'T need feel good information`, value: false }];

const MotivationMessages: React.FC = () => {
  const [itemSelected, setItemSelected] = useState(true);

  const onSelected = async (value: boolean) => {
    try {
      const firebaseToken = await firebase.messaging().getToken();
      await api.editFirebaseSetting({ isReceiveNotification: value }, firebaseToken);
      setItemSelected(value);
      // eslint-disable-next-line no-empty
    } catch (error) {}
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
        selectedValue={itemSelected}
        circleColor={theme.colors.blue}
        contentStyle={styles.radioGroup}
        labelStyle={styles.radioLabel}
        onPress={onSelected}
      />
    </Block>
  );
};

export default MotivationMessages;
