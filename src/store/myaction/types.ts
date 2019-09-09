import { Enum } from '../../constants';

export const REQUEST_ACTION = 'REQUEST_ACTION';
export const REQUEST_ACTION_SUCCESS = 'REQUEST_ACTION_SUCCESS';
export const REQUEST_ACTION_FAIL = 'REQUEST_ACTION_FAIL';
export const POST_ACTION_SUCCESS = 'POST_ACTION_SUCCESS';
export const DELETE_ACTION_SUCCESS = 'DELETE_ACTION_SUCCESS';
export const MARK_AS_ARCHIEVED_SUCCESS = 'MARK_AS_ARCHIEVED_SUCCESS';
export const DELETE_ACTIONS_SUCCESS = 'DELETE_ACTIONS_SUCCESS';
export const EDIT_ACTION_SUCCESS = 'EDIT_ACTION_SUCCESS';

interface Action {
  action: string;
  id: string;
  status: Enum.ActionStatus;
  userId: string;
  reason?: string;
}

export interface MyActionFailureError {
  status: number;
  message: string;
}

export interface MyActionState {
  isFetching: boolean;
  data: {
    [Enum.ActionStatus.ONGOING]: Action[];
    [Enum.ActionStatus.ARCHIEVED]: Action[];
  };
  error?: MyActionFailureError;
}

export interface MyActionRequestAction {
  type: typeof REQUEST_ACTION;
}

export interface MyActionSuccessfulAction {
  type: typeof REQUEST_ACTION_SUCCESS;
  status: string;
  response?: any;
}

export interface MyActionFailureAction {
  type: typeof REQUEST_ACTION_FAIL;
  error?: MyActionFailureError;
}

export interface MyActionPostSuccessfulAction {
  type: typeof POST_ACTION_SUCCESS;
  response?: any;
}

export interface MyActionDeleteSuccessfulAction {
  type: typeof DELETE_ACTION_SUCCESS;
  id: string;
}

export interface MyActionMarkAsArchievedSuccessfulAction {
  type: typeof MARK_AS_ARCHIEVED_SUCCESS;
  actions: string[];
}

export interface MyActionDeleteListSuccessfulAction {
  type: typeof DELETE_ACTIONS_SUCCESS;
  actions: string[];
}

export interface MyActionEditSuccessfulAction {
  type: typeof EDIT_ACTION_SUCCESS;
  id: string;
  newAction: string;
}

export interface MyActionSuccessfulResponse {
  data: Action[];
}

export type MyActionType =
  | MyActionRequestAction
  | MyActionSuccessfulAction
  | MyActionFailureAction
  | MyActionPostSuccessfulAction
  | MyActionDeleteSuccessfulAction
  | MyActionMarkAsArchievedSuccessfulAction
  | MyActionDeleteListSuccessfulAction
  | MyActionEditSuccessfulAction;
