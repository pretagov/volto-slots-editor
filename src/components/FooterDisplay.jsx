import { getVoltoBlocksFooter } from '@plone-collective/volto-blocks-footer';

import { RenderBlocks } from '@plone/volto/components';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export function FooterDisplay(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVoltoBlocksFooter());
  }, [dispatch]);

  const blocksFooterData = useSelector(
    (state) =>
      state.voltoBlocksFooter?.result?.volto_blocks_footer_controlpanel_data,
  );
  const footerBlockData = blocksFooterData
    ? JSON.parse(blocksFooterData)
    : null;

  return (
    <>
      {footerBlockData ? (
        <RenderBlocks {...props} content={footerBlockData} />
      ) : null}
    </>
  );
}
