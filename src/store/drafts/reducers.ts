import { DraftsState, SAVE_DRAFT, SaveDraftAction, REMOVE_DRAFT, RemoveDraftAction } from './types';
import { createReducer } from '../createReducer';

const initialState: DraftsState = {
  data: [],
};

const draftsReducer = createReducer(initialState, {
  [SAVE_DRAFT]: (state: DraftsState, action: SaveDraftAction) => {
    const existedDraftIdx = state.data.findIndex(item => item.id === action.payload.id);
    if (existedDraftIdx === -1) {
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    }
    const newDrafts = [...state.data];
    newDrafts[existedDraftIdx] = action.payload;

    return {
      ...state,
      data: newDrafts,
    };
  },
  [REMOVE_DRAFT]: (state: DraftsState, action: RemoveDraftAction) => {
    const { id } = action;
    const newDrafts = state.data.filter(draft => draft.id !== id);
    return {
      ...state,
      data: newDrafts,
    };
  },
});

export { draftsReducer };
