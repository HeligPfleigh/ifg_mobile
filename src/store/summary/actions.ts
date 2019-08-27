import { Dispatch } from 'redux';

import api from '../../core/api';
import {
  REQUEST_SUMMARY,
  SummaryActionType,
  SummaryError,
  SummaryResponse,
  LOAD_SUMMARY_FAILURE,
  LOAD_SUMMARY_SUCCESSFUL,
} from './types';
import { Enum } from '../../constants';

function summaryRequest(type: Enum.EvaluationType): SummaryActionType {
  return {
    type: REQUEST_SUMMARY,
    payload: type,
  };
}

function summaryFailure(error: SummaryError): SummaryActionType {
  return {
    type: LOAD_SUMMARY_FAILURE,
    error,
  };
}

function summarySuccessfull(response: SummaryResponse): SummaryActionType {
  return {
    type: LOAD_SUMMARY_SUCCESSFUL,
    response,
  };
}

export function loadSummary(evaluationType: Enum.EvaluationType) {
  return async function(dispatch: Dispatch<SummaryActionType>) {
    dispatch(summaryRequest(evaluationType));
    try {
      const response = await api.getSummary(evaluationType);
      dispatch(summarySuccessfull(response));
    } catch (e) {
      const error = {
        status: e.status || 400,
        message: e.message || 'Unexpected error',
      };
      dispatch(summaryFailure(error));
    }
  };
}
