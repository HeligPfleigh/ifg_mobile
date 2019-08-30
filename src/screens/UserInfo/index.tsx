import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { View, Image, ScrollView } from 'react-native';

import styles from './styles';
import I18n from '../../core/i18n';
import { DefaultAvatar } from '../../assets/images';
import { Block, FormFields } from '../../components';

const formName = 'update-user-info';

interface IProps extends InjectedFormProps {
  avatar?: any;
  username?: any;
  firstName?: any;
  lastName?: any;
  dob?: any;
  gender?: any;
  height?: any;
  weight?: any;
}
class UserInfo extends Component<IProps> {
  onSubmitPassword = (values: any) => {
    /* eslint-disable-next-line */
    console.log('on submit form values: ', values);
    // this.password.blur();
  };

  render() {
    const { required, minLength4, maxLength120 } = FormFields.FormValidator;
    const { avatar, username, firstName, lastName, dob, gender, height, weight } = this.props;
    return (
      <Block style={styles.container}>
        <View style={styles.header}>
          <Image source={avatar || DefaultAvatar} style={styles.avatar} />
        </View>
        <Block flex={5} style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Field
              disabled
              name="username"
              value={username}
              component={FormFields.TextField}
              label={I18n.t('profile.user_info.username')}
            />
            <Field
              name="firstName"
              value={firstName}
              component={FormFields.TextField}
              autoCorrect={false}
              label={I18n.t('profile.user_info.first_name')}
              validate={[required, minLength4, maxLength120]}
            />
            <Field
              name="lastName"
              value={lastName}
              component={FormFields.TextField}
              autoCorrect={false}
              label={I18n.t('profile.user_info.last_name')}
              validate={[required, minLength4, maxLength120]}
            />
            <Field
              name="dob"
              value={dob}
              component={FormFields.TextField}
              autoCorrect={false}
              label={I18n.t('profile.user_info.dob')}
              validate={[required, minLength4, maxLength120]}
            />
            <Field
              name="gender"
              value={gender}
              component={FormFields.TextField}
              autoCorrect={false}
              label={I18n.t('profile.user_info.gender')}
              validate={[required, minLength4, maxLength120]}
            />
            <Field
              name="height"
              value={height}
              component={FormFields.TextField}
              autoCorrect={false}
              label={I18n.t('profile.user_info.height')}
              validate={[required, minLength4, maxLength120]}
            />
            <Field
              name="weight"
              value={weight}
              component={FormFields.TextField}
              autoCorrect={false}
              label={I18n.t('profile.user_info.weight')}
              validate={[required, minLength4, maxLength120]}
            />
          </ScrollView>
        </Block>
      </Block>
    );
  }
}

const mapStateToProps = () => ({
  initialValues: {
    username: 'yenpt',
    firstName: 'Hana',
    lastName: 'Pham',
    dob: '26/12/1993',
    gender: 'Female',
    height: '158 cm',
    weight: '48 kg',
  },
});

export default connect(mapStateToProps)(
  reduxForm({
    form: formName,
  })(UserInfo),
);
