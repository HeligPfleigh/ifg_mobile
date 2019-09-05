import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import I18n from 'i18n-js';
import { connect } from 'react-redux';
import { Field, reduxForm, InjectedFormProps, formValueSelector } from 'redux-form';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { TextField, FormValidator as validator } from '../../components/FormFields';
import { Block, Button, Checkbox } from '../../components';
import { theme } from '../../constants';
import { styles } from './styles';
import NavigatorMap from '../../navigations/NavigatorMap';
import { ReduxFormName } from '../../constants/enum';

interface SignUpProps extends InjectedFormProps, NavigationInjectedProps {
  password?: string;
}

const SignUp: React.FC<SignUpProps> = (props: SignUpProps) => {
  const { required, minLength4, minLength8, maxLength120, password, email } = validator;
  const [input, setInput] = useState({ isCheck: false });

  const compareValue = (value: string) => {
    return validator.comparePassword(props.password, value);
  };

  const _navigateToLicenseScreen = () => {
    props.navigation.navigate(NavigatorMap.License);
  };

  return (
    <React.Fragment>
      <Block margin={[0, theme.sizes.padding]}>
        <Block flex={5}>
          <Block flex={0.5} middle>
            <Text style={styles.title}>{I18n.t('signup.title')}</Text>
          </Block>
          <Block flex={2} margin={[theme.sizes.base, 0]}>
            <Block flex={1}>
              <Field
                name="username"
                label={I18n.t('signup.username')}
                component={TextField}
                characterRestriction={120}
                validate={[required, minLength4, maxLength120]}
                tintColor={theme.colors.green}
              />
            </Block>
            <Block flex={1}>
              <Field
                name="email"
                label={I18n.t('signup.email')}
                component={TextField}
                characterRestriction={120}
                validate={[required, minLength8, maxLength120, email]}
                tintColor={theme.colors.green}
              />
            </Block>
            <Block flex={1}>
              <Field
                name="password"
                label={I18n.t('signup.password')}
                secureTextEntry
                component={TextField}
                autoCorrect={false}
                characterRestriction={120}
                validate={[required, minLength8, maxLength120, password]}
                tintColor={theme.colors.green}
              />
            </Block>
            <Block flex={1}>
              <Field
                name="confirm"
                label={I18n.t('signup.confirm')}
                secureTextEntry
                component={TextField}
                autoCorrect={false}
                characterRestriction={120}
                validate={[required, minLength8, maxLength120, password, compareValue]}
                tintColor={theme.colors.green}
              />
            </Block>
            <Block flex={0.5} middle>
              <View style={styles.confirm}>
                <View style={styles.box}>
                  <Checkbox
                    size={22}
                    checked={input.isCheck}
                    onPress={() => setInput({ ...input, isCheck: !input.isCheck })}
                  />
                </View>
                <Text style={styles.textConfirm}>{I18n.t('signup.agree')}</Text>
                <TouchableOpacity onPress={_navigateToLicenseScreen}>
                  <Text style={styles.textLink}>{I18n.t('signup.terms')}</Text>
                </TouchableOpacity>
              </View>
            </Block>
            <Block flex={0.8} bottom>
              <Button gradient>
                <Block center middle>
                  <Text style={styles.textButton}>{I18n.t('signup.submit')}</Text>
                </Block>
              </Button>
            </Block>
          </Block>
        </Block>
        <Block flex={1} />
      </Block>
    </React.Fragment>
  );
};

const mapStateToProps = (state: T) => ({
  password: formValueSelector(ReduxFormName.SIGN_UP)(state, 'password'),
});

export default connect(mapStateToProps)(reduxForm({ form: ReduxFormName.SIGN_UP })(withNavigation(SignUp)));
