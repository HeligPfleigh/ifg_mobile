import React, { useEffect, useState, useRef } from 'react';
import { Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import noop from 'lodash/noop';
import { SwipeRow } from 'react-native-swipe-list-view';
import { Dropdown } from 'react-native-material-dropdown';
import { NavigationScreenProps } from 'react-navigation';
import { TextField } from 'react-native-material-textfield';
import Modal from 'react-native-modal';
import get from 'lodash/get';
import { AppState } from '../../store/types';
import NavigatorMap from '../../navigations/NavigatorMap';
import { Block, Button, Checkbox, Loader } from '../../components';
import { styles } from './styles';
import I18n from '../../core/i18n';
import { Enum, theme } from '../../constants';
import {
  showModal,
  loadActions,
  postAction,
  deleteAction,
  markAsArchievedAction,
  deleteActions,
  editAction,
  getReasons,
} from '../../store/actions';
import { Edit, Delete, Delete2, Save, Archived } from '../../assets/images';

interface ActionListProps extends NavigationScreenProps {}

const OngoingAction = ({ action, onCheckboxPress, onEdit }: any) => {
  const [selected, setSelected] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    onCheckboxPress(action.id, selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const swipeEl = useRef<any>(null);

  const handleDeleteAction = () => {
    if (swipeEl && swipeEl.current) {
      swipeEl.current.closeRowWithoutAnimation();
    }

    dispatch(deleteAction(action.id));
  };

  const handleEditAction = () => {
    if (swipeEl && swipeEl.current) {
      swipeEl.current.closeRowWithoutAnimation();
    }
    onEdit(action.id);
  };

  return (
    <SwipeRow ref={swipeEl} disableRightSwipe rightOpenValue={-100}>
      <Block flex={false} style={styles.standaloneRowBack}>
        <Block flex={false} />
        <Block flex={false} row style={{ height: '100%' }}>
          <TouchableOpacity style={[styles.btn, styles.indigo]} onPress={handleEditAction}>
            <Edit width={theme.sizes.icon} height={theme.sizes.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={handleDeleteAction}>
            <Delete width={theme.sizes.icon} height={theme.sizes.icon} />
          </TouchableOpacity>
        </Block>
      </Block>
      <Block flex={false} row style={styles.standaloneRowFront}>
        <Block flex={1} middle>
          <Checkbox size={20} checked={selected} onPress={() => setSelected(!selected)} />
        </Block>
        <Block flex={9} middle>
          <Text>{action.action}</Text>
        </Block>
      </Block>
    </SwipeRow>
  );
};

const ActionList: React.FC<ActionListProps> = ({ navigation }: ActionListProps) => {
  const [action, setAction] = useState('');
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  const [modalVisible, toggleModal] = useState(false);
  const [editValue, setEditValue] = useState('');
  const [editActionID, setEditActionID] = useState('');
  const [selectedReason, setSelectedReason] = useState('');
  const ongoingActions = useSelector((state: AppState) => state.myaction.data.ongoing);
  const reasonsValue = useSelector((state: AppState) => state.myaction.data.reasons);
  const isFetching = useSelector((state: AppState) => state.myaction.isFetching);
  const dispatch = useDispatch();

  // list reasons
  let reasons: any = [];
  if (reasonsValue.length > 0) {
    reasons = reasonsValue.map((reason: any) => ({ value: reason }));
    reasons.sort((item1: any, item2: any) => {
      if (item1.value < item2.value) {
        return -1;
      }
      if (item1.value > item2.value) {
        return 1;
      }
      return 0;
    });
    reasons.push({ value: '' });
  }

  const showSMARTModal = () => {
    dispatch(showModal({ onModalPress: noop, modalType: Enum.ModalType.SMART }));
  };

  const navigateToArchivedActions = () => navigation.navigate(NavigatorMap.AchievedActions);

  useEffect(() => {
    dispatch(loadActions(Enum.ActionStatus.ONGOING));
    dispatch(getReasons());
  }, [dispatch]);

  const saveAction = () => {
    // reset input and save action
    setAction('');
    setSelectedReason('');
    dispatch(postAction({ action, reason: selectedReason }));
  };

  const updateSelectedAction = (id: string, selected: boolean) => {
    let newSelectedActions = [];
    if (!selected) {
      newSelectedActions = selectedActions.filter((act: any) => act !== id);
    } else {
      newSelectedActions = [...selectedActions, id];
    }
    setSelectedActions(newSelectedActions);
  };

  const markAsArchieved = () => {
    dispatch(markAsArchievedAction(selectedActions));
  };

  const deleteAll = () => {
    dispatch(deleteActions(selectedActions));
  };

  const handleEdit = (selectedId: string) => {
    const preText = get(ongoingActions.find((act: any) => act.id === selectedId), 'action', '');
    setEditValue(preText);
    setEditActionID(selectedId);
    toggleModal(true);
  };

  const handleUpdate = () => {
    dispatch(editAction(editActionID, editValue));
    toggleModal(false);
  };

  const handleChangeReason = (value: string) => {
    setSelectedReason(value);
  };

  return (
    <Block>
      <Loader loading={isFetching} />
      <Block flex={5}>
        <Block flex={false} style={styles.addNewContainer}>
          <TextField label={I18n.t('action_list.add_new')} value={action} onChangeText={val => setAction(val)} />
          <Dropdown
            label={I18n.t('action_list.select_reason')}
            data={reasons}
            rippleColor={theme.colors.gray}
            onChangeText={handleChangeReason}
            value={selectedReason}
          />
          {/* <Button gradient style={styles.saveBtn} onPress={saveAction}>
            <Block center middle>
              <Text style={styles.nextBtnTxt}>{I18n.t('action_list.footer.save')}</Text>
            </Block>
          </Button> */}
        </Block>
        <Block flex={false} row style={styles.tipSection}>
          <Button onPress={showSMARTModal}>
            <Text style={styles.tip}>
              {I18n.t('action_list.tip_for_action')}
              <Text style={styles.smart}>{I18n.t('action_list.smart')}</Text>
            </Text>
          </Button>
          <Button onPress={navigateToArchivedActions}>
            <Text style={styles.tip}>
              {I18n.t('action_list.actions')}
              <Text style={styles.smart}>{I18n.t('action_list.done')}</Text>
            </Text>
          </Button>
        </Block>
        <Block flex={false} row bottom padding={[0, theme.sizes.padding]}>
          <TouchableOpacity onPress={saveAction} style={styles.iconBtn}>
            <Save width={theme.sizes.icon} height={theme.sizes.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={markAsArchieved} style={styles.iconBtn}>
            <Archived width={theme.sizes.icon} height={theme.sizes.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={deleteAll} style={{ justifyContent: 'center' }}>
            <Delete2 width={theme.sizes.icon} height={theme.sizes.icon} />
          </TouchableOpacity>
        </Block>
        <ScrollView>
          {ongoingActions.map((data: any) => (
            <OngoingAction
              action={data}
              key={`${data.id}`}
              onCheckboxPress={updateSelectedAction}
              onEdit={handleEdit}
            />
          ))}
        </ScrollView>
      </Block>
      {/* <Block middle flex={1} style={styles.footerContainer}>
        <Button gradient style={styles.nextBtn} onPress={markAsArchieved}>
          <Block center middle>
            <Text style={styles.nextBtnTxt}>{I18n.t('action_list.footer.achieve')}</Text>
          </Block>
        </Button>
        <Button gradient style={styles.draftBtn} onPress={deleteAll}>
          <Block center middle style={styles.draftBtnBody}>
            <Text style={styles.draftBtnTxt}>{I18n.t('action_list.footer.delete')}</Text>
          </Block>
        </Button>
      </Block> */}
      <Modal
        isVisible={modalVisible}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={600}
        animationOutTiming={600}
      >
        <Block flex={false} style={styles.modal}>
          <TextField
            label={I18n.t('action_list.edit_action')}
            multiline
            height={100}
            value={editValue}
            onChangeText={text => setEditValue(text)}
          />
          <Block flex={false} row middle>
            <Block flex={1} style={styles.modalBtnContainer}>
              <Button shadow style={styles.draftBtn} onPress={() => toggleModal(false)}>
                <Block center middle>
                  <Text>{I18n.t('common.back')}</Text>
                </Block>
              </Button>
            </Block>
            <Block flex={1} style={styles.modalBtnContainer}>
              <Button gradient style={styles.nextBtn} onPress={handleUpdate}>
                <Block center middle>
                  <Text style={styles.nextBtnTxt}>{I18n.t('action_list.update')}</Text>
                </Block>
              </Button>
            </Block>
          </Block>
        </Block>
      </Modal>
    </Block>
  );
};

export default ActionList;
