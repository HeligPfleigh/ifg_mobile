import React, { Component } from 'react';
import { Text, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import noop from 'lodash/noop';
import { SwipeRow } from 'react-native-swipe-list-view';
import { Dropdown } from 'react-native-material-dropdown';
import { Item, Label, Input } from 'native-base';
import { NavigationScreenProps } from 'react-navigation';
import { AppState } from '../../store/types';
import NavigatorMap from '../../navigations/NavigatorMap';
import { Block, Button, Checkbox } from '../../components';
import { styles } from './styles';
import I18n from '../../core/i18n';
import { Enum, theme } from '../../constants';
import { showModal, loadActions } from '../../store/actions';
import { Edit, Delete } from '../../assets/images';

interface ActionListProps extends NavigationScreenProps {
  dispatch: any;
  ongoingActions: any;
}

class ActionList extends Component<ActionListProps> {
  componentDidMount() {
    this.props.dispatch(loadActions(Enum.ActionStatus.ONGOING));
  }

  _navigateToArchivedActions = () => this.props.navigation.navigate(NavigatorMap.AchievedActions);

  _showSMARTModal = () => {
    this.props.dispatch(showModal({ onModalPress: noop, modalType: Enum.ModalType.SMART }));
  };

  _renderOngoingAction = (action: any) => (
    <SwipeRow disableRightSwipe rightOpenValue={-100} key={`${action.id}`}>
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
          <Text>{action.action}</Text>
        </Block>
      </Block>
    </SwipeRow>
  );

  render() {
    const { ongoingActions } = this.props;
    return (
      <Block>
        <Block flex={5}>
          <Block flex={false} style={styles.addNewContainer}>
            <Item stackedLabel>
              <Label style={styles.addNewTxt}>{I18n.t('action_list.add_new')}</Label>
              <Input />
            </Item>
            <Dropdown label={I18n.t('action_list.select_reason')} data={[]} rippleColor={theme.colors.gray} />
            <Button gradient style={styles.saveBtn}>
              <Block center middle>
                <Text style={styles.nextBtnTxt}>{I18n.t('action_list.footer.save')}</Text>
              </Block>
            </Button>
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
          <ScrollView>{ongoingActions.map((action: any) => this._renderOngoingAction(action))}</ScrollView>
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

const mapStateToProps = (state: AppState) => ({
  ongoingActions: state.myaction.data.ongoing,
});

export default connect(mapStateToProps)(ActionList);
