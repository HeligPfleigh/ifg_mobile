import { Dispatch } from 'redux';
import { SET_FIREBASE_TOKEN, NotificationActionTypes, TOGGLE_FIREBASE_NOTIFICATION } from './types';
import api from '../../core/api';

function saveFirebaseTokenSuccess(firebaseToken?: string): NotificationActionTypes {
  return {
    type: SET_FIREBASE_TOKEN,
    firebaseToken,
  };
}

export function saveIsReceiveNotificationSuccess(isReceiveNotification: boolean): NotificationActionTypes {
  return {
    type: TOGGLE_FIREBASE_NOTIFICATION,
    isReceiveNotification,
  };
}

export function saveFirebaseToken(data: { firebaseToken: string }) {
  return async function(dispatch: Dispatch<NotificationActionTypes>) {
    try {
      await api.sendFirebaseToken(data);
      dispatch(saveFirebaseTokenSuccess(data.firebaseToken));
    } catch (e) {
      dispatch(saveFirebaseTokenSuccess());
    }
  };
}

export function toggleIsReceiveNotification(noti: boolean) {
  return async function(dispatch: Dispatch<NotificationActionTypes>, getState: any) {
    try {
      const {
        notification: { firebaseToken },
      } = getState();
      await api.editFirebaseSetting({ isReceiveNotification: noti }, firebaseToken);
      dispatch(saveIsReceiveNotificationSuccess(noti));
    } catch (error) {
      // TODO
    }
  };
}

export function changeLanguageNotification(language: string) {
  return async function(dispatch: Dispatch<NotificationActionTypes>, getState: any) {
    try {
      const {
        notification: { firebaseToken },
      } = getState();
      await api.editFirebaseSetting({ language }, firebaseToken);
    } catch (error) {
      // TODO
    }
  };
}
