import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getVoltoSlotsEditorConfig } from '@plone-collective/volto-slots-editor';

export function useVoltoSlotsEditor(slotId) {
  const dispatch = useDispatch();

  // TODO: Don't need client side re-fetch
  useEffect(() => {
    dispatch(getVoltoSlotsEditorConfig());
  }, [dispatch]);

  const blocksFooterData = useSelector(
    (state) => state.slotsEditor?.result?.volto_slots_editor_controlpanel_data,
  );
  const footerBlockData = useMemo(() => {
    return blocksFooterData ? JSON.parse(blocksFooterData) : null;
  }, [blocksFooterData]);

  if (!footerBlockData || Object.keys(footerBlockData) < 1) {
    console.error('No slotted block data found for', slotId);
    return null;
  }

  return slotId ? footerBlockData[slotId] : footerBlockData;
}
