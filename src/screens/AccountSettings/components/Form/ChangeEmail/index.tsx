import React from 'react';
import { Dispatch } from 'redux';
import get from 'lodash/get';
import pick from 'lodash/pick';
import isEqual from 'lodash/isEqual';
import { connect } from 'react-redux';
import { Keyboard } from 'react-native';
import { Field, reduxForm, InjectedFormProps, formValueSelector } from 'redux-form';

import api from '../../../../../core/api';
import I18n from '../../../../../core/i18n';
import { Enum, theme } from '../../../../../constants';
import { Block, Loader, FormFields, Toast } from '../../../../../components';
import { me } from '../../../../../store/actions';
import styles from './styles';

interface IStates {
  loading?: boolean;
}

interface IProps extends InjectedFormProps {
  currentEmail?: any;
  dispatch: Dispatch<any>;
}

class ChangeEmail extends React.Component<IProps, IStates> {
  state = {
    loading: false,
  };

  // func use comfirm new password
  _compareValue = (value: any) => {
    const { currentEmail } = this.props;
    return isEqual(value, currentEmail) ? I18n.t('messages.require_different') : undefined;
  };

  // handle submit form
  _handleSubmit = async (values: any) => {
    try {
      // prepare form data
      const data = pick(values, ['password', 'email']);
      // display loader component
      await this.setState({ loading: true });
      // hide keyboard
      await Keyboard.dismiss();
      // call backend api change email
      await api.changeEmail(data);
      // clear form values
      await this.props.reset();
      // reload user infomation
      await this.props.dispatch(me());
      await this.props.change('currentEmail', data.email);
      // display Toast
      Toast.success(I18n.t('profile.account_settings.change_email_success'));
    } catch (err) {
      // TODO
      const statusCode = get(err, 'response.data.error.statusCode', 400);
      this.setState(
        () => ({ loading: false }),
        () =>
          Toast.error(
            statusCode === 401
              ? I18n.t('errors.change_email.password_not_match')
              : I18n.t('profile.account_settings.change_email_error'),
          ),
      );
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { loading } = this.state;
    const { handleSubmit } = this.props;
    const { required, minLength8, email } = FormFields.FormValidator;
    return (
      <Block flex={false} style={styles.container}>
        <Loader loading={loading} />
        <Field
          disabled
          name="currentEmail"
          tintColor={theme.colors.green}
          component={FormFields.TextField}
          label={I18n.t('profile.account_settings.current_email')}
        />
        <Field
          name="email"
          autoCorrect={false}
          tintColor={theme.colors.green}
          component={FormFields.TextField}
          validate={[required, email, this._compareValue]}
          label={I18n.t('profile.account_settings.new_email')}
        />
        <Field
          name="password"
          secureTextEntry
          returnKeyType="done"
          autoCorrect={false}
          enablesReturnKeyAutomatically
          tintColor={theme.colors.green}
          component={FormFields.TextField}
          validate={[required, minLength8]}
          label={I18n.t('profile.account_settings.confirm_with_password')}
          onSubmitEditing={handleSubmit(this._handleSubmit)}
        />
      </Block>
    );
  }
}

const selector = formValueSelector(Enum.ReduxFormName.CHANGE_EMAIL);

const mapStateToProps = (state: any) => ({
  currentEmail: selector(state, 'currentEmail'),
  initialValues: {
    currentEmail: get(state, 'me.data.user.email', 'info@example.com'),
  },
});

export default connect(mapStateToProps)(
  reduxForm({
    form: Enum.ReduxFormName.CHANGE_EMAIL,
  })(ChangeEmail as any),
);
