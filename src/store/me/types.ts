export const ME_REQUEST = 'ME_REQUEST';
export const ME_SUCCESSFUL = 'ME_SUCCESSFUL';
export const ME_FAILURE = 'ME_FAILURE';

export interface MeSuccessfulResponse {
  username: string;
  avatar?: string | null;
  score: {
    relationships?: number;
    activities?: number;
    intakes?: number;
    other?: number;
    overall?: number;
  };
}

export interface MeFailureError {
  status: number;
  message: string;
}

export interface MeState {
  isFetching: boolean;
  data: MeSuccessfulResponse;
  error?: MeFailureError;
}

export interface MeRequestAction {
  type: typeof ME_REQUEST;
}

export interface MeSuccessfulAction {
  type: typeof ME_SUCCESSFUL;
  response?: MeSuccessfulResponse;
}

export interface MeFailureAction {
  type: typeof ME_FAILURE;
  error?: MeFailureError;
}

export type MeActionType = MeFailureAction | MeRequestAction | MeSuccessfulAction;
