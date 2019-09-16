import React from 'react';
import { Text, TouchableOpacity, View, KeyboardAvoidingView, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { withNavigation } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
import { noop } from 'lodash';
import I18n from '../../core/i18n';
import { showModal } from '../../store/actions';
import { TextField, FormValidator as validator } from '../../components/FormFields';
import { Block, Button, Checkbox, Toast, Loader } from '../../components';
import { theme, Enum } from '../../constants';
import api from '../../core/api';
import { styles } from './styles';
import { ReduxFormName } from '../../constants/enum';

interface SignUpProps {
  dispatch: any;
  password: any;
}

class SignUp extends React.Component<SignUpProps> {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
      loading: false,
    };
  }

  _showLicenseModal = () => this.props.dispatch(showModal({ onModalPress: noop, modalType: Enum.ModalType.LICENSE }));

  _compareValue = (value: string) => {
    return validator.comparePassword(this.props.password, value);
  };

  _onSignup = async value => {
    Keyboard.dismiss();
    this.setState({ loading: true });
    try {
      const { username, email, password } = value;
      const bundleData = { username, email, password };
      await api.signup(bundleData);
      Toast.success(I18n.t('signup.success'));
    } catch (err) {
      Toast.error(err.message);
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
          <ScrollView style={styles.container}>
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
              validate={[required, minLength8, maxLength120, password, this._compareValue]}
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
            <Button gradient disabled={!isChecked} onPress={handleSubmit(this._onSignup)}>
              <Block center middle>
                <Text style={styles.textButton}>{I18n.t('signup.submit')}</Text>
              </Block>
            </Button>
          </ScrollView>
        </KeyboardAvoidingView>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: any) => ({
  password: formValueSelector(ReduxFormName.SIGN_UP)(state, 'password'),
});

export default connect(mapStateToProps)(reduxForm({ form: ReduxFormName.SIGN_UP })(withNavigation(SignUp)));
