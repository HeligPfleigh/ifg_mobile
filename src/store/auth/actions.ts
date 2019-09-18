import { Dispatch } from 'redux';
import get from 'lodash/get';
import api from '../../core/api';
import {
  LoginSuccessfulResponse,
  LOGIN_SUCCESSFUL,
  LOGIN_FAILURE,
  LoginActionType,
  LOGOUT,
  LOGIN_RESET_ERROR,
  // LOGIN_REQUEST,
} from './types';
import { CustomError } from '../types';

// const loginRequest = (): LoginActionType => {
//   return {
//     type: LOGIN_REQUEST,
//   };
// };

const loginSuccessfull = (response: LoginSuccessfulResponse): LoginActionType => {
  return {
    type: LOGIN_SUCCESSFUL,
    response,
  };
};

const loginFail = (error: CustomError): LoginActionType => {
  return {
    type: LOGIN_FAILURE,
    error,
  };
};

export const resetLoginError = () => ({
  type: LOGIN_RESET_ERROR,
});

export function login(username: string, password: string) {
  return async function(dispatch: Dispatch<LoginActionType>) {
    // dispatch(loginRequest());
    try {
      const { data } = await api.login(username, password);
      dispatch(loginSuccessfull(data));
    } catch (e) {
      const error = get(e, 'response.data.error');
      dispatch(loginFail(error));
    }
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}
