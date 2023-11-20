import { useVoltoBlocksFooter } from '@plone-collective/volto-slots-editor';
import { RenderBlocks } from '@plone/volto/components';

export function FooterDisplay({ slot, ...props }) {
  const blockData = useVoltoBlocksFooter(slot);

  if (!blockData) {
    return null;
  }

  if (!blockData.enabled) {
    return null;
  }

  return <RenderBlocks {...props} content={blockData} />;
}
