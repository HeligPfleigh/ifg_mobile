import React, { Component } from 'react';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import noop from 'lodash/noop';

import {
  SelfEvaluationModal,
  DeleteAccountModal,
  SignUpSuccessModal,
  EvaluationSavedModal,
  DraftSavedModal,
  DefaultModal,
  SMARTModal,
  FeatureNotAvailableModal,
  LicenseModal,
  NetworkNotAvailableModal,
} from './NoticeModal';
import ChooseDate from './ChooseDateModal';
import { AppState } from '../../store/types';
import { hideModal } from '../../store/actions';
import { Enum } from '../../constants';

interface ModalContainerProps {
  isVisible: boolean;
  modalType: Enum.ModalType;
  onModalPress: () => void;
  dispatch: any;
}

interface ModalContainerState {
  isVisible: boolean;
}

const defaultState = {
  isVisible: false,
};

const MODAL_TYPES: any = {
  [Enum.ModalType.DEFAULT]: DefaultModal,
  [Enum.ModalType.SELF_EVALUATION]: SelfEvaluationModal,
  [Enum.ModalType.DRAFT_SAVED]: DraftSavedModal,
  [Enum.ModalType.EVALUATION_SAVED]: EvaluationSavedModal,
  [Enum.ModalType.SIGNUP_SUCCESS]: SignUpSuccessModal,
  [Enum.ModalType.DELETE_ACCOUNT]: DeleteAccountModal,
  [Enum.ModalType.SMART]: SMARTModal,
  [Enum.ModalType.FEATURE_NOT_AVAILABLE]: FeatureNotAvailableModal,
  [Enum.ModalType.CHOOSE_DATE]: ChooseDate,
  [Enum.ModalType.LICENSE]: LicenseModal,
  [Enum.ModalType.NETWORK_NOT_AVAILABLE]: NetworkNotAvailableModal,
};

class ModalContainer extends Component<ModalContainerProps, ModalContainerState> {
  static getDerivedStateFromProps(nextProps: ModalContainerProps, prevState: ModalContainerState) {
    if (nextProps.isVisible !== prevState.isVisible) {
      return {
        isVisible: nextProps.isVisible,
      };
    }
    return defaultState;
  }

  static defaultProps: ModalContainerProps;

  state = defaultState;

  preModalPress = noop;

  hide = () => this.props.dispatch(hideModal());

  onModalPress = () => {
    this.preModalPress = this.props.onModalPress;
    this.hide();
  };

  onModalHide = () => {
    this.preModalPress();
    this.preModalPress = noop;
  };

  render() {
    const { isVisible } = this.state;
    const { modalType, ...ownProps } = this.props;
    const SpecifiedModal = MODAL_TYPES[modalType];
    return (
      <Modal
        isVisible={isVisible}
        onBackdropPress={this.hide}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={600}
        animationOutTiming={600}
        onModalHide={this.onModalHide}
      >
        <SpecifiedModal onPress={this.onModalPress} {...ownProps} />
      </Modal>
    );
  }
}

ModalContainer.defaultProps = {
  isVisible: false,
  modalType: Enum.ModalType.DEFAULT,
  onModalPress: noop,
  dispatch: null,
};

const mapStateToProps = (state: AppState) => ({
  ...state.modal,
});

export default connect(mapStateToProps)(ModalContainer);
