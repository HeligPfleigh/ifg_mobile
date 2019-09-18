import {
  MyActionState,
  REQUEST_ACTION,
  REQUEST_ACTION_SUCCESS,
  REQUEST_ACTION_FAIL,
  MyActionSuccessfulAction,
  MyActionFailureAction,
  POST_ACTION_SUCCESS,
  MyActionPostSuccessfulAction,
  DELETE_ACTION_SUCCESS,
  MyActionDeleteSuccessfulAction,
  MARK_AS_ARCHIEVED_SUCCESS,
  MyActionMarkAsArchievedSuccessfulAction,
  DELETE_ACTIONS_SUCCESS,
  MyActionDeleteListSuccessfulAction,
  EDIT_ACTION_SUCCESS,
  MyActionEditSuccessfulAction,
  GET_REASONS_SUCCESS,
  MyActionReasonsSuccessfulAction,
} from './types';
import { Enum } from '../../constants';
import { createReducer } from '../createReducer';

export const initialState: MyActionState = {
  isFetching: false,
  data: {
    [Enum.ActionStatus.ONGOING]: [],
    [Enum.ActionStatus.ARCHIEVED]: [],
    reasons: [],
  },
};

const myActionReducer = createReducer(initialState, {
  [REQUEST_ACTION]: (state: MyActionState) => {
    return { ...state, isFetching: true, error: undefined };
  },
  [REQUEST_ACTION_SUCCESS]: (state: MyActionState, action: MyActionSuccessfulAction) => {
    const newData = { ...state.data, [`${action.status}`]: action.response };
    return {
      ...state,
      isFetching: false,
      data: newData,
      error: undefined,
    };
  },
  [REQUEST_ACTION_FAIL]: (state: MyActionState, action: MyActionFailureAction) => {
    return {
      ...state,
      isFetching: false,
      error: action.error,
    };
  },
  [POST_ACTION_SUCCESS]: (state: MyActionState, action: MyActionPostSuccessfulAction) => {
    const newOngoingAction = [...state.data[Enum.ActionStatus.ONGOING], action.response];
    const newData = { ...state.data, [Enum.ActionStatus.ONGOING]: newOngoingAction };
    return { ...state, isFetching: false, data: newData, error: undefined };
  },
  [DELETE_ACTION_SUCCESS]: (state: MyActionState, action: MyActionDeleteSuccessfulAction) => {
    const { id } = action;
    const newOngoingAction = state.data[Enum.ActionStatus.ONGOING].filter(act => act.id !== id);
    const newData = { ...state.data, [Enum.ActionStatus.ONGOING]: newOngoingAction };
    return { ...state, isFetching: false, data: newData, error: undefined };
  },
  [MARK_AS_ARCHIEVED_SUCCESS]: (state: MyActionState, action: MyActionMarkAsArchievedSuccessfulAction) => {
    const { actions } = action;
    const newOngoingAction = state.data[Enum.ActionStatus.ONGOING].filter(act => !actions.includes(act.id));
    const newData = { ...state.data, [Enum.ActionStatus.ONGOING]: newOngoingAction };
    return { ...state, isFetching: false, data: newData, error: undefined };
  },
  [DELETE_ACTIONS_SUCCESS]: (state: MyActionState, action: MyActionDeleteListSuccessfulAction) => {
    const { actions } = action;
    const newOngoingAction = state.data[Enum.ActionStatus.ONGOING].filter(act => !actions.includes(act.id));
    const newData = { ...state.data, [Enum.ActionStatus.ONGOING]: newOngoingAction };
    return { ...state, isFetching: false, data: newData, error: undefined };
  },
  [EDIT_ACTION_SUCCESS]: (state: MyActionState, action: MyActionEditSuccessfulAction) => {
    const { id, newAction } = action;
    const ongoingActions = [...state.data[Enum.ActionStatus.ONGOING]];
    const updateAction = ongoingActions.find(act => act.id === id);
    if (updateAction) updateAction.action = newAction;
    const newData = { ...state.data, [Enum.ActionStatus.ONGOING]: ongoingActions };
    return { ...state, isFetching: false, data: newData, error: undefined };
  },
  [GET_REASONS_SUCCESS]: (state: MyActionState, action: MyActionReasonsSuccessfulAction) => {
    const {
      response: { reasons },
    } = action;
    const newData = { ...state.data, reasons };
    return { ...state, isFetching: false, data: newData, error: undefined };
  },
});

export { myActionReducer };
