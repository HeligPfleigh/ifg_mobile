import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { TextField, FormValidator as validator } from '../../../../../components/FormFields';

import styles from './styles';
import { theme } from '../../../../../constants';
import I18n from '../../../../../core/i18n';
import { Block } from '../../../../../components';

const formName = 'change-user-email';

interface IProps extends InjectedFormProps {
  currentEmail?: any;
}
class ChangeEmail extends Component<IProps> {
  onSubmitPassword = (values: any) => {
    /* eslint-disable-next-line */
    console.log('on submit form values: ', values);
    // this.password.blur();
  };

  render() {
    const { required, minLength4, maxLength120, password } = validator;
    const { currentEmail, handleSubmit } = this.props;
    return (
      <Block flex={false} style={styles.container}>
        <Field
          disabled
          name="currentEmail"
          value={currentEmail}
          component={TextField}
          characterRestriction={120}
          tintColor={theme.colors.green}
          label={I18n.t('profile.account_settings.current_email')}
        />
        <Field
          name="newUserEmail"
          component={TextField}
          autoCorrect={false}
          characterRestriction={120}
          tintColor={theme.colors.green}
          label={I18n.t('profile.account_settings.new_email')}
          validate={[required, minLength4, maxLength120]}
        />
        <Field
          name="currentPass"
          component={TextField}
          returnKeyType="done"
          secureTextEntry
          enablesReturnKeyAutomatically
          onSubmitEditing={handleSubmit(this.onSubmitPassword)}
          autoCorrect={false}
          characterRestriction={120}
          tintColor={theme.colors.green}
          label={I18n.t('profile.account_settings.confirm_with_password')}
          validate={[required, minLength4, maxLength120, password]}
        />
      </Block>
    );
  }
}

const mapStateToProps = () => ({
  initialValues: {
    currentEmail: 'yenpt18787@gmail.com',
  },
});

export default connect(mapStateToProps)(
  reduxForm({
    form: formName,
  })(ChangeEmail),
);
