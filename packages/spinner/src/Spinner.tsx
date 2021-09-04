import { Color, resolveTextColor, StyleMargin } from "@apptane/react-ui-core";
import { useColorMode, useTheme } from "@apptane/react-ui-theme";
import { css } from "@emotion/react";
import { memo } from "react";
import { SpinnerProps, SpinnerPropTypes } from "./Spinner.types";

const StyleBase = (size: number, inline?: boolean) => css`
  display: ${inline ? "inline-flex" : "flex"};
  height: ${size}px;
  width: ${size}px;
`;

type AnimatedSpinnerProps = {
  color: Color;
  size: number;
};

const AnimatedClipSpinner = ({ color, size }: AnimatedSpinnerProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
    <g stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" fillRule="evenodd">
      <circle strokeOpacity=".1" cx="12" cy="12" r="10" />
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12">
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 12 12"
          to="360 12 12"
          dur="1s"
          repeatCount="indefinite"
        />
      </path>
    </g>
  </svg>
);

const AnimatedTailSpinner = ({ color, size }: AnimatedSpinnerProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
    <defs>
      <linearGradient x1="8%" y1="0%" x2="66%" y2="24%" id="--eb-spinner-tail-a">
        <stop stopColor={color} stopOpacity="0" offset="0%" />
        <stop stopColor={color} stopOpacity=".6" offset="60%" />
        <stop stopColor={color} offset="100%" />
      </linearGradient>
    </defs>
    <g strokeWidth="2" strokeLinecap="round" fill="none" fillRule="evenodd">
      <path d="M12 2c5.523 0 10 4.477 10 10" stroke="url(#--eb-spinner-tail-a)">
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 12 12"
          to="360 12 12"
          dur="1s"
          repeatCount="indefinite"
        />
      </path>
    </g>
  </svg>
);

const AnimatedPulseSpinner = ({ color, size }: AnimatedSpinnerProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" stroke={color} width={size} height={size} viewBox="0 0 24 24">
    <g strokeWidth="2" fill="none" fillRule="evenodd">
      <circle cx="12" cy="12" r="1">
        <animate
          attributeName="r"
          begin="0s"
          dur="1.8s"
          values="1; 10"
          calcMode="spline"
          keyTimes="0; 1"
          keySplines="0.165, 0.84, 0.44, 1"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-opacity"
          begin="0s"
          dur="1.8s"
          values="1; 0"
          calcMode="spline"
          keyTimes="0; 1"
          keySplines="0.3, 0.61, 0.355, 1"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="12" cy="12" r="1">
        <animate
          attributeName="r"
          begin="-0.9s"
          dur="1.8s"
          values="1; 10"
          calcMode="spline"
          keyTimes="0; 1"
          keySplines="0.165, 0.84, 0.44, 1"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-opacity"
          begin="-0.9s"
          dur="1.8s"
          values="1; 0"
          calcMode="spline"
          keyTimes="0; 1"
          keySplines="0.3, 0.61, 0.355, 1"
          repeatCount="indefinite"
        />
      </circle>
    </g>
  </svg>
);

/**
 * `Spinner` component — animated "busy" indicator.
 */
function Spinner({
  appearance = "clip",
  colorMode,
  size = 16,
  color = "accent",
  inline,
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
}: SpinnerProps) {
  const theme = useTheme();
  const actualColorMode = useColorMode(colorMode);
  color = resolveTextColor(theme.palette[actualColorMode], color);
  const marginProps = { margin, marginTop, marginRight, marginBottom, marginLeft, m, mt, mr, mb, ml };
  return (
    <div {...other} role="status" css={[StyleBase(size, inline), StyleMargin(marginProps)]}>
      {appearance === "clip" && <AnimatedClipSpinner size={size} color={color} />}
      {appearance === "tail" && <AnimatedTailSpinner size={size} color={color} />}
      {appearance === "pulse" && <AnimatedPulseSpinner size={size} color={color} />}
    </div>
  );
}

Spinner.displayName = "Spinner";
Spinner.propTypes = SpinnerPropTypes;

/**
 * `Spinner` component — animated "busy" indicator.
 */
export default memo(Spinner);
