import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import I18n from 'i18n-js';
import { Container, Content } from 'native-base';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { TextField, FormValidator as validator } from '../../components/FormFields';
import { Block, Button, Header } from '../../components';
import { theme } from '../../constants';
import { styles } from './styles';
import NavigatorMap from '../../navigations/NavigatorMap';

interface SignInProps {
  navigation: NavigationScreenProp<NavigationState>;
}

const formName = 'signin';

const SignIn: React.FC<any> = (props: SignInProps) => {
  const { required, minLength4, maxLength120, password } = validator;
  const [input, setInput] = useState({ username: '', password: '' });

  const _navigateToForgotPasswordScreen = () => {
    props.navigation.navigate(NavigatorMap.ForgotPassword);
  };

  return (
    <Container>
      <Header />
      <Content contentContainerStyle={{ flex: 1 }}>
        <Block flex={1} margin={[0, theme.sizes.padding]}>
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
                      props={{ value: input.username }}
                      onChangeText={(value: string) => setInput({ ...input, username: value })}
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
                      validate={[required, minLength4, maxLength120, password]}
                      tintColor={theme.colors.green}
                      props={{ value: input.password }}
                      onChangeText={(value: string) => setInput({ ...input, password: value })}
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
      </Content>
    </Container>
  );
};

export default connect()(reduxForm({ form: formName })(SignIn));
