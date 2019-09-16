import { Dispatch } from 'redux';

import { SHOW_MODAL, HIDE_MODAL, ModalActionType, ShowModalRequest } from './types';

export const showModal = ({ onModalPress, modalType, ...ownProps }: ShowModalRequest) => ({
  type: SHOW_MODAL,
  onModalPress,
  modalType,
  ...ownProps,
});

export const hideModal = () => (dispatch: Dispatch<ModalActionType>) => {
  dispatch({
    type: HIDE_MODAL,
  });
};
