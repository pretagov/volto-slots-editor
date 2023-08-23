import { useVoltoBlocksFooter } from '@plone-collective/volto-blocks-footer';
import { RenderBlocks } from '@plone/volto/components';
import {
  blockNeedsSection,
  blocksNeedSections,
  sectionFields,
} from 'nsw-design-system-plone6/components/Blocks/Section/utils';
import { BlocksAsSection } from 'nsw-design-system-plone6/components/Components/Section';

export function FooterDisplay(props) {
  const footerBlockData = useVoltoBlocksFooter();

  if (!footerBlockData) {
    return null;
  }

  if (blocksNeedSections(footerBlockData?.blocks)) {
    return (
      <BlocksAsSection
        blocksLayout={footerBlockData['blocks_layout'].items}
        blocksData={footerBlockData.blocks}
        // content={content}
      />
    );
  }

  return <RenderBlocks {...props} content={footerBlockData} />;
}
