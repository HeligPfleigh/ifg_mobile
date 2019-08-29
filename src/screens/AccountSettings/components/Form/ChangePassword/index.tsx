import React, { Component } from 'react';
import { Field, reduxForm, InjectedFormProps, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { TextField, FormValidator as validator } from '../../../../../components/FormFields';

import styles from './styles';
import { Block } from '../../../../../components';

const formName = 'change-password';
const selector = formValueSelector(formName);

interface IProps extends InjectedFormProps {
  newPassword?: any;
}
class ChangePassword extends Component<IProps> {
  compareValue = (value: any) => {
    const { newPassword } = this.props;
    return validator.comparePassword(newPassword, value);
  };

  onSubmitPassword = (values: any) => {
    /* eslint-disable-next-line */
    console.log('on submit form values: ', values);
    // this.password.blur();
  };

  render() {
    const { required, minLength4, maxLength120, password } = validator;
    const { handleSubmit } = this.props;
    return (
      <Block flex={false} style={styles.container}>
        <Field
          name="currentPass"
          label="Current password"
          component={TextField}
          secureTextEntry
          autoCorrect={false}
          characterRestriction={120}
          validate={[required, minLength4, maxLength120, password]}
        />
        <Field
          name="newPassword"
          label="New password"
          component={TextField}
          secureTextEntry
          autoCorrect={false}
          characterRestriction={120}
          validate={[required, minLength4, maxLength120, password]}
        />
        <Field
          name="newPassConfirm"
          label="Confirm new password"
          component={TextField}
          returnKeyType="done"
          secureTextEntry
          enablesReturnKeyAutomatically
          onSubmitEditing={handleSubmit(this.onSubmitPassword)}
          autoCorrect={false}
          characterRestriction={120}
          validate={[required, minLength4, maxLength120, password, this.compareValue]}
        />
      </Block>
    );
  }
}

const mapStateToProps = (state: any) => ({
  newPassword: selector(state, 'newPassword'),
});

export default reduxForm({
  form: formName,
})(connect(mapStateToProps)(ChangePassword));
