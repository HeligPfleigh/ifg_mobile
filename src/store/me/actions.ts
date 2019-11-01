import set from 'lodash/set';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { Dispatch } from 'redux';
import api from '../../core/api';
import { getImageFormServerPath } from '../../core/utils';
import { MeActionType, ME_REQUEST, ME_FAILURE, ME_SUCCESSFUL, MeSuccessfulResponse, MeFailureError } from './types';

function meRequest(): MeActionType {
  return {
    type: ME_REQUEST,
  };
}

function meFailure(error: MeFailureError): MeActionType {
  return {
    type: ME_FAILURE,
    error,
  };
}

function meSuccessfull(response: MeSuccessfulResponse): MeActionType {
  return {
    type: ME_SUCCESSFUL,
    response,
  };
}

export function me() {
  return async function(dispatch: Dispatch<MeActionType>) {
    dispatch(meRequest());
    try {
      const { data } = await api.me();
      // clone response data
      const result = { ...data };
      // get user avatar
      const avatar = get(data, 'user.avatar');
      if (!isEmpty(avatar)) {
        try {
          set(result, 'user.avatar', await getImageFormServerPath(avatar));
        } catch (error) {
          // TODO
        }
      }
      dispatch(meSuccessfull(result));
    } catch (e) {
      const error = {
        status: e.status || 400,
        message: e.message || 'Unexpected error',
      };
      dispatch(meFailure(error));
    }
  };
}
