import React, { useState } from 'react';
import get from 'lodash/get';
import { Text, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { TextField } from 'react-native-material-textfield';

import { NavigationStackScreenProps } from 'react-navigation-stack';
import { ScrollView } from 'react-native-gesture-handler';
import I18n from '../../core/i18n';
import { theme } from '../../constants';
import { Block, Button, Loader, WithTranslations, Toast } from '../../components';
import { styles } from './styles';
import api from '../../core/api';
import NavigatorMap from '../../navigations/NavigatorMap';

const ContactUs: React.FC<NavigationStackScreenProps> = ({ navigation }: NavigationStackScreenProps) => {
  const subjects = [
    { label: I18n.t('profile.account_contact_us.feedback'), value: 'FEEDBACK' },
    { label: I18n.t('profile.account_contact_us.suggest'), value: 'SUGGESTIONS' },
    { label: I18n.t('profile.account_contact_us.tech_quest'), value: 'TECHNICAL_QUESTION' },
    { label: I18n.t('profile.account_contact_us.other'), value: 'OTHER' },
  ];
  const initialValue = get(subjects[0], 'value');
  const [value, setValue] = useState(initialValue);
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const handleCancel = () => navigation.goBack();
  const handleSubmit = async () => {
    try {
      setLoading(true);
      Keyboard.dismiss();
      await api.giveFeedback({ subject: value, message: feedback });
      Toast.success(I18n.t('profile.account_contact_us.feedback_success'));
      navigation.navigate(NavigatorMap.Home);
    } catch (err) {
      // TODO Translate
      Toast.error(I18n.t(get(err, 'response.data.error.message', 'errors.default')));
    } finally {
      setLoading(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Loader loading={loading} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Block flex={false}>
            <Block flex={false} center middle style={styles.titleWrapper}>
              <Text style={styles.pageTitle}>{I18n.t('profile.account_contact_us.page_title')}</Text>
            </Block>
            <Block flex={false} style={styles.fieldWrapper}>
              <Text style={styles.fieldLabel}>{I18n.t('profile.account_contact_us.subject')}</Text>
              <Dropdown
                data={subjects}
                value={value}
                rippleColor={theme.colors.gray}
                dropdownOffset={{ top: 5, left: 0 }}
                onChangeText={text => setValue(text)}
              />
            </Block>
            <Block flex={false} style={styles.fieldWrapper}>
              <Text style={styles.fieldLabel}>{I18n.t('profile.account_contact_us.description')}</Text>
              <TextField
                multiline
                label=""
                bordered
                height={175}
                maxLength={500}
                characterRestriction={500}
                labelHeight={0}
                labelPadding={0}
                activeLineWidth={1}
                style={styles.textarea}
                value={feedback}
                onChangeText={text => setFeedback(text)}
              />
            </Block>
          </Block>
          <Block flex={false}>
            <Button gradient style={styles.btnSend} onPress={handleSubmit}>
              <Block center middle>
                <Text style={styles.labelSend}>{I18n.t('common.send')}</Text>
              </Block>
            </Button>
            <Button gradient style={styles.btnCancel} onPress={handleCancel}>
              <Block style={styles.btnCancelBody} center middle>
                <Text style={styles.txtCancel}>{I18n.t('common.cancel')}</Text>
              </Block>
            </Button>
          </Block>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default WithTranslations(ContactUs);
