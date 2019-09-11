import {
  NotificationState,
  SET_FIREBASE_TOKEN,
  TOGGLE_FIREBASE_NOTIFICATION,
  UpdateFirebaseTokenAction,
  UpdateIsReceiveNotificationAction,
} from './types';
import { createReducer } from '../createReducer';

const initialState: NotificationState = {
  isReceiveNotification: false,
};

const notificationReducer = createReducer(initialState, {
  [SET_FIREBASE_TOKEN]: (state: NotificationState, action: UpdateFirebaseTokenAction) => {
    return { ...state, firebaseToken: action.firebaseToken };
  },
  [TOGGLE_FIREBASE_NOTIFICATION]: (state: NotificationState, action: UpdateIsReceiveNotificationAction) => {
    return { ...state, isReceiveNotification: action.isReceiveNotification };
  },
});

export { notificationReducer };
