import { LanguageState, CHANGE_LANGUAGE } from './types';

export function changeLanguage(newLanguage: LanguageState) {
  return {
    type: CHANGE_LANGUAGE,
    payload: newLanguage,
  };
}
