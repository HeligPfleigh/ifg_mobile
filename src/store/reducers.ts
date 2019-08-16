import { combineReducers } from "redux";

import { languageReducer } from './language/reducers';

export const rootReducer = combineReducers({
  language: languageReducer,
});
