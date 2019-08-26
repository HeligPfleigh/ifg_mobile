import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './reducers';
import { navMiddleware } from '../navigations/AppNavigator';

const middlewares = [thunk, navMiddleware];
const middleWareEnhancer = applyMiddleware(...middlewares);

export const store = createStore(rootReducer, composeWithDevTools(middleWareEnhancer));
