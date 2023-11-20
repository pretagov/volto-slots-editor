import { useVoltoSlotsEditor } from '@plone-collective/volto-slots-editor';
import { RenderBlocks } from '@plone/volto/components';

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
