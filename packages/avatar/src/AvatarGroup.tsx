import { getElementKey } from "@apptane/react-ui-core";
import { Pane } from "@apptane/react-ui-pane";
import { useTheme } from "@apptane/react-ui-theme";
import { Children, cloneElement, isValidElement } from "react";
import Avatar from "./Avatar";
import { AvatarProps } from "./Avatar.types";
import { AvatarGroupProps, AvatarGroupPropTypes } from "./AvatarGroup.types";

/**
 * `AvatarGroup` component — a stacked row of avatars.
 */
function AvatarGroup({
  children,
  size = "default",
  colorMode,
  square,
  spacing = -4,
  maxCount,
  maxWidth,
  ...other
}: AvatarGroupProps) {
  const theme = useTheme();
  const count = Children.count(children);

  let actualCount = count;
  if (maxWidth != null) {
    const actualSize =
      (typeof size === "string" ? theme.components.avatar.sizes[size] : size) ?? theme.components.avatar.sizes.default;

    const actualWidth = actualSize * actualCount + spacing * (actualCount - 1);
    if (actualWidth > maxWidth) {
      actualCount = Math.floor((maxWidth + spacing) / (actualSize + spacing));
    }
  }

  if (maxCount != null && maxCount < actualCount) {
    actualCount = maxCount;
  }

  const overflow = actualCount < count;
  const items: JSX.Element[] = [];
  Children.forEach(children, (child, index) => {
    if (child && isValidElement(child)) {
      const item = child as React.ReactElement<AvatarProps>;
      if (!overflow || index < actualCount - 1) {
        items.push(
          cloneElement(item, {
            key: getElementKey(item, index),
            size: size,
            colorMode: colorMode,
            square: square,
            marginLeft: items.length > 0 ? spacing : undefined,
            border: true,
          })
        );
      }
    }
  });

  if (overflow) {
    items.push(
      <Avatar
        key="overflow"
        colorMode={colorMode}
        size={size}
        square={square}
        marginLeft={items.length > 0 ? spacing : undefined}
        border
        overflow={count - actualCount + 1}
      />
    );
  }

  return (
    <Pane {...other} colorMode={colorMode} orientation="horizontal" width="max-content">
      {items}
    </Pane>
  );
}

AvatarGroup.displayName = "AvatarGroup";
AvatarGroup.propTypes = AvatarGroupPropTypes;

export default AvatarGroup;
