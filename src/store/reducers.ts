import { combineReducers } from "redux";

import { languageReducer } from './language/reducers';
import { navReducer } from "../navigations/AppNavigator";

export const rootReducer = combineReducers({
  nav: navReducer,
  language: languageReducer,
});
