import { Overlay, OverlayChildProps } from "@apptane/react-ui-behaviors";
import { IconButton } from "@apptane/react-ui-button";
import { AnimationStyle } from "@apptane/react-ui-core";
import { Pane } from "@apptane/react-ui-pane";
import { SidePanelVisualAppearance, useVisualAppearance } from "@apptane/react-ui-theme";
import { css } from "@emotion/react";
import { SidePanelProps, SidePanelPropTypes } from "./SidePanel.types";

export const StyleCloseButton = (top: number, right: number) => css`
  position: absolute;
  top: ${top}px;
  right: ${right}px;
  z-index: 10;
`;

const StyleTransition = (animation: AnimationStyle, duration?: number) => css`
  transition-property: width, height;
  transition-delay: ${animation.delay}ms;
  transition-duration: ${duration ?? animation.duration}ms;
  transition-timing-function: ${animation.function};
`;

const StyleContainerBase = css`
  overflow: hidden;
  position: absolute;
  display: flex;
  box-sizing: border-box;
  flex-wrap: nowrap;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  transition-property: width;
  pointer-events: all;
  z-index: 1;
`;

const StyleContainerVertical = css`
  ${StyleContainerBase};
  height: 100%;
`;

const StyleContainerHorizontal = css`
  ${StyleContainerBase};
  width: 100%;
`;

const StyleContainer = {
  left: css`
    ${StyleContainerVertical};
    left: 0;
  `,
  right: css`
    ${StyleContainerVertical};
    right: 0;
  `,

  top: css`
    ${StyleContainerHorizontal};
    top: 0;
  `,

  bottom: css`
    ${StyleContainerHorizontal};
    bottom: 0;
  `,
};

/**
 * `SidePanel` component — slide-out animated side panel.
 */
function SidePanel({
  children,
  colorMode,
  appearance,
  size,
  side,
  closeButtonVisible,
  visible,
  backdrop = false,
  shouldCaptureFocus,
  shouldCloseOnEsc,
  shouldCloseOnBackdropClick,
  onCloseOnEsc,
  onClosing,
  transitionDuration,
  enableBodyScroll,
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
  ...other
}: SidePanelProps) {
  const [visualAppearance, theme] = useVisualAppearance<SidePanelVisualAppearance>("sidePanel", colorMode, appearance);
  const visualStyle = theme.components.sidePanel.style;
  const effectiveTransitionDuration = transitionDuration ?? theme.components.sidePanel.animation.duration;

  const horizontal = side === "top" || side === "bottom";
  return (
    <Overlay
      visible={visible}
      backdrop={backdrop}
      transitionDuration={effectiveTransitionDuration}
      enableBodyScroll={enableBodyScroll ?? !backdrop}
      shouldCaptureFocus={shouldCaptureFocus}
      shouldCloseOnEsc={shouldCloseOnEsc}
      shouldCloseOnBackdropClick={shouldCloseOnBackdropClick ?? true}
      onCloseOnEsc={onCloseOnEsc}
      onClosing={onClosing}
      margin={margin}
      marginTop={marginTop}
      marginRight={marginRight}
      marginBottom={marginBottom}
      marginLeft={marginLeft}
      m={m}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}>
      {({ close, transitionState }: OverlayChildProps) => (
        <div
          transition-state={transitionState}
          css={[
            StyleContainer[side],
            StyleTransition(theme.components.sidePanel.animation, effectiveTransitionDuration),
            theme.elevation(visualAppearance.elevation),
          ]}
          style={{
            width: horizontal ? undefined : transitionState === "entered" ? size : 0,
            height: horizontal ? (transitionState === "entered" ? size : 0) : undefined,
          }}>
          <Pane
            {...other}
            colorMode={colorMode}
            accessibilityRole={other.accessibilityRole ?? "dialog"}
            background={other.background ?? visualAppearance.background}
            borderTop={side === "bottom" ? visualAppearance.border : other.borderTop}
            borderRight={side === "left" ? visualAppearance.border : other.borderRight}
            borderBottom={side === "top" ? visualAppearance.border : other.borderBottom}
            borderLeft={side === "right" ? visualAppearance.border : other.borderLeft}
            grow={1}
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
                  onClick={close}
                  size={visualStyle.closeButtonSize}
                />
              </div>
            )}
            {children}
          </Pane>
        </div>
      )}
    </Overlay>
  );
}

SidePanel.displayName = "SidePanel";
SidePanel.propTypes = SidePanelPropTypes;

export default SidePanel;
