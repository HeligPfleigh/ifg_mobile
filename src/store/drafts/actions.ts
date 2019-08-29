import { SAVE_DRAFT, DraftState, DraftActionType } from './types';

export const saveDraft = (data: DraftState): DraftActionType => ({
  type: SAVE_DRAFT,
  payload: data,
});
