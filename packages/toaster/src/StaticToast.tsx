import { Button } from "@apptane/react-ui-button";
import { BuiltinGlyphsNamespace, Intent } from "@apptane/react-ui-core";
import { Icon } from "@apptane/react-ui-icon";
import { MediaObject } from "@apptane/react-ui-layout";
import { Pane } from "@apptane/react-ui-pane";
import { ToastVisualAppearance, useVisualAppearance } from "@apptane/react-ui-theme";
import { Paragraph, Text } from "@apptane/react-ui-typography";
import { ToastProps } from "./Toast.types";

function getIntentIcon(intent: Intent) {
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
 * Non-animated static toast component.
 */
function StaticToast({
  children,
  header,
  colorMode,
  appearance = "default",
  maxWidth,
  intent = "none",
  iconColor,
  iconName,
  iconData,
  iconSize,
  actionContent = "Hide",
  actionHidden,
  onAction,
}: Omit<ToastProps, "visible" | "zIndex" | "duration" | "onClosed">) {
  const [visualAppearance, theme] = useVisualAppearance<ToastVisualAppearance>("toast", colorMode, appearance, intent);
  const visualStyle = theme.components.toast.style;

  return (
    <Pane
      colorMode={colorMode}
      accessibilityRole="alert"
      orientation="horizontal"
      verticalAlignment="stretch"
      elevation={visualAppearance.elevation}
      background={visualAppearance.back}
      border={visualAppearance.border}
      cornerRadius={visualStyle.borderRadius}
      maxWidth={maxWidth ?? visualStyle.maxWidth}>
      <Pane
        orientation="horizontal"
        grow={1}
        paddingTop={visualStyle.padding.t}
        paddingRight={visualStyle.padding.r ?? visualStyle.padding.l}
        paddingBottom={visualStyle.padding.b ?? visualStyle.padding.t}
        paddingLeft={visualStyle.padding.l}>
        <MediaObject
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
              marginTop={header ? visualStyle.contentSpacing : undefined}>
              {children}
            </Paragraph>
          )}
        </MediaObject>
      </Pane>
      {!actionHidden && (
        <Pane verticalAlignment="center" shrink={0} grow={0} borderLeft={visualAppearance.border}>
          <Button
            colorMode={colorMode}
            appearance={visualAppearance.actionAppearance}
            intent="neutral"
            onClick={onAction}
            size={visualStyle.actionSize}
            marginTop={visualStyle.actionMargin.t}
            marginRight={visualStyle.actionMargin.r ?? visualStyle.actionMargin.l}
            marginBottom={visualStyle.actionMargin.b ?? visualStyle.actionMargin.t}
            marginLeft={visualStyle.actionMargin.l}>
            {actionContent}
          </Button>
        </Pane>
      )}
    </Pane>
  );
}

StaticToast.displayName = "ToastCore";

export default StaticToast;
