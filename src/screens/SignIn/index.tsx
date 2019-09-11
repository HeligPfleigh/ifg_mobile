import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { useDispatch, useSelector, connect } from 'react-redux';
import I18n from '../../core/i18n';
import { login } from '../../store/actions';
import { TextField, FormValidator as validator } from '../../components/FormFields';
import { Block, Button } from '../../components';
import { theme, Enum } from '../../constants';
import { styles } from './styles';
import NavigatorMap from '../../navigations/NavigatorMap';
import { AppState } from '../../store/types';
import { authorizeApi } from '../../core/api';

interface SignInProps extends InjectedFormProps, NavigationInjectedProps {}

const SignIn: React.FC<SignInProps> = (props: SignInProps) => {
  const { required, minLength4, minLength8, maxLength120 } = validator;
  const dispatch = useDispatch();
  const authToken = useSelector((state: AppState) => state.auth.token);

  if (authToken) {
    authorizeApi(authToken);
    props.navigation.navigate(NavigatorMap.Home);
  }

  const _navigateToForgotPasswordScreen = () => {
    props.navigation.navigate(NavigatorMap.ForgotPassword);
  };

  const submit = (values: any) => {
    const { username, password: pwd } = values;
    dispatch(login(username, pwd));
  };

  const { handleSubmit } = props;

  return (
    <React.Fragment>
      <Block margin={[0, theme.sizes.padding]}>
        <Block flex={false} style={{ aspectRatio: 4.5 }} middle>
          <Text style={styles.title}>{I18n.t('signin.title')}</Text>
        </Block>
        <Block flex={false} style={{ aspectRatio: 1.5 }}>
          <Block bottom margin={[theme.sizes.margin * 2, 0]}>
            <Field
              name="username"
              label={I18n.t('signin.username')}
              component={TextField}
              characterRestriction={120}
              validate={[required, minLength4, maxLength120]}
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
      </Block>
    </React.Fragment>
  );
};

export default connect(() => ({
  initialValues: {
    username: 'user.demo',
    password: '12345678',
  },
}))(reduxForm({ form: Enum.ReduxFormName.SIGN_IN })(withNavigation(SignIn)));
