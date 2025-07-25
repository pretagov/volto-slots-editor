import { RenderBlocks } from "@plone/volto/components";
import { useVoltoSlotsEditor } from "volto-slots-editor";

export function SlotDisplay({ slot, ...props }) {
  const blockData = useVoltoSlotsEditor(slot);

  if (!blockData) {
    return null;
  }

  if (!blockData.enabled) {
    return null;
  }

  return <RenderBlocks {...props} content={blockData} />;
}
