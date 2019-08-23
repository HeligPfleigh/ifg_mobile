import { rootReducer } from './reducers';

export * from './me/types';
export type AppState = ReturnType<typeof rootReducer>;