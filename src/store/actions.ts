import { LOGOUT } from './types';

export * from './me/actions';
export * from './summary/actions';
export * from './modal/actions';
export * from './drafts/actions';
export * from './auth/actions';
export * from './myaction/actions';
export * from './notification/actions';
export * from './language/actions';
export * from './tour/actions';

export const logout = () => ({
  type: LOGOUT,
});
