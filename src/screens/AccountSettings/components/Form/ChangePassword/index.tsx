import React from 'react';
import { connect } from 'react-redux';
import { Keyboard } from 'react-native';
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
  loading?: any;
}

class ChangePassword extends React.Component<IProps, IStates> {
  state = {
    loading: false,
  };

  // func use comfirm new password
  _compareValue = (value: any) => {
    const { newPassword } = this.props;
    return FormFields.FormValidator.comparePassword(newPassword, value);
  };

  // handle submit form
  _handleSubmit = async (values: any) => {
    try {
      this.setState(
        () => ({ loading: true }),
        async () => {
          await Keyboard.dismiss();
          await api.changePassword(values);
          await this.props.reset();
        },
      );
    } catch (err) {
      // TODO
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { loading } = this.state;
    const { handleSubmit } = this.props;
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
          label={I18n.t('profile.account_settings.confirm_new_pwd')}
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
