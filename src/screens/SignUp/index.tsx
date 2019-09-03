import React, { useState } from 'react';
import { Text, KeyboardAvoidingView, TouchableOpacity, View } from 'react-native';
import I18n from 'i18n-js';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Content, Container } from 'native-base';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { TextField, FormValidator as validator } from '../../components/FormFields';
import { Block, Button, Header, Checkbox } from '../../components';
import { theme } from '../../constants';
import { styles } from './styles';
import NavigatorMap from '../../navigations/NavigatorMap';

interface SignUpProps {
  navigation: NavigationScreenProp<NavigationState>;
}

const formName = 'signup';

const SignUp: React.FC<any> = (props: SignUpProps) => {
  const { required, minLength4, maxLength120, password, email } = validator;
  const [input, setInput] = useState({ isCheck: false, username: '', email: '', password: '', retype: '' });

  const compareValue = () => {
    return validator.comparePassword(input.password, input.retype);
  };

  const _navigateToLicenseScreen = () => {
    props.navigation.navigate(NavigatorMap.License);
  };

  return (
    <Container>
      <Header />
      <Content contentContainerStyle={{ flex: 1 }}>
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <Block flex={1} margin={[0, theme.sizes.padding]}>
            <Block flex={3.5}>
              <Block flex={0.5} middle>
                <Text style={styles.title}>{I18n.t('signup.title')}</Text>
              </Block>
              <Block flex={2} margin={[theme.sizes.base, 0]}>
                <Block flex={1}>
                  <Field
                    nbTheme
                    name="username"
                    label={I18n.t('signup.username')}
                    component={TextField}
                    characterRestriction={120}
                    validate={[required, minLength4, maxLength120]}
                    tintColor={theme.colors.green}
                    props={{ value: input.username }}
                    onChangeText={(value: string) => setInput({ ...input, username: value })}
                  />
                </Block>
                <Block flex={1}>
                  <Field
                    name="email"
                    label={I18n.t('signup.email')}
                    component={TextField}
                    characterRestriction={120}
                    validate={[required, minLength4, maxLength120, email]}
                    tintColor={theme.colors.green}
                    props={{ value: input.email }}
                    onChangeText={(value: string) => setInput({ ...input, email: value })}
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
                    validate={[required, minLength4, maxLength120, password]}
                    tintColor={theme.colors.green}
                    props={{ value: input.password }}
                    onChangeText={(value: string) => setInput({ ...input, password: value })}
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
                    validate={[required, minLength4, maxLength120, password, compareValue]}
                    tintColor={theme.colors.green}
                    props={{ value: input.retype }}
                    onChangeText={(value: string) => setInput({ ...input, retype: value })}
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
        </KeyboardAvoidingView>
      </Content>
    </Container>
  );
};

export default connect()(reduxForm({ form: formName })(SignUp));
