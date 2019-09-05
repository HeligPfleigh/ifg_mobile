import { RequestError, CustomError } from '../types';

export const LOGIN_SUCCESSFUL = 'LOGIN_SUCCESSFUL';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export interface AuthState {
  token: string;
  error?: CustomError;
}

export interface LoginSuccessfulResponse {
  token: string;
}

export interface LoginSuccessfulAction {
  type: typeof LOGIN_SUCCESSFUL;
  response: LoginSuccessfulResponse;
}

export interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  error: RequestError;
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

export type LoginActionType = LoginFailureAction | LoginSuccessfulAction;
