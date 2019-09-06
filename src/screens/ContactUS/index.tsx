import React, { Component } from 'react';
import get from 'lodash/get';
import { Text } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { TextField } from 'react-native-material-textfield';
import { NavigationScreenProps } from 'react-navigation';

import I18n from '../../core/i18n';
import { theme } from '../../constants';
import { Block, Button } from '../../components';
import { styles } from './styles';

const subjects = [
  { label: 'Feedback', value: 'FEEDBACK' },
  { label: 'Suggestions', value: 'SUGGESTIONS' },
  { label: 'Technical question', value: 'TECHNICAL_QUESTION' },
  { label: 'Other', value: 'OTHER' },
];

interface IProps extends NavigationScreenProps {}

interface IStates {
  initValue: any;
}

class ContactUS extends Component<IProps, IStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      initValue: get(subjects[0], 'value'),
    };
  }

  onCancel = () => this.props.navigation.goBack();

  onSubmit = () => {
    /* eslint-disable-next-line */
    console.log('Submit form');
  };

  render() {
    const { initValue } = this.state;
    return (
      <Block style={styles.container}>
        <Block flex={false}>
          <Block flex={false} center middle style={styles.titleWrapper}>
            <Text style={styles.pageTitle}>{I18n.t('profile.account_contact_us.page_title')}</Text>
          </Block>
          <Block flex={false} style={styles.fieldWrapper}>
            <Text style={styles.fieldLabel}>{I18n.t('profile.account_contact_us.subject')}</Text>
            <Dropdown
              data={subjects}
              value={initValue}
              rippleColor={theme.colors.gray}
              dropdownOffset={{ top: 5, left: 0 }}
            />
          </Block>
          <Block flex={false} style={styles.fieldWrapper}>
            <Text style={styles.fieldLabel}>{I18n.t('profile.account_contact_us.description')}</Text>
            <TextField
              multiline
              labelHeight={0}
              labelPadding={0}
              height={175}
              maxLength={200}
              characterRestriction={200}
              label=""
              title="Maximum 200 characters"
              bordered
              activeLineWidth={1}
              style={styles.textarea}
            />
          </Block>
        </Block>
        <Block flex={false}>
          <Button gradient style={styles.btnSend} onPress={this.onSubmit}>
            <Block center middle>
              <Text style={styles.labelSend}>{I18n.t('common.send')}</Text>
            </Block>
          </Button>
          <Button shadow style={styles.btnCancel} onPress={this.onCancel}>
            <Block center middle>
              <Text>{I18n.t('common.cancel')}</Text>
            </Block>
          </Button>
        </Block>
      </Block>
    );
  }
}

export default ContactUS;
