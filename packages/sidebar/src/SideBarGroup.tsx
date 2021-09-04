import { Pane } from "@apptane/react-ui-pane";
import { SideBarVisualAppearance, SideBarVisualStyle, useVisualAppearance } from "@apptane/react-ui-theme";
import { Text } from "@apptane/react-ui-typography";
import { css } from "@emotion/react";
import { useContext } from "react";
import { SideBarContext } from "./SideBarContext";
import { SideBarGroupProps, SideBarGroupPropTypes } from "./SideBarGroup.types";

const StyleContainer = (style: SideBarVisualStyle, stretch?: boolean) => css`
  display: flex;
  width: 100%;
  position: relative;
  box-sizing: border-box;
  pointer-events: all;
  outline: none;
  flex-basis: auto;
  flex-grow: ${stretch ? 1 : 0};
  flex-shrink: 1;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;

  padding: ${style.padding.t}px ${style.padding.r ?? style.padding.l}px ${style.padding.b ?? style.padding.t}px
    ${style.padding.l}px;

  > * + * {
    margin-top: ${style.itemSpacing}px !important;
  }
`;

function SideBarGroup({
  children,
  colorMode,
  appearance,
  header,
  actions,
  marginTop,
  marginBottom,
  height,
  stretch,
}: SideBarGroupProps) {
  const context = useContext(SideBarContext);
  const [visualAppearance, theme] = useVisualAppearance<SideBarVisualAppearance>(
    "sideBar",
    colorMode ?? context.colorMode,
    appearance ?? context.appearance
  );

  const visualStyle = theme.components.sideBar.style;

  return (
    <div
      css={[
        StyleContainer(visualStyle, stretch),
        {
          height: height,
          marginTop: marginTop,
          marginBottom: marginBottom,
        },
      ]}>
      {context.expanded && (header || actions) && (
        <Pane
          orientation="horizontal"
          verticalAlignment="center"
          horizontalAlignment="space-between"
          paddingLeft={visualStyle.itemPadding}
          paddingRight={visualStyle.itemPadding - (actions ? 4 : 0)}
          minHeight={visualStyle.headerHeight}>
          {header && (
            <Text {...visualStyle.font.header} color={visualAppearance.text} ellipsis>
              {header}
            </Text>
          )}
          {actions}
        </Pane>
      )}
      {children}
    </div>
  );
}

SideBarGroup.displayName = "SideBarGroup";
SideBarGroup.propTypes = SideBarGroupPropTypes;

export default SideBarGroup;
