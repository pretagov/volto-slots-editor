import { GET_SLOTS_EDITOR_CONFIG } from "volto-slots-editor/constants";

export function getVoltoSlotsEditorConfig() {
  return {
    type: GET_SLOTS_EDITOR_CONFIG,
    request: {
      op: "get",
      path: `/@VoltoSlotsEditor`,
    },
  };
}
