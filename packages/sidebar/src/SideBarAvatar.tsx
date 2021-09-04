import { Avatar } from "@apptane/react-ui-avatar";
import { Pane } from "@apptane/react-ui-pane";
import { SideBarVisualAppearance, useVisualAppearance } from "@apptane/react-ui-theme";
import { StyleTextEllipsis } from "@apptane/react-ui-typography";
import { useContext } from "react";
import { SideBarAvatarProps, SideBarAvatarPropTypes } from "./SideBarAvatar.types";
import { SideBarContext } from "./SideBarContext";
import SideBarItemContent from "./SideBarItemContent";

function SideBarAvatar({ children, colorMode, appearance, onClick, checked, disabled, ...other }: SideBarAvatarProps) {
  const context = useContext(SideBarContext);
  const [visualAppearance, theme] = useVisualAppearance<SideBarVisualAppearance>(
    "sideBar",
    colorMode ?? context.colorMode,
    appearance ?? context.appearance
  );

  const visualStyle = theme.components.sideBar.style;

  // adjust left/right padding to account for the difference in size
  // between icon and avatar
  const padding =
    visualStyle.padding.l +
    visualStyle.itemPadding +
    visualStyle.iconSize / 2 -
    (visualStyle.avatarPadding + visualStyle.avatarSize / 2);

  return (
    <Pane
      paddingTop={visualStyle.padding.t}
      paddingRight={padding}
      paddingBottom={visualStyle.padding.b ?? visualStyle.padding.t}
      paddingLeft={padding}>
      <SideBarItemContent
        theme={theme}
        colorMode={colorMode ?? context.colorMode}
        visualAppearance={visualAppearance}
        visualStyle={visualStyle}
        checked={checked}
        disabled={disabled}
        onClick={onClick}
        height={visualStyle.avatarHeight}
        padding={visualStyle.avatarPadding}
        expanded={context.expanded}
        tooltipContent={children}
        collapsedContent={<Avatar {...other} size={visualStyle.avatarSize} />}
        content={
          <Pane orientation="horizontal" verticalAlignment="center">
            <Avatar
              {...other}
              colorMode={colorMode}
              size={visualStyle.avatarSize}
              marginRight={visualStyle.avatarSpacing}
            />
            <div css={StyleTextEllipsis}>{children}</div>
          </Pane>
        }></SideBarItemContent>
    </Pane>
  );
}

SideBarAvatar.displayName = "SideBarAvatar";
SideBarAvatar.propTypes = SideBarAvatarPropTypes;

export default SideBarAvatar;
