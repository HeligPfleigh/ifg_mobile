import { Dispatch } from 'redux';

import api from "../../core/api";
import { MeActionType, ME_REQUEST, ME_FAILURE, ME_SUCCESSFUL, MeSuccessfulResponse, MeFailureError } from "./types";

function meRequest(): MeActionType {
    return {
        type: ME_REQUEST
    }
}

function meFailure(error: MeFailureError): MeActionType {
    return {
        type: ME_FAILURE,
        error,
    }
}

function meSuccessfull(response: MeSuccessfulResponse): MeActionType {
    return {
        type: ME_SUCCESSFUL,
        response,
    }
}

export function me() {
    return async function(dispatch: Dispatch<MeActionType>) {
        dispatch(meRequest());
        try {
            const response = await api.me();
            dispatch(meSuccessfull(response));
        } catch (e) {
            const error = {
                status: e.status || 400,
                message: e.message || 'Unexpected error',
            }
            dispatch(meFailure(error))
        }
    }
}
