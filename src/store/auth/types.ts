import { CustomError } from '../types';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESSFUL = 'LOGIN_SUCCESSFUL';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const LOGIN_RESET_ERROR = 'LOGIN_RESET_ERROR';

export interface AuthState {
  isRequesting: boolean;
  token: string;
  error?: CustomError;
}

export interface LoginSuccessfulResponse {
  token: string;
}

export interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
}

export interface LoginSuccessfulAction {
  type: typeof LOGIN_SUCCESSFUL;
  response: LoginSuccessfulResponse;
}

export interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  error: CustomError;
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

export type LoginActionType = LoginRequestAction | LoginFailureAction | LoginSuccessfulAction;
