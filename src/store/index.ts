import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import { rootReducer } from './reducers';
import { navMiddleware } from '../navigations/AppNavigator';

const middlewares = [thunk, navMiddleware];
const middleWareEnhancer = applyMiddleware(...middlewares);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['drafts', 'auth', 'notification', 'language'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, composeWithDevTools(middleWareEnhancer));

const persistor = persistStore(store);

export { store, persistor };
