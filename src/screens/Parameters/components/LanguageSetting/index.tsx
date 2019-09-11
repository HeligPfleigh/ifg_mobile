import React, { useState } from 'react';
import { Text } from 'react-native';
import firebase from 'react-native-firebase';
import { get } from 'lodash';
import { useDispatch } from 'react-redux';
import I18n from '../../../../core/i18n';
import { theme } from '../../../../constants';
import { Block, WithTranslations } from '../../../../components';
import { RadioGroup } from '../../../../components/FormFields';
import styles from './styles';
import { changeLanguage } from '../../../../store/language/actions';
import api from '../../../../core/api';

interface IProps {
  language: string;
}

const languages = [{ label: 'English', value: 'en' }, { label: 'Français', value: 'fr' }];

const LanguageSetting: React.FC<IProps> = (props: IProps) => {
  const [itemSelected, setItemSelected] = useState(get(props, 'language', 'en'));
  const dispatch = useDispatch();

  const _handleChangeLanguage = async (value: any) => {
    // change language
    setItemSelected(value);
    dispatch(changeLanguage({ locale: value }));
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

export default WithTranslations(LanguageSetting);
