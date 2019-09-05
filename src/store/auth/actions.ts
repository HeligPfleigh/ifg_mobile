import { Dispatch } from 'redux';

import api from '../../core/api';
import { LoginSuccessfulResponse, LOGIN_SUCCESSFUL, LOGIN_FAILURE, LoginActionType } from './types';
import { RequestError } from '../types';

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
    try {
      const { data } = await api.login(username, password);
      dispatch(loginSuccessfull(data));
    } catch (e) {
      dispatch(loginFail(e));
    }
  };
}
