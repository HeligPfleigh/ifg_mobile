import { createReducer } from '../createReducer';
import {
  LOGIN_SUCCESSFUL,
  AuthState,
  LOGIN_FAILURE,
  LoginSuccessfulAction,
  LoginFailureAction,
  LOGOUT,
  LOGIN_REQUEST,
} from './types';

const initialState = {
  token: '',
  isRequesting: false,
};

const authReducer = createReducer(initialState, {
  [LOGIN_REQUEST]: (state: AuthState) => {
    return { ...state, isRequesting: true };
  },
  [LOGIN_SUCCESSFUL]: (state: AuthState, action: LoginSuccessfulAction) => {
    return { token: action.response.token, isRequesting: false };
  },
  [LOGIN_FAILURE]: (state: AuthState, action: LoginFailureAction) => {
    return {
      ...initialState,
      error: action.error,
      isRequesting: false,
    };
  },
  [LOGOUT]: () => {
    return initialState;
  },
});

export { authReducer };
