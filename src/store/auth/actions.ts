import { Dispatch } from 'redux';

import api from '../../core/api';
import { Toast } from '../../components';
import {
  LoginSuccessfulResponse,
  LOGIN_SUCCESSFUL,
  LOGIN_FAILURE,
  LoginActionType,
  LOGOUT,
  LOGIN_REQUEST,
} from './types';
import { RequestError } from '../types';

const loginRequest = (): LoginActionType => {
  return {
    type: LOGIN_REQUEST,
  };
};

const loginSuccessfull = (response: LoginSuccessfulResponse): LoginActionType => {
  return {
    type: LOGIN_SUCCESSFUL,
    response,
  };
};

const loginFail = (error: RequestError): LoginActionType => {
  return {
    type: LOGIN_FAILURE,
    error,
  };
};

export function login(username: string, password: string) {
  return async function(dispatch: Dispatch<LoginActionType>) {
    dispatch(loginRequest);
    try {
      const { data } = await api.login(username, password);
      dispatch(loginSuccessfull(data));
    } catch (e) {
      dispatch(loginFail(e));
      Toast.error(e.message);
    }
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}
