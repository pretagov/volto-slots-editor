import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getVoltoSlotsEditorConfig } from '@plone-collective/volto-slots-editor';

export function useVoltoSlotsEditor(slotId) {
  const dispatch = useDispatch();

  // TODO: Don't need client side re-fetch
  useEffect(() => {
    dispatch(getVoltoSlotsEditorConfig());
  }, [dispatch]);

  const blocksData = useSelector(
    (state) => state.slotsEditor?.result?.volto_slots_editor_controlpanel_data,
  );

  if (!blocksData || Object.keys(blocksData) < 1) {
    // console.error('No slotted block data found for', slotId);
    return null;
  }

  return slotId ? blocksData[slotId] : blocksData;
}
