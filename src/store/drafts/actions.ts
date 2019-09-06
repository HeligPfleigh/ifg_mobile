import { SAVE_DRAFT, DraftState, DraftActionType, REMOVE_DRAFT } from './types';

export const saveDraft = (data: DraftState): DraftActionType => ({
  type: SAVE_DRAFT,
  payload: data,
});

export const removeDraft = (id: number): DraftActionType => ({
  type: REMOVE_DRAFT,
  id,
});
