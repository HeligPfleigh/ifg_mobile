import { DraftsState, SAVE_DRAFT, SaveDraftAction } from './types';
import { createReducer } from '../createReducer';
import { Enum } from '../../constants';

const initialState: DraftsState = {
  data: [
    {
      id: 1,
      type: Enum.EvaluationType.RELATIONSHIPS,
      name: 'tuan.tran',
      label: Enum.Tags.SOCIAL,
      desc: 'this is an description',
      score: 5,
    },
  ],
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
});

export { draftsReducer };
