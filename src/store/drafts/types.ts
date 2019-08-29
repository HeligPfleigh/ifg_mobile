import { Enum } from '../../constants';

export const SAVE_DRAFT = 'SAVE_DRAFT';

export interface DraftState {
  id: number;
  type: Enum.EvaluationType;
  name?: string;
  label?: Enum.Tags | null;
  desc?: string;
  score?: number;
}

export interface DraftsState {
  data: DraftState[];
}

export interface SaveDraftAction {
  type: typeof SAVE_DRAFT;
  payload: DraftState;
}

export type DraftActionType = SaveDraftAction;
