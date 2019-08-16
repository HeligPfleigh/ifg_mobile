import { SupportedLanguage, LanguageActionTypes, LanguageState, CHANGE_LANGUAGE } from "./types";
import I18n from "../../core/i18n";

const initialState: LanguageState = {
    locale: SupportedLanguage.en
}

const languageReducer = (state = initialState, action: LanguageActionTypes): LanguageState => {
    switch (action.type) {
        case CHANGE_LANGUAGE:
            I18n.locale = action.payload.locale
            return action.payload;
        default:
            return initialState;
    }
}

export { languageReducer };