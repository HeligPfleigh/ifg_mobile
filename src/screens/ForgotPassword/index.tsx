import React, { useState } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { TextField, FormValidator as validator } from '../../components/FormFields';
import { theme } from '../../constants';
import I18n from '../../core/i18n';
import { Block, Button } from '../../components';
import { styles } from './styles';

const formName = 'forgot-password';

const ForgotPassword: React.FC = () => {
  const { required, minLength4, maxLength120, email } = validator;

  return (
    <React.Fragment>
      <Block flex={1} margin={[0, theme.sizes.padding]}>
        <Block flex={0.5} middle>
          <Text style={styles.title}>{I18n.t('forgot.title')}</Text>
        </Block>
        <Block flex={0.5} middle>
          <Text style={styles.paragraph}>{I18n.t('forgot.paragraph')}</Text>
        </Block>
        <Block flex={1}>
          <Block flex={1} middle>
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
          <Block flex={0.5} middle>
            <Button gradient>
              <Block center middle>
                <Text style={styles.textButton}>{I18n.t('forgot.submit')}</Text>
              </Block>
            </Button>
          </Block>
        </Block>
      </Block>
      <Block flex={1.5} />
    </React.Fragment>
  );
};

export default connect()(reduxForm({ form: formName })(ForgotPassword));
