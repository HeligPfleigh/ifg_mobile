import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, InjectedFormProps } from 'redux-form';
import { Text, TextInput } from 'react-native';

import styles from './styles';
import I18n from '../../core/i18n';
import { Block } from '../../components';

const formName = 'update-user-info';

interface IProps extends InjectedFormProps {}

class UserInfo extends Component<IProps> {
  onSubmitPassword = (values: any) => {
    /* eslint-disable-next-line */
    console.log('on submit form values: ', values);
    // this.password.blur();
  };

  render() {
    return (
      <Block style={styles.container}>
        <Block flex={1} middle>
          <Block flex={false} center middle style={{ height: 65 }}>
            <Text style={styles.pageTitle}>{I18n.t('profile.account_contact_us.page_title')}</Text>
          </Block>
          <Block flex={1}>
            <Text style={styles.name}>{I18n.t('evaluate.step1.name')}</Text>
            <TextInput style={styles.input} onChangeText={() => {}} />
          </Block>
        </Block>
      </Block>
    );
  }
}

export default connect()(
  reduxForm({
    form: formName,
  })(UserInfo),
);
