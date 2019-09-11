import React, { useState } from 'react';
import get from 'lodash/get';
import { Text } from 'react-native';

import { useDispatch, connect } from 'react-redux';
import I18n from '../../../../core/i18n';
import { theme } from '../../../../constants';
import { Block } from '../../../../components';
import { RadioGroup } from '../../../../components/FormFields';
import styles from './styles';
import { changeLanguage } from '../../../../store/language/actions';

interface IProps {
  language: string;
}

const languages = [{ label: 'English', value: 'en' }, { label: 'Français', value: 'fr' }];

const LanguageSetting: React.FC<IProps> = (props: IProps) => {
  const [itemSelected, setItemSelected] = useState(get(props, 'language', 'en'));
  const dispatch = useDispatch();

  const _handleChangeLanguage = (value: any) => {
    // change language
    setItemSelected(value);
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
        selectedValue={itemSelected}
        circleColor={theme.colors.blue}
        contentStyle={styles.radioGroup}
        labelStyle={styles.radioLabel}
        onPress={_handleChangeLanguage}
      />
    </Block>
  );
};

export default connect()(LanguageSetting);
