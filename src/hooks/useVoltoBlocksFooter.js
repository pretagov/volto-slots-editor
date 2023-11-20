import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getVoltoBlocksFooter } from '@plone-collective/volto-slots-editor';

export function useVoltoBlocksFooter(slotId) {
  const dispatch = useDispatch();

  // TODO: Don't need client side re-fetch
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

  if (!footerBlockData) {
    console.error('No slotted block data found', slotId);
    return {};
  }

  return slotId ? footerBlockData[slotId] : footerBlockData;
}
