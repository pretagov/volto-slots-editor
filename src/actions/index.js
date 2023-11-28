import { GET_SLOTS_EDITOR_CONFIG } from '@plone-collective/volto-slots-editor';

export function getVoltoSlotsEditorConfig() {
  return {
    type: GET_SLOTS_EDITOR_CONFIG,
    request: {
      op: 'get',
      path: `/@VoltoSlotsEditor`,
    },
  };
}
