import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getVoltoBlocksFooter } from '@plone-collective/volto-blocks-footer';

export function useVoltoBlocksFooter() {
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
  return footerBlockData;
}
