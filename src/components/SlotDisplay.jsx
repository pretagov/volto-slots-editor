import { useVoltoSlotsEditor } from "volto-slots-editor";
import { RenderBlocks } from "@plone/volto/components";
import { getBaseUrl } from "@plone/volto/helpers";
import { useLocation } from "react-router";

export function SlotDisplay({ slot, ...props }) {
  const blockData = useVoltoSlotsEditor(slot);
  const { pathname } = useLocation();
  // Volto would normally pass path as a prop, but that means you have to always pass it at the component callsite which is messy.
  const path = props.path || getBaseUrl(pathname || "");

  if (!blockData) {
    return null;
  }

  if (!blockData.enabled) {
    return null;
  }

  return <RenderBlocks {...props} content={blockData} path={path} />;
}
