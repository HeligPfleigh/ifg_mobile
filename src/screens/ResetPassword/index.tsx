import React, { Component } from 'react';
import { Text } from 'react-native';
import { Field, reduxForm, InjectedFormProps, formValueSelector } from 'redux-form';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import api from '../../core/api';
import NavigatorMap from '../../navigations/NavigatorMap';
import I18n from '../../core/i18n';
import { TextField, FormValidator as validator } from '../../components/FormFields';
import { Block, Button, Loader, ContactMail, Toast } from '../../components';
import { theme, Enum } from '../../constants';
import { styles } from './styles';
import { AppState } from '../../store/types';

interface ResetPasswordProps extends InjectedFormProps, NavigationScreenProps {
  password: string;
}

class ResetPassword extends Component<ResetPasswordProps> {
  state = {
    loading: false,
  };

  componentDidMount() {
    SplashScreen.hide();
  }

  _compareValue = (value: string) => {
    return validator.comparePassword(this.props.password, value);
  };

  _submit = (value: any) => {
    const { navigation } = this.props;
    const resetPasswordToken = navigation.getParam(Enum.NavigationParamsName.RESET_PASSWORD_TOKEN, '');
    this.setState({ loading: true }, async () => {
      try {
        await api.resetPwd(value, resetPasswordToken);
        Toast.success(I18n.t('reset_pwd.success'));
        navigation.navigate(NavigatorMap.SignIn);
      } catch (err) {
        Toast.error(I18n.t('errors.reset_pwd'));
      } finally {
        this.setState({ loading: false });
      }
    });
  };

  render() {
    const { required, minLength8, maxLength120, password } = validator;
    const { handleSubmit } = this.props;
    const { loading } = this.state;
    return (
      <React.Fragment>
        <Loader loading={loading} />
        <Block margin={[0, theme.sizes.padding]}>
          <Block flex={false} style={{ aspectRatio: 4.5 }} middle>
            <Text style={styles.title}>{I18n.t('reset_pwd.title')}</Text>
          </Block>
          <Block flex={false} style={{ aspectRatio: 1.5 }}>
            <Block bottom margin={[theme.sizes.margin * 2, 0]}>
              <Field
                name="password"
                label={I18n.t('reset_pwd.password')}
                secureTextEntry
                component={TextField}
                autoCorrect={false}
                characterRestriction={120}
                validate={[required, minLength8, maxLength120, password]}
                tintColor={theme.colors.green}
              />
              <Field
                name="confirmPwd"
                label={I18n.t('reset_pwd.confirmPwd')}
                secureTextEntry
                component={TextField}
                autoCorrect={false}
                characterRestriction={120}
                validate={[required, this._compareValue]}
                tintColor={theme.colors.green}
              />
            </Block>
          </Block>
          <Block flex={false} style={{ aspectRatio: 2.8 }}>
            <Block>
              <Button gradient onPress={handleSubmit(this._submit)}>
                <Block center middle>
                  <Text style={styles.textButton}>{I18n.t('common.submit')}</Text>
                </Block>
              </Button>
            </Block>
          </Block>
          <ContactMail />
        </Block>
      </React.Fragment>
    );
  }
}

export default connect((state: AppState) => ({
  initialValues: {
    password: '',
    confirmPwd: '',
  },
  password: formValueSelector(Enum.ReduxFormName.RESET_PASSWORD)(state, 'password'),
}))(reduxForm({ form: Enum.ReduxFormName.RESET_PASSWORD })(ResetPassword as any));
