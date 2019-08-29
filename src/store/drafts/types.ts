import { Enum } from '../../constants';

export const SAVE_DRAFT = 'SAVE_DRAFT';

export interface DraftState {
  id: number;
  type: Enum.EvaluationType | null;
  name?: string;
  label?: Enum.Tags | null;
  desc?: string;
  score?: number;
  impactType?: Enum.ImpactType | null;
}

export interface DraftsState {
  data: DraftState[];
}

export interface SaveDraftAction {
  type: typeof SAVE_DRAFT;
  payload: DraftState;
}

export type DraftActionType = SaveDraftAction;
