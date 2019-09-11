export const SET_FIREBASE_TOKEN = 'SET_FIREBASE_TOKEN';
export const TOGGLE_FIREBASE_NOTIFICATION = 'TOGGLE_FIREBASE_NOTIFICATION';

export interface NotificationState {
  firebaseToken?: string;
  isReceiveNotification: boolean;
}

export interface UpdateFirebaseTokenAction {
  type: typeof SET_FIREBASE_TOKEN;
  firebaseToken?: string;
}

export interface UpdateIsReceiveNotificationAction {
  type: typeof TOGGLE_FIREBASE_NOTIFICATION;
  isReceiveNotification: boolean;
}

export type NotificationActionTypes = UpdateFirebaseTokenAction | UpdateIsReceiveNotificationAction;
