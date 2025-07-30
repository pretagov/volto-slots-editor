import { GET_SLOTS_EDITOR_CONFIG } from "volto-slots-editor";

const initialState = {
  error: null,
  hasErrror: false,
  result: [],
  loadingResults: false,
};

export const voltoSlotsEditorReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case `${GET_SLOTS_EDITOR_CONFIG}_PENDING`:
      return {
        ...state,
        loadingResults: true,
      };
    case `${GET_SLOTS_EDITOR_CONFIG}_SUCCESS`:
      return {
        ...state,
        result: action.result,
        loadingResults: false,
      };
    case `${GET_SLOTS_EDITOR_CONFIG}_FAIL`:
      return {
        ...state,
        error: action.error,
        hasError: true,
        loadingResults: false,
      };
    default:
      return state;
  }
};
