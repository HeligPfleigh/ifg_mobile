import React from 'react';
import { Text, TouchableOpacity, View, KeyboardAvoidingView, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, InjectedFormProps } from 'redux-form';
import { ScrollView } from 'react-native-gesture-handler';
import { noop } from 'lodash';
import get from 'lodash/get';
import { NavigationScreenProps } from 'react-navigation';
import NavigatorMap from '../../navigations/NavigatorMap';
import I18n from '../../core/i18n';
import { showModal, login } from '../../store/actions';
import { TextField, FormValidator as validator } from '../../components/FormFields';
import { Block, Button, Checkbox, Toast, Loader, ContactMail } from '../../components';
import { theme, Enum } from '../../constants';
import api from '../../core/api';
import { styles } from './styles';
import { ReduxFormName } from '../../constants/enum';

interface SignUpProps extends InjectedFormProps, NavigationScreenProps {
  dispatch: any;
  password: any;
  authToken: any;
}

interface SignUpStates {
  isChecked: boolean;
  loading: boolean;
}

class SignUp extends React.Component<SignUpProps, SignUpStates> {
  constructor(props: SignUpProps) {
    super(props);
    this.state = {
      isChecked: false,
      loading: false,
    };
  }

  componentDidUpdate() {
    const { authToken, navigation } = this.props;
    if (authToken) {
      navigation.navigate(NavigatorMap.Home);
    }
  }

  _showLicenseModal = () => this.props.dispatch(showModal({ onModalPress: noop, modalType: Enum.ModalType.LICENSE }));

  _compareValue = (value: string) => {
    return validator.comparePassword(this.props.password, value);
  };

  _onSignup = async (value: any) => {
    Keyboard.dismiss();
    this.setState({ loading: true });
    const { dispatch } = this.props;
    try {
      const { username, email, password } = value;
      const bundleData = { username, email, password };
      await api.signup(bundleData);
      Toast.success(I18n.t('signup.success'));
      dispatch(login(email, password));
    } catch (err) {
      let message;
      const statusCode = get(err, 'response.data.error.statusCode', 400);
      if (statusCode === 409) {
        message = I18n.t('signup.email_not_available');
      } else {
        message = get(err, 'response.data.error.message', err.message);
      }
      Toast.error(message);
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { required, minLength8, maxLength120, password, email } = validator;
    const { isChecked, loading } = this.state;
    const { handleSubmit } = this.props;
    return (
      <React.Fragment>
        <Loader loading={loading} />
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Block flex={false} style={{ aspectRatio: 2.8 }} middle>
              <Text style={styles.title}>{I18n.t('signup.title')}</Text>
            </Block>
            <Field
              name="username"
              label={I18n.t('signup.username')}
              component={TextField}
              characterRestriction={120}
              validate={[required, minLength8, maxLength120]}
              tintColor={theme.colors.green}
            />
            <Field
              name="email"
              label={I18n.t('signup.email')}
              component={TextField}
              characterRestriction={120}
              validate={[required, minLength8, maxLength120, email]}
              tintColor={theme.colors.green}
            />
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
            <Field
              name="confirm"
              label={I18n.t('signup.confirm')}
              secureTextEntry
              component={TextField}
              autoCorrect={false}
              characterRestriction={120}
              validate={[required, this._compareValue]}
              tintColor={theme.colors.green}
            />
            <View style={styles.confirm}>
              <View style={styles.box}>
                <Checkbox size={25} checked={isChecked} onPress={() => this.setState({ isChecked: !isChecked })} />
              </View>
              <Text style={styles.textConfirm}>{I18n.t('signup.agree')}</Text>
              <TouchableOpacity onPress={this._showLicenseModal}>
                <Text style={styles.textLink}>{I18n.t('signup.terms')}</Text>
              </TouchableOpacity>
            </View>
            <Button style={styles.button} gradient disabled={!isChecked} onPress={handleSubmit(this._onSignup)}>
              <Block center middle>
                <Text style={styles.textButton}>{I18n.t('signup.submit')}</Text>
              </Block>
            </Button>
            <View style={styles.contact}>
              <ContactMail />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: any) => ({
  password: formValueSelector(ReduxFormName.SIGN_UP)(state, 'password'),
  authToken: state.auth.token,
});

export default connect(mapStateToProps)(reduxForm({ form: ReduxFormName.SIGN_UP })(SignUp as any));
