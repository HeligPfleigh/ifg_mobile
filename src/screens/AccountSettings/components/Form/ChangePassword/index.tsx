import React from 'react';
import { connect } from 'react-redux';
import { Keyboard } from 'react-native';
import Toast from 'react-native-root-toast';
import { Field, reduxForm, InjectedFormProps, formValueSelector } from 'redux-form';
import api from '../../../../../core/api';
import I18n from '../../../../../core/i18n';
import { Enum, theme } from '../../../../../constants';
import { Block, Loader, FormFields } from '../../../../../components';
import styles from './styles';

interface IProps extends InjectedFormProps {
  newPassword?: any;
}

interface IStates {
  loading?: boolean;
}

class ChangePassword extends React.Component<IProps, IStates> {
  toastr = null;

  state = {
    loading: false,
  };

  showToast = async ({ backgroundColor = theme.colors.black, message }: any) => {
    this.toastr = Toast.show(message, {
      shadow: false,
      animation: true,
      backgroundColor,
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
    });
  };

  // func use comfirm new password
  _compareValue = (value: any) => {
    const { newPassword } = this.props;
    return FormFields.FormValidator.comparePassword(newPassword, value);
  };

  // handle submit form
  _handleSubmit = async (values: any) => {
    try {
      await this.setState({ loading: true });
      await Keyboard.dismiss();
      await api.changePassword(values);
      await this.props.reset();
      await this.showToast({
        backgroundColor: theme.colors.green,
        message: I18n.t('profile.account_settings.change_pwd_success'),
      });
    } catch (err) {
      // TODO
      this.setState(
        () => ({ loading: false }),
        async () => {
          await this.showToast({
            backgroundColor: theme.colors.red,
            message: I18n.t('profile.account_settings.change_pwd_error'),
          });
        },
      );
    } finally {
      this.setState(
        () => ({ loading: false }),
        () => {
          setTimeout(() => {
            Toast.hide(this.toastr);
          }, 10000);
        },
      );
    }
  };

  render() {
    const { handleSubmit } = this.props;
    const { loading } = this.state;
    const { required, minLength8 } = FormFields.FormValidator;
    return (
      <Block flex={false} style={styles.container}>
        <Loader loading={loading} />
        <Field
          name="currentPwd"
          secureTextEntry
          autoCorrect={false}
          tintColor={theme.colors.green}
          component={FormFields.TextField}
          validate={[required, minLength8]}
          label={I18n.t('profile.account_settings.current_password')}
        />
        <Field
          name="newPwd"
          secureTextEntry
          autoCorrect={false}
          tintColor={theme.colors.green}
          component={FormFields.TextField}
          validate={[required, minLength8]}
          label={I18n.t('profile.account_settings.new_password')}
        />
        <Field
          name="confirmPwd"
          secureTextEntry
          returnKeyType="done"
          enablesReturnKeyAutomatically
          autoCorrect={false}
          tintColor={theme.colors.green}
          component={FormFields.TextField}
          validate={[required, minLength8, this._compareValue]}
          label={I18n.t('profile.account_settings.confirm_new_password')}
          onSubmitEditing={handleSubmit(this._handleSubmit)}
        />
      </Block>
    );
  }
}

const selector = formValueSelector(Enum.ReduxFormName.CHANGE_PASSWORD);

const mapStateToProps = (state: any) => ({
  newPassword: selector(state, 'newPwd'),
});

export default reduxForm({
  form: Enum.ReduxFormName.CHANGE_PASSWORD,
})(connect(mapStateToProps)(ChangePassword));
