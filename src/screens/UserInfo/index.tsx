import React from 'react';
import moment from 'moment';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { connect, useDispatch } from 'react-redux';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { View, Image, ScrollView, Text, KeyboardAvoidingView } from 'react-native';
import { NavigationScreenProps, withNavigation } from 'react-navigation';

import styles from './styles';
import I18n from '../../core/i18n';
import { AppState } from '../../store/types';
import { DefaultAvatar } from '../../assets/images';
import { Enum } from '../../constants';
import { showModal } from '../../store/actions';
import { Button, Block, FormFields } from '../../components';

interface IProps extends InjectedFormProps, NavigationScreenProps {
  initialValues: {
    avatar?: any;
    username?: any;
    firstName?: any;
    lastName?: any;
    dob?: any;
    gender?: any;
    height?: number;
    weight?: number;
  };
}

const UserInfo: React.FC<IProps> = (props: IProps) => {
  const dispatch = useDispatch();

  // back button
  const _onCancel = () => props.navigation.goBack();

  // handle submit form
  const _handleSubmit = () => {
    const { navigation } = props;
    dispatch(showModal({ modalType: Enum.ModalType.DELETE_ACCOUNT, onModalPress: navigation.goBack }));
  };

  const avatar = get(props, 'initialValues.avatar');
  const { required, maxLength120 } = FormFields.FormValidator;

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
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
            component={FormFields.TextField}
            label={I18n.t('profile.user_info.first_name')}
            validate={[required, maxLength120]}
          />
          <Field
            name="lastName"
            autoCorrect={false}
            component={FormFields.TextField}
            label={I18n.t('profile.user_info.last_name')}
            validate={[required, maxLength120]}
          />
          <Field name="dob" component={FormFields.DateField} label={I18n.t('profile.user_info.dob')} />
          <Field
            name="gender"
            autoCorrect={false}
            component={FormFields.TextField}
            label={I18n.t('profile.user_info.gender')}
            validate={[required]}
          />
          <Field
            name="height"
            autoCorrect={false}
            keyboardType="numeric"
            component={FormFields.TextField}
            label={`${I18n.t('profile.user_info.height')} (cm)`}
            validate={[required]}
          />
          <Field
            name="weight"
            autoCorrect={false}
            keyboardType="numeric"
            component={FormFields.TextField}
            label={`${I18n.t('profile.user_info.weight')} (kg)`}
            validate={[required]}
          />
        </Block>
        <Block flex={false} style={styles.btnGroup}>
          <Button gradient style={styles.btnSend} onPress={_handleSubmit}>
            <Block center middle>
              <Text style={styles.labelSend}>{I18n.t('common.save')}</Text>
            </Block>
          </Button>
          <Button shadow style={styles.btnCancel} onPress={_onCancel}>
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
  const _dob = get(state, 'me.data.user.dob');
  return {
    initialValues: {
      username: get(state, 'me.data.user.username'),
      firstName: get(state, 'me.data.user.firstName'),
      lastName: get(state, 'me.data.user.lastName'),
      dob: isEmpty(_dob) ? new Date() : moment(_dob).toDate(),
      gender: isEmpty(get(state, 'me.data.user.lastName')) ? 'Male' : 'Female',
      height: `${get(state, 'me.data.user.height', 0)}`,
      weight: `${get(state, 'me.data.user.weight', 0)}`,
    },
  };
};

export default connect(mapStateToProps)(
  reduxForm({
    form: Enum.ReduxFormName.UPDATE_INFO,
  })(withNavigation(UserInfo)),
);
