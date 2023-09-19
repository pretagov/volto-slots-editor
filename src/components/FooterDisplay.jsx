import { useVoltoBlocksFooter } from '@plone-collective/volto-blocks-footer';
import { RenderBlocks } from '@plone/volto/components';

export function FooterDisplay(props) {
  const footerBlockData = useVoltoBlocksFooter();

  if (!footerBlockData) {
    return null;
  }

  return <RenderBlocks {...props} content={footerBlockData} />;
}
