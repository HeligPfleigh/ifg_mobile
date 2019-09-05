import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import I18n from 'i18n-js';
import { connect } from 'react-redux';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { ReduxFormName } from '../../constants/enum';
import { TextField, FormValidator as validator } from '../../components/FormFields';
import { Block, Button } from '../../components';
import { theme } from '../../constants';
import { styles } from './styles';
import NavigatorMap from '../../navigations/NavigatorMap';

interface SignInProps extends InjectedFormProps, NavigationInjectedProps {}

const SignIn: React.FC<SignInProps> = (props: SignInProps) => {
  const { required, minLength4, minLength8, maxLength120, password } = validator;

  const _navigateToForgotPasswordScreen = () => {
    props.navigation.navigate(NavigatorMap.ForgotPassword);
  };

  return (
    <React.Fragment>
      <Block margin={[0, theme.sizes.padding]}>
        <Block flex={1}>
          <Block flex={0.5} middle>
            <Text style={styles.title}>{I18n.t('signin.title')}</Text>
          </Block>
          <Block flex={2}>
            <Block flex={2}>
              <Block bottom margin={[theme.sizes.margin * 2, 0]}>
                <Block flex={1} middle>
                  <Field
                    name="username"
                    label={I18n.t('signin.username')}
                    component={TextField}
                    characterRestriction={120}
                    validate={[required, minLength4, maxLength120]}
                    tintColor={theme.colors.green}
                  />
                </Block>
                <Block flex={1} middle>
                  <Field
                    name="password"
                    label={I18n.t('signin.password')}
                    secureTextEntry
                    component={TextField}
                    autoCorrect={false}
                    characterRestriction={120}
                    validate={[required, minLength8, maxLength120, password]}
                    tintColor={theme.colors.green}
                  />
                </Block>
              </Block>
            </Block>
            <Block flex={1}>
              <Block flex={0.5}>
                <Button gradient>
                  <Block center middle>
                    <Text style={styles.textButton}>{I18n.t('signin.submit')}</Text>
                  </Block>
                </Button>
              </Block>
              <Block flex={0.5} center middle>
                <TouchableOpacity onPress={_navigateToForgotPasswordScreen}>
                  <Text style={styles.textLink}>{I18n.t('signin.forgot')}</Text>
                </TouchableOpacity>
              </Block>
            </Block>
          </Block>
        </Block>
        <Block flex={1} />
      </Block>
    </React.Fragment>
  );
};

export default connect()(reduxForm({ form: ReduxFormName.SIGN_IN })(withNavigation(SignIn)));
