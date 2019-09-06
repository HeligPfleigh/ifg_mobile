import noop from 'lodash/noop';

import { ModalState, SHOW_MODAL, HIDE_MODAL, ShowModalAction } from './types';
import { createReducer } from '../createReducer';
import { Enum } from '../../constants';

const initialState: ModalState = {
  modalType: Enum.ModalType.DEFAULT,
  isVisible: false,
  onModalPress: noop,
};

const modalReducer = createReducer(initialState, {
  [SHOW_MODAL]: (state: ModalState, action: ShowModalAction) => {
    return {
      isVisible: true,
      modalType: action.modalType,
      onModalPress: action.onModalPress,
    };
  },
  [HIDE_MODAL]: (state: ModalState) => {
    return {
      ...initialState,
      modalType: state.modalType,
    };
  },
});

export { modalReducer };
