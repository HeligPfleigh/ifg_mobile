export enum SupportedLanguage {
    en = "en",
    fr = "fr"
}

export interface LanguageState {
    locale: SupportedLanguage
}

export const CHANGE_LANGUAGE = "CHANGE_LANGUAGE";

interface UpdateLanguageAction {
    type: typeof CHANGE_LANGUAGE;
    payload: LanguageState;
}

export type LanguageActionTypes = UpdateLanguageAction;
