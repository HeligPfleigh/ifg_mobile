import React, { useState } from 'react';
import { Text, TouchableOpacity, View, KeyboardAvoidingView } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { Field, reduxForm, InjectedFormProps, formValueSelector } from 'redux-form';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
import { noop } from 'lodash';
import I18n from '../../core/i18n';
import { showModal } from '../../store/actions';
import { TextField, FormValidator as validator } from '../../components/FormFields';
import { Block, Button, Checkbox } from '../../components';
import { theme, Enum } from '../../constants';
import { styles } from './styles';
import { ReduxFormName } from '../../constants/enum';

interface SignUpProps extends InjectedFormProps, NavigationInjectedProps {
  password?: string;
}

const SignUp: React.FC<SignUpProps> = (props: SignUpProps) => {
  const { required, minLength4, minLength8, maxLength120, password, email } = validator;
  const [input, setInput] = useState({ isCheck: false });
  const dispatch = useDispatch();

  const compareValue = (value: string) => {
    return validator.comparePassword(props.password, value);
  };

  const showLicenseModal = () => {
    dispatch(showModal({ onModalPress: noop, modalType: Enum.ModalType.LICENSE }));
  };

  return (
    <React.Fragment>
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
            validate={[required, minLength4, maxLength120]}
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
            validate={[required, minLength8, maxLength120, password, compareValue]}
            tintColor={theme.colors.green}
          />
          <View style={styles.confirm}>
            <View style={styles.box}>
              <Checkbox
                size={22}
                checked={input.isCheck}
                onPress={() => setInput({ ...input, isCheck: !input.isCheck })}
              />
            </View>
            <Text style={styles.textConfirm}>{I18n.t('signup.agree')}</Text>
            <TouchableOpacity onPress={showLicenseModal}>
              <Text style={styles.textLink}>{I18n.t('signup.terms')}</Text>
            </TouchableOpacity>
          </View>
          <Button gradient>
            <Block center middle>
              <Text style={styles.textButton}>{I18n.t('signup.submit')}</Text>
            </Block>
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </React.Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  password: formValueSelector(ReduxFormName.SIGN_UP)(state, 'password'),
});

export default connect(mapStateToProps)(reduxForm({ form: ReduxFormName.SIGN_UP })(withNavigation(SignUp)));
