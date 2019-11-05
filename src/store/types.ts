import { rootReducer } from './reducers';

export * from './modal/types';
export * from './me/types';
export * from './summary/types';
export * from './drafts/types';
export * from './auth/types';
export * from './myaction/types';
export * from './notification/types';
export * from './tour/types';
export const LOGOUT = 'LOGOUT';

export interface CustomError {
  statusCode?: number;
  name?: string;
  message?: string;
}

export interface RequestError {
  error: Error;
}

export type AppState = ReturnType<typeof rootReducer>;
