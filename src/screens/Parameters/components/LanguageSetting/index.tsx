import React from 'react';
import { Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationInjectedProps, withNavigation, StackActions, NavigationActions } from 'react-navigation';
import I18n from '../../../../core/i18n';
import { theme } from '../../../../constants';
import { Block, WithTranslations } from '../../../../components';
import { RadioGroup } from '../../../../components/FormFields';
import styles from './styles';
import { changeLanguage, changeLanguageNotification } from '../../../../store/actions';
import NavigatorMap from '../../../../navigations/NavigatorMap';

const languages = [{ label: 'English', value: 'en' }, { label: 'Français', value: 'fr' }];

const LanguageSetting: React.FC = ({ navigation }: NavigationInjectedProps) => {
  const dispatch = useDispatch();
  const language = useSelector(state => state.language.locale);

  const _handleChangeLanguage = async (value: any) => {
    dispatch(changeLanguageNotification(value));
    dispatch(changeLanguage({ locale: value }));
    // temporary solution to refresh tabbar after changing language
    const resetAction = StackActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: NavigatorMap.Profile }),
        NavigationActions.navigate({ routeName: NavigatorMap.Parameters }),
      ],
    });
    navigation.dispatch(resetAction);
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

export default WithTranslations(withNavigation(LanguageSetting));
