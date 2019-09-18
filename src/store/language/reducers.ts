import { SupportedLanguage, LanguageActionTypes, LanguageState } from './types';
import I18n from '../../core/i18n';
import { createReducer } from '../createReducer';

export const initialState: LanguageState = {
  locale: SupportedLanguage.en,
};

const languageReducer = createReducer(initialState, {
  CHANGE_LANGUAGE: (state: LanguageState, action: LanguageActionTypes) => {
    I18n.locale = action.payload.locale;
    return { ...state, locale: action.payload.locale };
  },
});

export { languageReducer };
