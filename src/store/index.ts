import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from './reducers';

const middlewares = [thunk];
const middleWareEnhancer = applyMiddleware(...middlewares);

export const store = createStore(
  rootReducer,
  composeWithDevTools(middleWareEnhancer)
);

export type AppState = ReturnType<typeof rootReducer>;
