import { Dispatch } from 'redux';

import { SHOW_MODAL, HIDE_MODAL, ModalActionType, ShowModalRequest } from './types';

export const showModal = ({ onModalPress, modalType }: ShowModalRequest) => (dispatch: Dispatch<ModalActionType>) => {
  dispatch({
    type: SHOW_MODAL,
    onModalPress,
    modalType,
  });
};

export const hideModal = () => (dispatch: Dispatch<ModalActionType>) => {
  dispatch({
    type: HIDE_MODAL,
  });
};
