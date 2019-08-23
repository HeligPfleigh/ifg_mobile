import { SummaryState, REQUEST_SUMMARY, LOAD_SUMMARY_SUCCESSFUL, LOAD_SUMMARY_FAILURE, SummaryFailureAction, SummarySuccessfulAction, SummaryRequestAction } from "./types";
import { createReducer } from "../createReducer";

const initialState: SummaryState = {
    isFetching: false,
};

const summaryReducer = createReducer(initialState, {
    [REQUEST_SUMMARY]: (state: SummaryState, action: SummaryRequestAction) => {
        return {
            ...state,
            isFetching: true,
            currEvaluationType: action.payload,
        };
    },
    [LOAD_SUMMARY_SUCCESSFUL]: (state: SummaryState, action: SummarySuccessfulAction) => {
        let newData = Object.assign({}, state.data);
        let type = state.currEvaluationType;
        if (type) {
            newData = { ...newData, [type]: action.response }
            return {
                ...state,
                isFetching: false,
                error: undefined,
                data: newData,
                currEvaluationType: undefined,
            }
        }
        return state;
    },
    [LOAD_SUMMARY_FAILURE]: (state: SummaryState, action: SummaryFailureAction) => {
        return {
            ...state,
            isFetching: false,
            error: action.error,
            currEvaluationType: undefined,
        };
    }
});

export { summaryReducer };
