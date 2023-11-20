import { useEffect } from 'react';
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
  const footerBlockData = blocksFooterData
    ? JSON.parse(blocksFooterData)
    : null;

  if (!footerBlockData) {
    console.error('No slotted block data found', slotId);
    return {};
  }

  return slotId ? footerBlockData[slotId] : footerBlockData;
}
