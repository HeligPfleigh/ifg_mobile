import { MeState, MeActionType, ME_REQUEST, ME_SUCCESSFUL, ME_FAILURE, MeSuccessfulAction, MeFailureAction } from "./types";
import { createReducer } from "../createReducer";

const initialState: MeState = {
    isFetching: false,
    data: {
        name: '',
        avatar: undefined,
        score: {
            relationships: 0,
            activities: 0,
            intakes: 0,
            other: 0,
            overall: 0,
        },
    },
    error: undefined,
};

const meReducer = createReducer(initialState, {
    [ME_REQUEST]: (state: MeState) => {
        return { ...state, isFetching: true }
    },
    [ME_SUCCESSFUL]: (state: MeState, action: MeSuccessfulAction) => {
        return {
            ...state,
            isFetching: false,
            data: action.response,
            error: undefined
        }
    },
    [ME_FAILURE]: (state: MeState, action: MeFailureAction) => {
        return {
            ...state,
            isFetching: false,
            error: action.error,
        }
    }
});

export { meReducer };
