import { Enum } from '../../constants';

export const REQUEST_SUMMARY = 'REQUEST_SUMMARY';
export const LOAD_SUMMARY_SUCCESSFUL = 'LOAD_SUMMARY_SUCCESSFUL';
export const LOAD_SUMMARY_FAILURE = 'LOAD_SUMMARY_FAILURE';

export interface SummaryState {
  isFetching: boolean;
  currEvaluationType?: Enum.EvaluationType;
  data?: { [propName in Enum.EvaluationType]: SummaryResponse };
  error?: SummaryError;
}

export interface SummaryError {
  status: number;
  message: string;
}

interface Factors {
  factors: string[];
  tag?: Enum.Tags | null;
  score: number;
}

export interface SummaryResponse {
  score: number;
  affections: Factors[];
}

export interface SummaryRequestAction {
  type: typeof REQUEST_SUMMARY;
  payload: Enum.EvaluationType;
}

export interface SummarySuccessfulAction {
  type: typeof LOAD_SUMMARY_SUCCESSFUL;
  response?: SummaryResponse;
}

export interface SummaryFailureAction {
  type: typeof LOAD_SUMMARY_FAILURE;
  error?: SummaryError;
}

export type SummaryActionType = SummaryFailureAction | SummaryRequestAction | SummarySuccessfulAction;
