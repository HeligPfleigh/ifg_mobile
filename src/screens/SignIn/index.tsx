import React, { useEffect } from 'react';
import { Text, TouchableOpacity, Keyboard } from 'react-native';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { useDispatch, useSelector, connect } from 'react-redux';
import get from 'lodash/get';
import I18n from '../../core/i18n';
import { login, resetLoginError } from '../../store/actions';
import { TextField, FormValidator as validator } from '../../components/FormFields';
import { Block, Button, Loader, ContactMail, Toast } from '../../components';
import { theme, Enum } from '../../constants';
import { styles } from './styles';
import NavigatorMap from '../../navigations/NavigatorMap';
import { AppState } from '../../store/types';
import { authorizeApi } from '../../core/api';

interface SignInProps extends InjectedFormProps, NavigationInjectedProps {}

const SignIn: React.FC<SignInProps> = (props: SignInProps) => {
  const { required, minLength4, minLength8, maxLength120, email } = validator;
  const dispatch = useDispatch();
  const authToken = useSelector((state: AppState) => state.auth.token);
  const isRequesting = useSelector((state: AppState) => state.auth.isRequesting);
  const signInErr = useSelector((state: AppState) => state.auth.error);

  // navigate to Home after login
  if (authToken) {
    authorizeApi(authToken);
    props.navigation.navigate(NavigatorMap.Home);
  }

  // toast error
  if (signInErr) {
    const statusCode = get(signInErr, 'statusCode', 400);
    if (statusCode === 401 || statusCode === 404) {
      Toast.error(I18n.t('errors.sign_in_fail'));
    } else {
      Toast.error(I18n.t('errors.unexpected'));
    }
  }

  useEffect(() => {
    return () => {
      dispatch(resetLoginError());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _navigateToForgotPasswordScreen = () => {
    props.navigation.navigate(NavigatorMap.ForgotPassword);
  };

  const submit = (values: any) => {
    const { email: _email, password: pwd } = values;
    Keyboard.dismiss();
    dispatch(login(_email, pwd));
  };

  const { handleSubmit } = props;

  return (
    <React.Fragment>
      <Loader loading={isRequesting} />
      <Block margin={[0, theme.sizes.padding]}>
        <Block flex={false} style={{ aspectRatio: 4.5 }} middle>
          <Text style={styles.title}>{I18n.t('signin.title')}</Text>
        </Block>
        <Block flex={false} style={{ aspectRatio: 1.5 }}>
          <Block bottom margin={[theme.sizes.margin * 2, 0]}>
            <Field
              name="email"
              label={I18n.t('signin.email')}
              component={TextField}
              characterRestriction={120}
              validate={[required, minLength4, email]}
              tintColor={theme.colors.green}
            />
            <Field
              name="password"
              label={I18n.t('signin.password')}
              secureTextEntry
              component={TextField}
              autoCorrect={false}
              characterRestriction={120}
              validate={[required, minLength8, maxLength120]}
              tintColor={theme.colors.green}
            />
          </Block>
        </Block>
        <Block flex={false} style={{ aspectRatio: 2.8 }}>
          <Block>
            <Button gradient onPress={handleSubmit(submit)}>
              <Block center middle>
                <Text style={styles.textButton}>{I18n.t('signin.submit')}</Text>
              </Block>
            </Button>
          </Block>
          <Block center middle>
            <TouchableOpacity onPress={_navigateToForgotPasswordScreen}>
              <Text style={styles.textLink}>{I18n.t('signin.forgot')}</Text>
            </TouchableOpacity>
          </Block>
        </Block>
        <ContactMail />
      </Block>
    </React.Fragment>
  );
};

export default connect(() => ({
  initialValues: {
    email: '',
    password: '',
  },
}))(reduxForm({ form: Enum.ReduxFormName.SIGN_IN })(withNavigation(SignIn)));
