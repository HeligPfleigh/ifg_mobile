import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { languageReducer } from './language/reducers';
import { meReducer, initialState as initialMe } from './me/reducers';
import { summaryReducer, initialState as initialSummary } from './summary/reducers';
import { modalReducer } from './modal/reducers';
import { draftsReducer } from './drafts/reducers';
import { authReducer, initialState as initialAuth } from './auth/reducers';
import { myActionReducer, initialState as initialMyAction } from './myaction/reducers';
import { notificationReducer } from './notification/reducers';
import { AppState, LOGOUT } from './types';
import { tourReducer } from './tour/reducers';

const appReducer = combineReducers({
  form: formReducer,
  me: meReducer,
  summary: summaryReducer,
  language: languageReducer,
  modal: modalReducer,
  drafts: draftsReducer,
  auth: authReducer,
  myaction: myActionReducer,
  notification: notificationReducer,
  tour: tourReducer,
});

export const rootReducer: any = (state: AppState, action: any) => {
  if (action.type === LOGOUT) {
    // reset all except modal, drafts, language, notifications
    return {
      form: {},
      me: initialMe,
      summary: initialSummary,
      language: state.language,
      modal: state.modal,
      drafts: state.drafts,
      auth: initialAuth,
      myaction: initialMyAction,
      notification: state.notification,
    };
  }
  return appReducer(state, action);
};
