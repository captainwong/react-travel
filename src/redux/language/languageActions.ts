export const CHANGE_LANGUAGE = "change_language";
export const ADD_LANGUGAGE = "add_language";

interface ChangeLanguageAction {
  type: typeof CHANGE_LANGUAGE;
  payload: "zh" | "en";
}

interface AddLanguageAction {
  type: typeof ADD_LANGUGAGE;
  payload: { name: string, code: string };
}

export type LanguageActionTypes = ChangeLanguageAction | AddLanguageAction;

export const changeLanguageActionCreator = (languageCode: "zh" | "en") : ChangeLanguageAction => {
  return {
    type: CHANGE_LANGUAGE,
    payload: languageCode,
  };
}

export const addLanguageActionCreator = (name: string, code: string) : AddLanguageAction => {
  return {
    type: ADD_LANGUGAGE,
    payload: { name, code },
  };
}
