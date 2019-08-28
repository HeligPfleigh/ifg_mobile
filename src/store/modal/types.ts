import { Enum } from '../../constants';

export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';

export interface ModalState {
  modalType: Enum.ModalType;
  isVisible: boolean;
  onModalPress: () => void;
}

export interface HideModalAction {
  type: typeof HIDE_MODAL;
}

export interface ShowModalAction {
  type: typeof SHOW_MODAL;
  modalType: string;
  onModalPress: () => void;
}

export interface ShowModalRequest {
  modalType: string;
  onModalPress: () => void;
}

export type ModalActionType = HideModalAction | ShowModalAction;
