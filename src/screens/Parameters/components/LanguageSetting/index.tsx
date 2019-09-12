import React from 'react';
import { Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import I18n from '../../../../core/i18n';
import { theme } from '../../../../constants';
import { Block, WithTranslations } from '../../../../components';
import { RadioGroup } from '../../../../components/FormFields';
import styles from './styles';
import { changeLanguage, changeLanguageNotification } from '../../../../store/actions';

const languages = [{ label: 'English', value: 'en' }, { label: 'Français', value: 'fr' }];

const LanguageSetting: React.FC<IProps> = () => {
  const language = useSelector(state => state.language.locale);
  const dispatch = useDispatch();

  const _handleChangeLanguage = async (value: any) => {
    // change language
    dispatch(changeLanguageNotification(value));
    dispatch(changeLanguage({ locale: value }));
  };

  return (
    <Block style={styles.container}>
      <Block left flex={false} style={{ maxHeight: 155, marginBottom: 5 }}>
        <Text style={styles.title}>{I18n.t('profile.account_parameters.language_setting')}</Text>
        <Text style={styles.subtitle}>{I18n.t('profile.account_parameters.language_setting_subtitle')}</Text>
      </Block>
      <RadioGroup
        values={languages}
        selectedValue={language}
        circleColor={theme.colors.blue}
        contentStyle={styles.radioGroup}
        labelStyle={styles.radioLabel}
        onPress={_handleChangeLanguage}
      />
    </Block>
  );
};

export default WithTranslations(LanguageSetting);
