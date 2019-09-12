import React, { useState } from 'react';
import moment from 'moment';
import get from 'lodash/get';
import isUndefined from 'lodash/isUndefined';
import { connect } from 'react-redux';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { NavigationScreenProps, withNavigation } from 'react-navigation';
import { View, Image, ScrollView, Text, KeyboardAvoidingView, Keyboard } from 'react-native';

import styles from './styles';
import I18n from '../../core/i18n';
import { AppState } from '../../store/types';
import { DefaultAvatar } from '../../assets/images';
import { Enum, theme } from '../../constants';
import { Button, Block, FormFields, Loader } from '../../components';
import api from '../../core/api';

interface IUser {
  avatar?: any;
  username?: any;
  firstName?: any;
  lastName?: any;
  DOB?: any;
  gender?: any;
  height?: number;
  weight?: number;
}

interface IProps extends InjectedFormProps, NavigationScreenProps {
  initialValues: IUser;
}

const UserInfo: React.FC<IProps> = (props: IProps) => {
  const genders = [
    { label: I18n.t('profile.user_info.male'), value: 'MALE' },
    { label: I18n.t('profile.user_info.female'), value: 'FEMALE' },
    { label: I18n.t('profile.user_info.other'), value: 'OTHER' },
  ];

  const datePickerProps = {
    horizontal: true,
    scrollEnabled: true,
    pagingEnabled: true,
    calendarWidth: 320,
    dateRange: 120,
    maxDate: moment()
      .subtract(12, 'years')
      .format('YYYY-MM-DD'),
  };

  // back button
  const _handleCancel = () => props.navigation.goBack();

  const [loading, setLoading] = useState(false);
  // handle submit form
  const _handleSubmit = async (values: IUser) => {
    try {
      setLoading(true);
      Keyboard.dismiss();
      const formData = { ...values };
      if (!isUndefined(get(values, 'DOB'))) {
        formData.DOB = moment(get(values, 'DOB')).toISOString();
      }
      if (!isUndefined(get(values, 'height'))) {
        formData.height = Number(get(values, 'height'));
      }
      if (!isUndefined(get(values, 'weight'))) {
        formData.weight = Number(get(values, 'weight'));
      }
      await api.updateUserInfo(formData);
    } catch (err) {
      // TODO
    } finally {
      setLoading(false);
    }
  };

  const { handleSubmit } = props;
  const avatar = get(props, 'initialValues.avatar');
  const { required, maxLength120 } = FormFields.FormValidator;

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <Loader loading={loading} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Image source={avatar || DefaultAvatar} style={styles.avatar} />
        </View>
        <Block flex={5} style={styles.content}>
          <Field
            disabled
            name="username"
            component={FormFields.TextField}
            label={I18n.t('profile.user_info.username')}
          />
          <Field
            name="firstName"
            autoCorrect={false}
            returnKeyType="done"
            component={FormFields.TextField}
            tintColor={theme.colors.green}
            label={I18n.t('profile.user_info.first_name')}
            validate={[required, maxLength120]}
          />
          <Field
            name="lastName"
            autoCorrect={false}
            returnKeyType="done"
            component={FormFields.TextField}
            tintColor={theme.colors.green}
            label={I18n.t('profile.user_info.last_name')}
            validate={[required, maxLength120]}
          />
          <Field
            name="DOB"
            component={FormFields.DateField}
            datePickerProps={datePickerProps}
            label={I18n.t('profile.user_info.dob')}
          />
          <Field
            name="gender"
            datasource={genders}
            component={FormFields.Dropdown}
            label={I18n.t('profile.user_info.gender')}
          />
          <Field
            name="height"
            autoCorrect={false}
            returnKeyType="done"
            keyboardType="numeric"
            component={FormFields.TextField}
            tintColor={theme.colors.green}
            label={`${I18n.t('profile.user_info.height')} (cm)`}
            validate={[required]}
          />
          <Field
            name="weight"
            autoCorrect={false}
            returnKeyType="done"
            keyboardType="numeric"
            component={FormFields.TextField}
            tintColor={theme.colors.green}
            label={`${I18n.t('profile.user_info.weight')} (kg)`}
            validate={[required]}
          />
        </Block>
        <Block flex={false} style={styles.btnGroup}>
          <Button gradient style={styles.btnSend} onPress={handleSubmit(_handleSubmit)}>
            <Block center middle>
              <Text style={styles.labelSend}>{I18n.t('common.save')}</Text>
            </Block>
          </Button>
          <Button shadow style={styles.btnCancel} onPress={_handleCancel}>
            <Block center middle>
              <Text>{I18n.t('common.cancel')}</Text>
            </Block>
          </Button>
        </Block>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state: AppState) => {
  // user dob
  const _dob = get(state, 'me.data.user.DOB');
  const dateDefault = moment().subtract(12, 'years');
  return {
    initialValues: {
      username: get(state, 'me.data.user.username'),
      firstName: get(state, 'me.data.user.firstName'),
      lastName: get(state, 'me.data.user.lastName'),
      gender: get(state, 'me.data.user.gender', 'MALE'),
      height: `${get(state, 'me.data.user.height', 0)}`,
      weight: `${get(state, 'me.data.user.weight', 0)}`,
      DOB: isUndefined(_dob) ? dateDefault.toDate() : moment(_dob).toDate(),
    },
  };
};

export default connect(mapStateToProps)(
  reduxForm({
    form: Enum.ReduxFormName.UPDATE_INFO,
  })(withNavigation(UserInfo)),
);
