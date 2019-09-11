import React, { useState } from 'react';
import { Text } from 'react-native';
import firebase from 'react-native-firebase';

import I18n from '../../../../core/i18n';
import { theme } from '../../../../constants';
import { Block } from '../../../../components';
import { RadioGroup } from '../../../../components/FormFields';
import styles from './styles';
import api from '../../../../core/api';

const languages = [{ label: 'English', value: 'en' }, { label: 'Français', value: 'fr' }];

const LanguageSetting: React.FC = () => {
  const [itemSelected, setItemSelected] = useState('en');

  const _handleChangeLanguage = async (value: any) => {
    // change language
    setItemSelected(value);
    const firebaseToken = await firebase.messaging().getToken();
    await api.editFirebaseSetting({ language: value }, firebaseToken);
  };

  return (
    <Block style={styles.container}>
      <Block left flex={false} style={{ maxHeight: 155, marginBottom: 5 }}>
        <Text style={styles.title}>{I18n.t('profile.account_parameters.language_setting')}</Text>
        <Text style={styles.subtitle}>{I18n.t('profile.account_parameters.language_setting_subtitle')}</Text>
      </Block>
      <RadioGroup
        values={languages}
        selectedValue={itemSelected}
        circleColor={theme.colors.blue}
        contentStyle={styles.radioGroup}
        labelStyle={styles.radioLabel}
        onPress={_handleChangeLanguage}
      />
    </Block>
  );
};

export default LanguageSetting;
