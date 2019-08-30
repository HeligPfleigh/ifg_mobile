import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { languageReducer } from './language/reducers';
import { meReducer } from './me/reducers';
import { summaryReducer } from './summary/reducers';
import { navReducer } from '../navigations/AppNavigator';
import { modalReducer } from './modal/reducers';
import { draftsReducer } from './drafts/reducers';

export const rootReducer = combineReducers({
  form: formReducer,
  nav: navReducer,
  me: meReducer,
  summary: summaryReducer,
  language: languageReducer,
  modal: modalReducer,
  drafts: draftsReducer,
});
