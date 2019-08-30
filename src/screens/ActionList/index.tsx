import React, { Component } from 'react';
import { Text, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import noop from 'lodash/noop';
import { SwipeRow } from 'react-native-swipe-list-view';
import { Dropdown } from 'react-native-material-dropdown';
import { Item, Label, Input } from 'native-base';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import NavigatorMap from '../../navigations/NavigatorMap';
import { Block, Button, Checkbox } from '../../components';
import { styles } from './styles';
import I18n from '../../core/i18n';
import { Enum, theme } from '../../constants';
import { showModal } from '../../store/actions';
import { Edit, Delete } from '../../assets/images';

interface ActionListProps {
  dispatch: any;
  navigation: NavigationScreenProp<NavigationState>;
}

class ActionList extends Component<ActionListProps> {
  _navigateToArchivedActions = () => this.props.navigation.navigate(NavigatorMap.AchievedActions);

  _showSMARTModal = () => {
    this.props.dispatch(showModal({ onModalPress: noop, modalType: Enum.ModalType.SMART }));
  };

  _renderOngoingAction = () => (
    <SwipeRow disableRightSwipe rightOpenValue={-100}>
      <Block flex={false} style={styles.standaloneRowBack}>
        <Block flex={false} />
        <Block flex={false} row style={{ height: '100%' }}>
          <TouchableOpacity style={[styles.btn, styles.indigo]}>
            <Edit width={theme.sizes.icon} height={theme.sizes.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Delete width={theme.sizes.icon} height={theme.sizes.icon} />
          </TouchableOpacity>
        </Block>
      </Block>
      <Block flex={false} row style={styles.standaloneRowFront}>
        <Block flex={1} middle>
          <Checkbox size={20} checked={false} />
        </Block>
        <Block flex={9} middle>
          <Text>Measdf asdfjlak askdjflkad aksdjflkas asjdfkasd asjdfkals aljdfklasj asdfjklasjdf asdk qwenrm;</Text>
        </Block>
      </Block>
    </SwipeRow>
  );

  render() {
    return (
      <Block>
        <Block flex={5}>
          <Block flex={false} style={styles.addNewContainer}>
            <Item stackedLabel>
              <Label style={styles.addNewTxt}>{I18n.t('action_list.add_new')}</Label>
              <Input />
            </Item>
            <Dropdown label={I18n.t('action_list.select_reason')} data={[]} rippleColor={theme.colors.gray} />
          </Block>
          <Block flex={false} row style={styles.tipSection}>
            <Button onPress={this._showSMARTModal}>
              <Text style={styles.tip}>
                {I18n.t('action_list.tip_for_action')}
                <Text style={styles.smart}>{I18n.t('action_list.smart')}</Text>
              </Text>
            </Button>
            <Button onPress={this._navigateToArchivedActions}>
              <Text style={styles.tip}>
                {I18n.t('action_list.actions')}
                <Text style={styles.smart}>{I18n.t('action_list.done')}</Text>
              </Text>
            </Button>
          </Block>
          <ScrollView>
            {this._renderOngoingAction()}
            {this._renderOngoingAction()}
            {this._renderOngoingAction()}
          </ScrollView>
        </Block>
        <Block middle flex={1} style={styles.footerContainer}>
          <Button gradient style={styles.nextBtn}>
            <Block center middle>
              <Text style={styles.nextBtnTxt}>{I18n.t('action_list.footer.achieve')}</Text>
            </Block>
          </Button>
          <Button shadow style={styles.draftBtn}>
            <Block center middle>
              <Text>{I18n.t('action_list.footer.delete')}</Text>
            </Block>
          </Button>
        </Block>
      </Block>
    );
  }
}

export default connect()(ActionList);
