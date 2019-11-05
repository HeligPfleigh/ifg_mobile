import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import { rootReducer } from './reducers';

const middlewares = [thunk];
const middleWareEnhancer = applyMiddleware(...middlewares);

const persistConfig = {
  key: 'i-feel-good',
  storage: AsyncStorage,
  whitelist: ['drafts', 'auth', 'notification', 'language', 'tour'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = __DEV__ ? composeWithDevTools(middleWareEnhancer) : compose(middleWareEnhancer);

const store = createStore(persistedReducer, composeEnhancers);

const persistor = persistStore(store);

export { store, persistor };
