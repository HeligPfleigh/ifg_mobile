import React from 'react';
import get from 'lodash/get';
import noop from 'lodash/noop';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { ScrollView } from 'react-navigation';
import { Text, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import I18n from '../../core/i18n';
import { Enum } from '../../constants';
import { showModal, logout } from '../../store/actions';
import NavigatorMap from '../../navigations/NavigatorMap';
import { Block, Button, Loader, FormFields, Toast } from '../../components';
import api from '../../core/api';
import { styles } from './styles';

interface IStates {
  loading?: boolean;
}

interface IProps extends InjectedFormProps, NavigationStackScreenProps {
  dispatch: Dispatch<any>;
}

class DeleteAccount extends React.Component<IProps, IStates> {
  state = {
    loading: false,
  };

  _handleSubmit = async (values: any) => {
    try {
      const { navigation, dispatch } = this.props;
      // hide keyboard
      await Keyboard.dismiss();
      // display loader component
      await this.setState({ loading: true });
      // Step 1: add reason delete account
      await api.giveFeedback({ subject: 'DELETE_ACCOUNT', ...values });
      // Step 2: Delete account
      await api.deleteAccount();
      // Step 3: logout action and navigation start screen
      navigation.navigate(NavigatorMap.Welcome);
      await dispatch(logout());
      this.setState({ loading: false });
      // Step 4: Show modal
      dispatch(
        showModal({
          modalType: Enum.ModalType.DELETE_ACCOUNT,
          onModalPress: noop,
        }),
      );
    } catch (err) {
      // TODO
      this.setState({ loading: false });
      const msg = get(err.response, 'data.error.message');
      if (!isEmpty(msg) && isEqual(msg, 'Current password mismatch.')) {
        Toast.error(I18n.t('profile.delete_account.current_password_mismatch'));
      } else {
        Toast.error(I18n.t('profile.delete_account.delete_action_error'));
      }
    }
  };

  // back button
  _handleCancel = () => this.props.navigation.goBack();

  render() {
    const { loading } = this.state;
    const { handleSubmit } = this.props;
    const { required, minLength8, maxLength120, maxLength500, password } = FormFields.FormValidator;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <Loader loading={loading} />
          <ScrollView showsVerticalScrollIndicator={false}>
            <Block flex={false}>
              <Block flex={false} center middle style={styles.titleWrapper}>
                <Text style={styles.pageTitle}>{I18n.t('profile.delete_account.page_title')}</Text>
                <Text style={styles.pageSubtitle}>{I18n.t('profile.delete_account.page_subtitle')}</Text>
              </Block>
              <Block flex={false}>
                <Text style={styles.fieldLabel}>{I18n.t('profile.delete_account.label_input')}</Text>
                <Field
                  label=""
                  name="message"
                  multiline
                  bordered
                  height={175}
                  labelHeight={0}
                  labelPadding={0}
                  activeLineWidth={1}
                  maxLength={500}
                  characterRestriction={500}
                  style={styles.textarea}
                  component={FormFields.TextField}
                  validate={[required, maxLength500]}
                />
              </Block>
              <Block flex={false}>
                <Text style={styles.fieldLabel}>{I18n.t('profile.account_settings.confirm_with_password')}</Text>
                <Field
                  label=""
                  name="password"
                  bordered
                  labelHeight={0}
                  labelPadding={0}
                  activeLineWidth={1}
                  secureTextEntry
                  autoCorrect={false}
                  style={styles.password}
                  component={FormFields.TextField}
                  validate={[required, minLength8, maxLength120, password]}
                />
              </Block>
            </Block>
            <Block flex={false}>
              <Button gradient style={styles.btnSend} onPress={handleSubmit(this._handleSubmit)}>
                <Block center middle>
                  <Text style={styles.labelSend}>{I18n.t('profile.delete_account.label_button')}</Text>
                </Block>
              </Button>
              <Button gradient style={styles.btnCancel} onPress={this._handleCancel}>
                <Block style={styles.btnCancelBody} center middle>
                  <Text style={styles.txtCancel}>{I18n.t('common.cancel')}</Text>
                </Block>
              </Button>
            </Block>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = (state: any) => ({
  initialValues: {
    currentEmail: get(state, 'me.data.user.email', 'info@example.com'),
  },
});

export default connect(mapStateToProps)(
  reduxForm({
    form: Enum.ReduxFormName.CHANGE_EMAIL,
  })(DeleteAccount as any),
);
