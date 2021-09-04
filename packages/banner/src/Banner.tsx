import { BuiltinGlyphsNamespace, Intent } from "@apptane/react-ui-core";
import { Icon } from "@apptane/react-ui-icon";
import { MediaObject } from "@apptane/react-ui-layout";
import { Pane } from "@apptane/react-ui-pane";
import { BannerVisualAppearance, useVisualAppearance } from "@apptane/react-ui-theme";
import { Paragraph, Text } from "@apptane/react-ui-typography";
import { BannerProps, BannerPropTypes } from "./Banner.types";

export function getIntentIcon(intent: Intent) {
  switch (intent) {
    case "success":
      return BuiltinGlyphsNamespace + "check-circle";
    case "warning":
    case "danger":
    case "error":
      return BuiltinGlyphsNamespace + "warning-circle";
    case "neutral":
      return BuiltinGlyphsNamespace + "info-circle";
  }
}

/**
 * `Banner` component — panel with icon, header, content and actions.
 * Supports different visual styles based on intent.
 */
function Banner({
  children,
  colorMode,
  appearance,
  header,
  actions,
  intent = "none",
  orientation = "horizontal",
  card,
  iconAlignment = "center",
  iconColor,
  iconName,
  iconData,
  iconSize,
  padding,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  p,
  pt,
  pr,
  pb,
  pl,
  ...other
}: BannerProps) {
  const [visualAppearance, theme] = useVisualAppearance<BannerVisualAppearance>(
    "banner",
    colorMode,
    appearance,
    intent
  );

  const visualStyle = theme.components.banner.style;

  return (
    <Pane
      {...other}
      colorMode={colorMode}
      grow={1}
      verticalAlignment="center"
      background={visualAppearance.back}
      border={card ? visualAppearance.border : undefined}
      cornerRadius={card ? visualStyle.borderRadius : undefined}
      orientation={orientation}
      paddingTop={paddingTop ?? pt ?? padding ?? p ?? visualStyle.padding.t}
      paddingRight={paddingRight ?? pr ?? padding ?? p ?? visualStyle.padding.r ?? visualStyle.padding.l}
      paddingBottom={paddingBottom ?? pb ?? padding ?? p ?? visualStyle.padding.b ?? visualStyle.padding.t}
      paddingLeft={paddingLeft ?? pl ?? padding ?? p ?? visualStyle.padding.l}>
      <Pane orientation="horizontal" verticalAlignment="center" grow={1}>
        <MediaObject
          alignment={iconAlignment}
          spacing={visualStyle.iconSpacing}
          media={
            intent !== "none" && (
              <Icon
                color={iconColor ?? visualAppearance.icon}
                size={iconSize ?? visualStyle.iconSize}
                name={iconName ?? getIntentIcon(intent)}
                data={iconData}
              />
            )
          }
          header={
            header && (
              <Text {...visualStyle.font.header} color={visualAppearance.text} alignment="left">
                {header}
              </Text>
            )
          }>
          {children && (
            <Paragraph
              {...visualStyle.font.body}
              color={visualAppearance.text}
              alignment="left"
              marginTop={header != null ? visualStyle.contentSpacing : undefined}>
              {children}
            </Paragraph>
          )}
        </MediaObject>
      </Pane>
      {actions && (
        <Pane
          shrink={0}
          verticalAlignment="center"
          marginTop={orientation === "vertical" ? visualStyle.actionSpacing : undefined}
          marginLeft={orientation === "horizontal" ? visualStyle.actionSpacing : undefined}>
          {actions}
        </Pane>
      )}
    </Pane>
  );
}

Banner.displayName = "Banner";
Banner.propTypes = BannerPropTypes;

export default Banner;
