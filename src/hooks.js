import { useSelector } from "react-redux";

export function useVoltoSlotsEditor(slotId) {
  const blocksData = useSelector(
    (state) => state.content?.data?.["@components"]?.VoltoSlotsEditor,
  );

  if (!blocksData || Object.keys(blocksData).length < 1) {
    return null;
  }

  return slotId ? blocksData[slotId] : blocksData;
}
