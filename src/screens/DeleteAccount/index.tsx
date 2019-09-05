import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { TextField } from 'react-native-material-textfield';
import { NavigationScreenProp, NavigationState } from 'react-navigation';

import I18n from '../../core/i18n';
import { Enum } from '../../constants';
import { showModal } from '../../store/actions';
import { Block, Button } from '../../components';
import { styles } from './styles';

interface IProps {
  dispatch: any;
  navigation: NavigationScreenProp<NavigationState>;
}

class DeleteAccount extends Component<IProps> {
  onSubmit = () => {
    const { dispatch, navigation } = this.props;
    dispatch(showModal({ modalType: Enum.ModalType.DELETE_ACCOUNT, onModalPress: navigation.goBack }));
  };

  onCancel = () => this.props.navigation.goBack();

  render() {
    return (
      <Block style={styles.container}>
        <Block flex={false}>
          <Block flex={false} center middle style={styles.titleWrapper}>
            <Text style={styles.pageTitle}>{I18n.t('profile.delete_account.page_title')}</Text>
            <Text style={styles.pageSubtitle}>{I18n.t('profile.delete_account.page_subtitle')}</Text>
          </Block>
          <Block flex={false} style={styles.fieldWrapper}>
            <Text style={styles.fieldLabel}>{I18n.t('profile.delete_account.label_input')}</Text>
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
              <Text style={styles.labelSend}>{I18n.t('profile.delete_account.label_button')}</Text>
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

export default connect()(DeleteAccount);
