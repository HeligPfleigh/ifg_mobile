import React, { useState } from 'react';
import { Text, Keyboard } from 'react-native';
import { useDispatch } from 'react-redux';
import { TextField } from 'react-native-material-textfield';
import { NavigationScreenProps, ScrollView } from 'react-navigation';
import noop from 'lodash/noop';
import I18n from '../../core/i18n';
import { Enum } from '../../constants';
import { showModal, logout } from '../../store/actions';
import { Block, Button, Loader } from '../../components';
import { styles } from './styles';
import NavigatorMap from '../../navigations/NavigatorMap';
import api from '../../core/api';

const DeleteAccount: React.FC<NavigationScreenProps> = ({ navigation }: NavigationScreenProps) => {
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    try {
      setLoading(true);
      Keyboard.dismiss();
      await api.giveFeedback({ subject: 'DELETE_ACCOUNT', message: feedback });
      await api.deleteAccount();
      setLoading(false);
      navigation.navigate(NavigatorMap.Welcome);
      dispatch(logout());
      dispatch(
        showModal({
          modalType: Enum.ModalType.DELETE_ACCOUNT,
          onModalPress: noop,
        }),
      );
    } catch (err) {
      // TODO
      setLoading(false);
    }
  };
  const handleCancel = () => navigation.goBack();
  return (
    <Block style={styles.container}>
      <ScrollView>
        <Loader loading={loading} />
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
              title={I18n.t('messages.max_200')}
              bordered
              activeLineWidth={1}
              style={styles.textarea}
              value={feedback}
              onChangeText={text => setFeedback(text)}
            />
          </Block>
        </Block>
        <Block flex={false}>
          <Button gradient style={styles.btnSend} onPress={handleSubmit}>
            <Block center middle>
              <Text style={styles.labelSend}>{I18n.t('profile.delete_account.label_button')}</Text>
            </Block>
          </Button>
          <Button gradient style={styles.btnCancel} onPress={handleCancel}>
            <Block style={styles.btnCancelBody} center middle>
              <Text style={styles.txtCancel}>{I18n.t('common.cancel')}</Text>
            </Block>
          </Button>
        </Block>
      </ScrollView>
    </Block>
  );
};

export default DeleteAccount;
