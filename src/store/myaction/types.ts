import { Enum } from '../../constants';

export const REQUEST_ACTION = 'REQUEST_ACTION';
export const REQUEST_ACTION_SUCCESS = 'REQUEST_ACTION_SUCCESS';
export const REQUEST_ACTION_FAIL = 'REQUEST_ACTION_FAIL';

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

export interface MyActionSuccessfulResponse {
  data: Action[];
}

export type MyActionType = MyActionRequestAction | MyActionSuccessfulAction | MyActionFailureAction;
