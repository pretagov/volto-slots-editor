import { useVoltoBlocksFooter } from '@plone-collective/volto-blocks-footer';
import { RenderBlocks } from '@plone/volto/components';

export function FooterDisplay(props) {
  const footerBlockData = useVoltoBlocksFooter();

  return (
    <>
      {footerBlockData ? (
        <RenderBlocks {...props} content={footerBlockData} />
      ) : null}
    </>
  );
}
