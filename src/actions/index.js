/**
 * Dropdown menu items actions.
 * @module actions/getDropdownMenuNavitems
 */
import { GET_ADDON_FOOTER } from '@plone-collective/volto-slots-editor';

/**
 * Get dropdown menu items.
 * @function getDropdownMenuNavitems
 * @returns {Object} Get dropdown menu items action.
 * Es: http://localhost:8080/Plone/@dropdown-menu
 */
export function getVoltoBlocksFooter() {
  return {
    type: GET_ADDON_FOOTER,
    request: {
      op: 'get',
      path: `/@VoltoSlotsEditor`,
    },
  };
}
