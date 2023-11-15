import { useVoltoBlocksFooter } from '@plone-collective/volto-blocks-footer';
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
