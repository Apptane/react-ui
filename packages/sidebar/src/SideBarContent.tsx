import { StyleMargin } from "@apptane/react-ui-core";
import { createTooltip } from "@apptane/react-ui-tooltip";
import { css } from "@emotion/react";
import { useContext } from "react";
import { SideBarContentProps, SideBarContentPropTypes } from "./SideBarContent.types";
import { SideBarContext } from "./SideBarContext";

const StyleWrapper = css`
  display: flex;
  overflow: hidden;
`;

function SideBarContent({
  content,
  collapsedContent,
  tooltipContent,
  colorMode,
  margin,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  m,
  mt,
  mr,
  mb,
  ml,
}: SideBarContentProps) {
  const context = useContext(SideBarContext);
  const marginProps = { margin, marginTop, marginRight, marginBottom, marginLeft, m, mt, mr, mb, ml };
  const element = (
    <div css={[StyleWrapper, StyleMargin(marginProps)]}>{context.expanded ? content : collapsedContent}</div>
  );

  return !context.expanded && tooltipContent
    ? createTooltip({
        children: element,
        content: tooltipContent,
        placement: "right",
        arrowVisible: true,
        colorMode: colorMode,
      })
    : element;
}

SideBarContent.displayName = "SideBarContent";
SideBarContent.propTypes = SideBarContentPropTypes;

export default SideBarContent;
