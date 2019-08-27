import { combineReducers } from 'redux';

import { languageReducer } from './language/reducers';
import { meReducer } from './me/reducers';
import { summaryReducer } from './summary/reducers';
import { navReducer } from '../navigations/AppNavigator';

export const rootReducer = combineReducers({
  nav: navReducer,
  me: meReducer,
  summary: summaryReducer,
  language: languageReducer,
});
