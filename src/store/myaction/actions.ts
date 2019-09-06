import { Dispatch } from 'react';
import {
  MyActionType,
  REQUEST_ACTION,
  REQUEST_ACTION_SUCCESS,
  REQUEST_ACTION_FAIL,
  MyActionFailureError,
  MyActionSuccessfulResponse,
} from './types';
import { Enum } from '../../constants';
import api from '../../core/api';

export function myActionRequest(): MyActionType {
  return {
    type: REQUEST_ACTION,
  };
}

export function myActionFailure(error: MyActionFailureError): MyActionType {
  return {
    type: REQUEST_ACTION_FAIL,
    error,
  };
}

export function myActionSuccessfull(status: string, response: MyActionSuccessfulResponse): MyActionType {
  return {
    type: REQUEST_ACTION_SUCCESS,
    response,
    status,
  };
}

export function loadActions(status: Enum.ActionStatus) {
  return async function(dispatch: Dispatch<MyActionType>) {
    dispatch(myActionRequest());
    try {
      const { data } = await api.getActionsByType(status);
      dispatch(myActionSuccessfull(status, data));
    } catch (e) {
      const error = {
        status: e.status || 400,
        message: e.message || 'Unexpected error',
      };
      dispatch(myActionFailure(error));
    }
  };
}
