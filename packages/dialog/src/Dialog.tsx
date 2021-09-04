import { OverlayChildProps } from "@apptane/react-ui-behaviors";
import { Button, IconButton } from "@apptane/react-ui-button";
import { AnimationStyle } from "@apptane/react-ui-core";
import { Pane } from "@apptane/react-ui-pane";
import { DialogVisualAppearance, useVisualAppearance } from "@apptane/react-ui-theme";
import { Paragraph } from "@apptane/react-ui-typography";
import { css } from "@emotion/react";
import { DialogProps, DialogPropTypes } from "./Dialog.types";

export const StyleCloseButton = (top: number, right: number) => css`
  position: absolute;
  top: ${top}px;
  right: ${right}px;
  z-index: 10;
`;

const StylePositioner = css`
  overflow: auto;
  position: relative; // required for z-index to work
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  pointer-events: all;
`;

const StyleTransition = (scale: number, animation: AnimationStyle, duration?: number) => css`
  transition-property: opacity, transform;
  transition-delay: ${animation.delay}ms;
  transition-duration: ${duration ?? animation.duration}ms;
  transition-timing-function: ${animation.function};
  transform: scale(${scale});

  &[transition-state="entered"] {
    opacity: 1;
    transform: scale(1);
  }

  &[transition-state="entering"],
  &[transition-state="exiting"] {
    opacity: 0;
    transform: scale((${scale});
  }
`;

/**
 * `Dialog` component — a pre-defined layout for dialog boxes.
 */
function Dialog({
  children,
  colorMode,
  appearance,
  kind = "default",
  heroImage,
  header,
  description,
  width,
  intent = "none",
  cancelButtonContent = "Cancel",
  confirmButtonContent = "Confirm",
  confirmButtonDisabled,
  confirmButtonSpinner,
  closeButtonVisible = true,
  cancelButtonVisible = true,
  confirmButtonVisible = true,
  buttonSize,
  buttonAlignment,
  onConfirm,
  onCancel,
  background,
  border,
  centered,
  animated,
  transitionDuration,
  transitionState,
  close,
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
}: DialogProps & OverlayChildProps) {
  const [visualAppearance, theme] = useVisualAppearance<DialogVisualAppearance>(
    "dialog",
    colorMode,
    appearance,
    intent
  );

  const visualStyle = theme.components.dialog.style(kind);
  const duration = transitionDuration || theme.components.dialog.animation.duration;

  const cancel = typeof onCancel === "function" ? () => onCancel(close) : close;
  const confirm = typeof onConfirm === "function" ? () => onConfirm(close) : undefined;
  const hasHeader = header || description || (kind !== "hero" && heroImage);

  return (
    <div
      transition-state={transitionState}
      css={[
        centered && StylePositioner,
        animated && StyleTransition(0.75, theme.components.dialog.animation, duration),
        theme.elevation(visualAppearance.elevation),
      ]}>
      <Pane
        {...other}
        colorMode={colorMode}
        accessibilityRole="dialog"
        paddingTop={paddingTop ?? pt ?? padding ?? p ?? visualStyle.padding.t}
        paddingRight={paddingRight ?? pr ?? padding ?? p ?? visualStyle.padding.r ?? visualStyle.padding.l}
        paddingBottom={paddingBottom ?? pb ?? padding ?? p ?? visualStyle.padding.b ?? visualStyle.padding.t}
        paddingLeft={paddingLeft ?? pl ?? padding ?? p ?? visualStyle.padding.l}
        width={width ?? visualStyle.width}
        border={border ?? visualAppearance.border}
        background={background ?? visualAppearance.background}
        cornerRadius={theme.components.pane.style.borderRadius}
        zIndex={0}>
        {closeButtonVisible && (
          <div
            css={StyleCloseButton(
              visualStyle.closeButtonMargin.t,
              visualStyle.closeButtonMargin.r ?? visualStyle.closeButtonMargin.t
            )}>
            <IconButton
              colorMode={colorMode}
              accessibilityLabel="Close"
              iconName="i:close"
              appearance="minimal"
              intent="neutral"
              onClick={cancel}
              size={visualStyle.closeButtonSize}
            />
          </div>
        )}
        {hasHeader && (
          <Pane marginBottom={visualStyle.contentSpacing} horizontalAlignment={visualStyle.headerAlignment}>
            {kind === "hero" && heroImage}
            {header && (
              <Paragraph
                {...visualStyle.font.header}
                color={visualAppearance.text}
                marginBottom={visualStyle.headerSpacing}>
                {header}
              </Paragraph>
            )}
            {description && (
              <Paragraph {...visualStyle.font.description} color={visualAppearance.description}>
                {description}
              </Paragraph>
            )}
          </Pane>
        )}
        {children}
        {(confirmButtonVisible || cancelButtonVisible) && (
          <Pane
            marginTop={visualStyle.contentSpacing}
            orientation="horizontal"
            verticalAlignment="center"
            horizontalAlignment={buttonAlignment ?? visualStyle.buttonAlignment}>
            {cancelButtonVisible && (
              <Button
                colorMode={colorMode}
                size={buttonSize ?? visualStyle.buttonSize}
                onClick={cancel}
                appearance="secondary">
                {cancelButtonContent}
              </Button>
            )}
            {confirmButtonVisible && (
              <Button
                colorMode={colorMode}
                size={buttonSize ?? visualStyle.buttonSize}
                disabled={confirmButtonDisabled}
                spinner={confirmButtonSpinner}
                marginLeft={cancelButtonVisible ? visualStyle.buttonSpacing : 0}
                onClick={confirm}
                appearance="primary"
                intent={intent}>
                {confirmButtonContent}
              </Button>
            )}
          </Pane>
        )}
      </Pane>
    </div>
  );
}

Dialog.displayName = "Dialog";
Dialog.propTypes = DialogPropTypes;

export default Dialog;
