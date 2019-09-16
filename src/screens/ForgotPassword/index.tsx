import React, { useState } from 'react';
import { Text } from 'react-native';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import NavigatorMap from '../../navigations/NavigatorMap';
import { ReduxFormName } from '../../constants/enum';
import { TextField, FormValidator as validator } from '../../components/FormFields';
import { theme } from '../../constants';
import I18n from '../../core/i18n';
import api from '../../core/api';
import { Block, Button, Loader, Toast, ContactMail } from '../../components';
import { styles } from './styles';

const ForgotPassword: React.FC = (props: InjectedFormProps | any) => {
  const { required, minLength4, maxLength120, email } = validator;
  const { handleSubmit } = props;
  const [loading, setLoading] = useState(false);

  const onPressSubmit = async (value: any) => {
    setLoading(true);
    try {
      await api.forgotPwd(value);
      Toast.success(I18n.t('forgot.message'));
      props.navigation.navigate(NavigatorMap.Welcome);
    } catch (err) {
      Toast.error(err.message);
    }
    setLoading(false);
  };

  return (
    <React.Fragment>
      <Loader loading={loading} />
      <Block margin={[0, theme.sizes.padding]}>
        <Block flex={false} style={{ aspectRatio: 4.5 }} middle>
          <Text style={styles.title}>{I18n.t('forgot.title')}</Text>
        </Block>
        <Block flex={false} style={{ aspectRatio: 4.5 }} middle>
          <Text style={styles.paragraph}>{I18n.t('forgot.paragraph')}</Text>
        </Block>
        <Block flex={false} style={{ aspectRatio: 3 }}>
          <Field
            name="email"
            label={I18n.t('forgot.email')}
            component={TextField}
            autoCorrect={false}
            characterRestriction={120}
            validate={[required, minLength4, maxLength120, email]}
            tintColor={theme.colors.green}
          />
        </Block>
        <Block flex={false} style={{ aspectRatio: 5 }}>
          <Button gradient onPress={handleSubmit(onPressSubmit)}>
            <Block center middle>
              <Text style={styles.textButton}>{I18n.t('forgot.submit')}</Text>
            </Block>
          </Button>
        </Block>
        <ContactMail />
      </Block>
    </React.Fragment>
  );
};

export default reduxForm({ form: ReduxFormName.FORGOT_PASSWORD })(ForgotPassword);
