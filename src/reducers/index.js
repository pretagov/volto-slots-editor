/**
 * Dropdown menu items reducer.
 * @module reducers/dropdownMenuNavItemsReducer
 */

import { GET_ADDON_FOOTER } from '@plone-collective/volto-slots-editor';

const initialState = {
  error: null,
  hasErrror: false,
  result: [],
  loadingResults: false,
};

export const voltoBlocksFooterReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case `${GET_ADDON_FOOTER}_PENDING`:
      return {
        ...state,
        loadingResults: true,
      };
    case `${GET_ADDON_FOOTER}_SUCCESS`:
      return {
        ...state,
        result: action.result,
        loadingResults: false,
      };
    case `${GET_ADDON_FOOTER}_FAIL`:
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
