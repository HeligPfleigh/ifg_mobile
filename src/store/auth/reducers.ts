import { createReducer } from '../createReducer';
import { LOGIN_SUCCESSFUL, AuthState, LOGIN_FAILURE, LoginSuccessfulAction, LoginFailureAction, LOGOUT } from './types';

const initialState = {
  token: '',
};

const authReducer = createReducer(initialState, {
  [LOGIN_SUCCESSFUL]: (state: AuthState, action: LoginSuccessfulAction) => {
    return { token: action.response.token };
  },
  [LOGIN_FAILURE]: (state: AuthState, action: LoginFailureAction) => {
    return {
      ...initialState,
      error: action.error,
    };
  },
  [LOGOUT]: () => {
    return initialState;
  },
});

export { authReducer };
