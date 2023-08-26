import { CHANGE_LANGUAGE, ADD_LANGUGAGE, LanguageActionTypes } from "./languageActions";

export interface LanguageState {
  language: "en" | "zh";
  languageList: { name: string; code: string }[];
}

const defaultState: LanguageState = {
  language: "zh",
  languageList: [
    { name: "中文", code: "zh" },
    { name: "English", code: "en" },
  ],
};

export const languageReducer = (state = defaultState, action: LanguageActionTypes) => {
  switch (action.type) {
    case CHANGE_LANGUAGE: {
      const newState = { ...state, language: action.payload };
      return newState;
    }

    case ADD_LANGUGAGE: {
      const newState = {
        ...state,
        languageList: [
          ...state.languageList,
          action.payload
        ]
      };
      return newState;
    }

    default: return state;
  }
}