import {
  MyActionState,
  REQUEST_ACTION,
  REQUEST_ACTION_SUCCESS,
  REQUEST_ACTION_FAIL,
  MyActionSuccessfulAction,
  MyActionFailureAction,
} from './types';
import { Enum } from '../../constants';
import { createReducer } from '../createReducer';

const initialState: MyActionState = {
  isFetching: false,
  data: {
    [Enum.ActionStatus.ONGOING]: [],
    [Enum.ActionStatus.ARCHIEVED]: [],
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
});

export { myActionReducer };
