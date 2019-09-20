import { Dispatch } from 'react';
import {
  MyActionType,
  REQUEST_ACTION,
  REQUEST_ACTION_SUCCESS,
  REQUEST_ACTION_FAIL,
  MyActionFailureError,
  MyActionSuccessfulResponse,
  POST_ACTION_SUCCESS,
  DELETE_ACTION_SUCCESS,
  MARK_AS_ARCHIEVED_SUCCESS,
  DELETE_ACTIONS_SUCCESS,
  EDIT_ACTION_SUCCESS,
  GET_REASONS_SUCCESS,
} from './types';
import { Enum } from '../../constants';
import api from '../../core/api';

function myActionRequest(): MyActionType {
  return {
    type: REQUEST_ACTION,
  };
}

function myActionFailure(error: MyActionFailureError): MyActionType {
  return {
    type: REQUEST_ACTION_FAIL,
    error,
  };
}

function myActionSuccessful(status: string, response: MyActionSuccessfulResponse): MyActionType {
  return {
    type: REQUEST_ACTION_SUCCESS,
    response,
    status,
  };
}

function postMyActionSuccessful(response: any): MyActionType {
  return {
    type: POST_ACTION_SUCCESS,
    response,
  };
}

function deleteMyActionSuccessful(id: string): MyActionType {
  return {
    type: DELETE_ACTION_SUCCESS,
    id,
  };
}

function markAsArchievedSuccessful(actions: string[]): MyActionType {
  return {
    type: MARK_AS_ARCHIEVED_SUCCESS,
    actions,
  };
}

function deleteListActionsSuccessful(actions: string[]): MyActionType {
  return {
    type: DELETE_ACTIONS_SUCCESS,
    actions,
  };
}

function editActionSuccessful(id: string, newAction: string): MyActionType {
  return {
    type: EDIT_ACTION_SUCCESS,
    id,
    newAction,
  };
}

function getReasonsSuccessful(response: any): MyActionType {
  return {
    type: GET_REASONS_SUCCESS,
    response,
  };
}

export function loadActions(status: Enum.ActionStatus) {
  return async function(dispatch: Dispatch<MyActionType>) {
    dispatch(myActionRequest());
    try {
      const { data } = await api.getActionsByType(status);
      dispatch(myActionSuccessful(status, data));
    } catch (e) {
      const error = {
        status: e.status || 400,
        message: e.message || 'Unexpected error',
      };
      dispatch(myActionFailure(error));
    }
  };
}

export function postAction(req: { action: string; reason?: string }) {
  return async function(dispatch: Dispatch<MyActionType>) {
    dispatch(myActionRequest());
    try {
      const { data } = await api.createAction(req);
      dispatch(postMyActionSuccessful(data));
    } catch (err) {
      const error = {
        status: err.status || 400,
        message: err.message || 'Unexpected error',
      };
      dispatch(myActionFailure(error));
    }
  };
}

export function deleteAction(id: string) {
  return async function(dispatch: Dispatch<MyActionType>) {
    dispatch(myActionRequest());
    try {
      await api.deleteAction(id);
      dispatch(deleteMyActionSuccessful(id));
    } catch (err) {
      const error = {
        status: err.status || 400,
        message: err.message || 'Unexpected error',
      };
      dispatch(myActionFailure(error));
    }
  };
}

export function markAsArchievedAction(actions: string[]) {
  return async function(dispatch: Dispatch<MyActionType>) {
    dispatch(myActionRequest());
    try {
      await api.archievedActions(actions);
      dispatch(markAsArchievedSuccessful(actions));
    } catch (err) {
      const error = {
        status: err.status || 400,
        message: err.message || 'Unexpected error',
      };
      dispatch(myActionFailure(error));
    }
  };
}

export function deleteActions(actions: string[]) {
  return async function(dispatch: Dispatch<MyActionType>) {
    dispatch(myActionRequest());
    try {
      await api.deleteActions(actions);
      dispatch(deleteListActionsSuccessful(actions));
    } catch (err) {
      const error = {
        status: err.status || 400,
        message: err.message || 'Unexpected error',
      };
      dispatch(myActionFailure(error));
    }
  };
}

export function editAction(id: string, action: string) {
  return async function(dispatch: Dispatch<MyActionType>) {
    dispatch(myActionRequest());
    try {
      await api.editAction(id, action);
      dispatch(editActionSuccessful(id, action));
    } catch (err) {
      const error = {
        status: err.status || 400,
        message: err.message || 'Unexpected error',
      };
      dispatch(myActionFailure(error));
    }
  };
}

export function getReasons(type?: string) {
  return async function(dispatch: Dispatch<MyActionType>) {
    dispatch(myActionRequest());
    try {
      const { data } = await api.getReasons(type);
      dispatch(getReasonsSuccessful(data));
    } catch (err) {
      const error = {
        status: err.status || 400,
        message: err.message || 'Unexpected error',
      };
      dispatch(myActionFailure(error));
    }
  };
}
