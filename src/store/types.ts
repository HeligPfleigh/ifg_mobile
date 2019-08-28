import { rootReducer } from './reducers';

export * from './modal/types';
export * from './me/types';
export * from './summary/types';
export type AppState = ReturnType<typeof rootReducer>;
