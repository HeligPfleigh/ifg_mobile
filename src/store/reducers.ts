import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { languageReducer } from './language/reducers';
import { meReducer } from './me/reducers';
import { summaryReducer } from './summary/reducers';
import { modalReducer } from './modal/reducers';
import { draftsReducer } from './drafts/reducers';
import { authReducer } from './auth/reducers';
import { myActionReducer } from './myaction/reducers';
import { notificationReducer } from './notification/reducers';

export const rootReducer = combineReducers({
  form: formReducer,
  me: meReducer,
  summary: summaryReducer,
  language: languageReducer,
  modal: modalReducer,
  drafts: draftsReducer,
  auth: authReducer,
  myaction: myActionReducer,
  notification: notificationReducer,
});
