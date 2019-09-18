import React from 'react';
import moment from 'moment';
import { Dispatch } from 'redux';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import isUndefined from 'lodash/isUndefined';
import { connect } from 'react-redux';
import ActionSheet from 'react-native-actionsheet';
import ImagePicker from 'react-native-image-picker';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { NavigationScreenProps } from 'react-navigation';
import { View, Image, ScrollView, Text, KeyboardAvoidingView, Keyboard, TouchableOpacity } from 'react-native';

import styles from './styles';
import I18n from '../../core/i18n';
import { AppState } from '../../store/types';
import { DefaultAvatar, EditCircle } from '../../assets/images';
import { Enum, theme } from '../../constants';
import { Button, Block, FormFields, Loader, Toast } from '../../components';
import { me } from '../../store/actions';
import api, { IPhoto } from '../../core/api';

interface IUser {
  username?: string;
  firstName?: string;
  lastName?: string;
  DOB?: string;
  gender?: string;
  height?: number;
  weight?: number;
}

interface IProps extends InjectedFormProps, NavigationScreenProps {
  token: string;
  avatar?: string;
  initialValues: IUser;
  dispatch: Dispatch<any>;
}

interface IStates {
  loading: boolean;
}

class UserInfo extends React.Component<IProps, IStates> {
  // ActionSheet reference
  ActionSheet: any;

  // inner state component
  state = { loading: false };

  buttons = [
    I18n.t('profile.user_info.picker_modal.btn_camera'),
    I18n.t('profile.user_info.picker_modal.btn_photos'),
    I18n.t('profile.user_info.picker_modal.btn_cancel'),
  ];

  // datasource for dropdown
  genders = [
    { label: I18n.t('profile.user_info.male'), value: 'MALE' },
    { label: I18n.t('profile.user_info.female'), value: 'FEMALE' },
    { label: I18n.t('profile.user_info.other'), value: 'OTHER' },
  ];

  // default config for ChooseDateModal
  datePickerProps = {
    horizontal: true,
    scrollEnabled: true,
    pagingEnabled: true,
    calendarWidth: 320,
    dateRange: 120,
    maxDate: moment()
      .subtract(12, 'years')
      .format('YYYY-MM-DD'),
  };

  _showActionSheet = () => this.ActionSheet.show();

  _changeAvatarProcess = async (source: IPhoto) => {
    if (source.error) {
      Toast.error(I18n.t('profile.user_info.choose_image_error'));
    } else if (!source.didCancel) {
      try {
        // showing loader component
        this.setState({ loading: true });
        await api.changeAvatar(source);
        Toast.success(I18n.t('profile.user_info.change_avatar_success'));
      } catch {
        Toast.error(I18n.t('profile.user_info.change_avatar_error'));
      } finally {
        await this.props.dispatch(me());
        this.setState({ loading: false });
      }
    }
  };

  _handleActionModal = (index: number) => {
    const options = {
      maxWidth: 320,
      maxHeight: 320,
    };
    switch (index) {
      case 0:
        // Launch Camera:
        ImagePicker.launchCamera(options, this._changeAvatarProcess);
        break;
      case 1:
        // Open Image Library:
        ImagePicker.launchImageLibrary(options, this._changeAvatarProcess);
        break;
    }
  };

  // back button
  _handleCancel = () => this.props.navigation.goBack();

  // handle submit form
  _handleSubmit = async (values: IUser) => {
    try {
      // hide keyboard
      Keyboard.dismiss();
      // showing loader component
      this.setState({ loading: true });
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
      Toast.success(I18n.t('profile.user_info.change_info_success'));
    } catch (err) {
      // TODO
      Toast.error(I18n.t('profile.user_info.change_info_error'));
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { loading } = this.state;
    const { handleSubmit } = this.props;
    const avatar = get(this.props, 'avatar', undefined);
    const { required, maxLength120, hasWhiteSpace, hasSpecialChart } = FormFields.FormValidator;

    return (
      <React.Fragment>
        <ActionSheet
          cancelButtonIndex={2}
          options={this.buttons}
          ref={o => (this.ActionSheet = o)}
          title={I18n.t('profile.user_info.picker_modal.title')}
          onPress={this._handleActionModal}
        />
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <Loader loading={loading} />
          <ScrollView showsVerticalScrollIndicator={false}>
            <Block flex={2} center middle>
              <TouchableOpacity onPress={this._showActionSheet} style={styles.avatar}>
                <Image source={!isEmpty(avatar) ? { uri: avatar } : DefaultAvatar} style={styles.image} />
                <View style={styles.edit}>
                  <EditCircle />
                </View>
              </TouchableOpacity>
            </Block>
            <Block flex={false}>
              <Field
                name="username"
                tintColor={theme.colors.green}
                style={{ textAlign: 'center' }}
                component={FormFields.TextField}
                validate={[required, hasWhiteSpace, hasSpecialChart, maxLength120]}
              />
            </Block>
            <Block flex={5} style={styles.content}>
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
                datePickerProps={this.datePickerProps}
                label={I18n.t('profile.user_info.dob')}
              />
              <Field
                name="gender"
                datasource={this.genders}
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
            <Block flex={false}>
              <Button gradient style={styles.btnSend} onPress={handleSubmit(this._handleSubmit)}>
                <Block center middle>
                  <Text style={styles.labelSend}>{I18n.t('common.save')}</Text>
                </Block>
              </Button>
              <Button gradient style={styles.btnCancel} onPress={this._handleCancel}>
                <Block style={styles.btnCancelBody} center middle>
                  <Text style={styles.txtCancel}>{I18n.t('common.cancel')}</Text>
                </Block>
              </Button>
            </Block>
          </ScrollView>
        </KeyboardAvoidingView>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  // user dob
  const _dob = get(state, 'me.data.user.DOB');
  const dateDefault = moment().subtract(12, 'years');
  return {
    avatar: get(state, 'me.data.user.avatar'),
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
  })(UserInfo as any),
);
