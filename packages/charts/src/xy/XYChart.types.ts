import { Color, ColorMode, Palette, PaletteHue, PropTypeColorMode } from "@apptane/react-ui-core";
import { Theme } from "@apptane/react-ui-theme";
import PropTypes from "prop-types";
import {
  ChromaticScheme,
  Datum,
  Domain,
  DomainType,
  DomainXValue,
  DomainYValue,
  PropTypeColorScheme,
  PropTypeDatum,
  PropTypeDomainType,
  PropTypeDomainValue,
} from "../common/Types";
import { ChartSlice } from "../parts/ChartSlice";

export interface XYChartValue<X extends DomainXValue, Y extends DomainYValue> {
  /**
   * Value in the X domain.
   */
  x: X;

  /**
   * Value in the Y domain.
   */
  y: Y;

  /**
   * Value in the Z domain (if applicable).
   */
  z?: number;
}

export interface XYChartBand<X extends DomainXValue, Y extends DomainYValue> {
  /**
   * Value in the X domain.
   */
  x: X;

  /**
   * Value in the Y domain representing the lower bound of the band.
   */
  y0: Y;

  /**
   * Value in the Y domain representing the upper bound of the band.
   */
  y1: Y;
}

export interface XYChartDatum<X extends DomainXValue, Y extends DomainYValue, Data = void> extends Datum<Data> {
  /**
   * Primary values associated with the datum.
   */
  pri: XYChartValue<X, Y>[];

  /**
   * Secondary values associated with the datum.
   * These are presented using different visual style.
   */
  sec?: XYChartValue<X, Y>[];

  /**
   * Value bands associated with the datum.
   */
  bands?: XYChartBand<X, Y>[];
}

export interface XYChartOverlay<X extends DomainXValue> {
  /**
   * Unique identifier of the overlay.
   */
  id?: string;

  /**
   * Overlay title.
   */
  title?: string;

  /**
   * Title alignment.
   * Defaults to `bottom-left`.
   */
  titleAlignment?: "top-left" | "top-right" | "bottom-left" | "bottom-right";

  /**
   * Value in the X domain that represents the beginning of the overlay.
   */
  x0?: X;

  /**
   * Value in the X domain that represents the ending of the overlay.
   */
  x1?: X;

  /**
   * Overlay color.
   */
  color?: Color | PaletteHue;
}

export interface XYChartPropsBase<X extends DomainXValue> {
  /**
   * Panes.
   */
  children?: React.ReactNode;

  /**
   * Width of the component.
   */
  width: number;

  /**
   * Height of the component.
   */
  height?: number;

  /**
   * Specifies the color scheme used to compute series color.
   * If palette hue is specified colors are interpolated between
   * 100 and 800 by varying lightness.
   * If not specified defaults to built-in colormap.
   */
  colorScheme?: ChromaticScheme | PaletteHue;

  /**
   * Type of the primary domain (X).
   */
  domainType: DomainType;

  /**
   * Primary domain (X).
   *
   * For continuous domains, time- and linear-based, must contain
   * exactly two elements representing the start and the end of the domain.
   * For ordinal domains, each entry corresponds to the domain category.
   */
  domain?: X[];

  /**
   * Indicates that domain must be optionally extended to start
   * and end on the nice round values.
   */
  domainNice?: boolean;

  /**
   * An optional function to format primary domain (X) values
   * displayed as the axis labels.
   */
  formatDomain?: (value: X) => string;

  /**
   * An optional function to format primary domain (X) values
   * displayed in the tooltip.
   */
  formatTooltip?: (value: X) => string;

  /**
   * Controls the visibility of vertical grid lines.
   * Defaults to `false` except for bubble chart with both X and Y axes
   * representing ordinal data domains.
   */
  gridXVisible?: boolean;

  /**
   * Either number of major ticks or domain values to use to
   * generate X axis major ticks and corresponding grid lines.
   * Domain values can be used with continuous domains only.
   */
  axisXValues?: number | X[];

  /**
   * Controls the visibility of the X axis.
   * Defaults to `true`.
   */
  axisXVisible?: boolean;

  /**
   * X axis title.
   */
  axisXTitle?: string;

  /**
   * Width of the Y axis area shared by all panes.
   * Defaults to 40px.
   */
  axisYWidth?: number;

  /**
   * Padding for band of the ordinal axis.
   * A value between 0 and 1 representing the percentage of
   * the total distance between ticks.
   * Defaults to `0.2`
   */
  axisPadding?: number;

  /**
   * Content to display when no data is available.
   */
  emptyText?: React.ReactNode;

  /**
   * Overrides the color mode.
   * Default is to use globally set theme color mode or fallback to `light`.
   */
  colorMode?: ColorMode;

  /**
   * Pane overlays.
   */
  overlays?: XYChartOverlay<X>[];

  /**
   * Overrides the default background color.
   */
  background?: Color;
}

export interface XYTimeChartProps extends XYChartPropsBase<Date> {
  readonly domainType: "time";
}

export interface XYNumericChartProps extends XYChartPropsBase<number> {
  readonly domainType: "numeric";
}

export interface XYOrdinalChartProps extends XYChartPropsBase<string> {
  readonly domainType: "ordinal";
}

export type XYChartProps = XYTimeChartProps | XYNumericChartProps | XYOrdinalChartProps;

export interface XYChartPanePropsBase<X extends DomainXValue, Y extends DomainYValue, Data = void> {
  /**
   * Data representing individual series (metrics).
   */
  data?: XYChartDatum<X, Y, Data>[];

  /**
   * Specifies the color scheme used to compute series color.
   * If palette hue is specified colors are interpolated between
   * 100 and 800 by varying lightness.
   * If not specified defaults to built-in colormap.
   */
  colorScheme?: ChromaticScheme | PaletteHue;

  /**
   * Callback to determine color for the series (metric).
   * When this callback returns a valid color, it overrides
   * all other color specifications.
   */
  color?: (datum: XYChartDatum<X, Y, Data>) => Color | PaletteHue | undefined;

  /**
   * Height of the pane.
   */
  height?: number;

  /**
   * Header content.
   */
  header?: React.ReactNode;

  /**
   * Indicates stacked mode. Applies to line and bar charts.
   */
  stacked?: boolean;

  /**
   * Primary domain type (X).
   */
  domainXType?: DomainType;

  /**
   * Secondary domain (Y).
   *
   * For continuous domains, linear-based, must contain
   * exactly two elements representing the start and the end of the domain.
   * For ordinal domains, each entry corresponds to the domain category.
   */
  domainY?: Y[];

  /**
   * An optional function to format secondary domain (Y) values
   * displayed as the axis labels.
   */
  formatYDomain?: (value: Y) => string;

  /**
   * An optional function to format secondary domain (Y) values
   * displayed in the tooltip.
   */
  formatYTooltip?: (value: Y, lb?: Y, ub?: Y) => string;

  /**
   * Controls the visibility of vertical grid lines.
   * Defaults to `false` except for bubble chart with both X and Y axes
   * representing ordinal data domains.
   */
  gridXVisible?: boolean;

  /**
   * Controls the visibility of horizontal grid lines.
   * Defaults to `true`.
   */
  gridYVisible?: boolean;

  /**
   * Either number of major ticks or domain values to use to
   * generate Y axis major ticks and corresponding grid lines.
   * Domain values can be used with continuous domains only.
   */
  axisYValues?: number | number[];

  /**
   * Controls the visibility of the Y axis.
   * Defaults to `true`.
   */
  axisYVisible?: boolean;

  /**
   * Y axis title.
   */
  axisYTitle?: string;

  /**
   * Controls the visibility of tooltips.
   * Defaults to `true`.
   */
  tooltipVisible?: boolean;

  /**
   * Indicates that total value should be displayed in the tooltip.
   */
  tooltipTotalVisible?: boolean;

  /**
   * Content to display when no data is available.
   */
  emptyText?: React.ReactNode;

  /**
   * Controls the visibility of the legend.
   * Defaults to `true`.
   */
  legendVisible?: boolean;

  /**
   * Indicates that legend should be interactive and highlight
   * corresponding series.
   */
  legendInteractive?: boolean;

  /**
   * Pane overlays.
   */
  overlays?: XYChartOverlay<X>[];
}

export interface XYLineChartPanePropsBase<X extends DomainXValue, Data = void>
  extends XYChartPanePropsBase<X, number, Data> {
  /**
   * Indicates that series should use area appearance.
   */
  area?: boolean;

  /**
   * Indicates that curved interpolation to be used for data series.
   * Default is to use `linear` interpolation.
   */
  curve?: boolean | "bump" | "catmullRom" | "monotone" | "natural" | "step" | "linear";

  /**
   * Indicates that areas should be rendered using gradient.
   * Applicable only when `area = true`
   */
  gradient?: boolean;
}

export interface XYScatterChartPanePropsBase<X extends DomainXValue, Data = void>
  extends XYChartPanePropsBase<X, number, Data> {
  /**
   * Minimum size to use for scaling points.
   * Defaults to `4`.
   */
  minPointSize?: number;

  /**
   * Maximum size to use for scaling points.
   * Defaults to `0.05 × min(width, height)`.
   */
  maxPointSize?: number;
}

export interface XYTimeLineChartPaneProps<Data = void> extends XYLineChartPanePropsBase<Date, Data> {
  readonly domainXType?: "time";
}

export interface XYNumericLineChartPaneProps<Data = void> extends XYLineChartPanePropsBase<number, Data> {
  readonly domainXType?: "numeric";
}

export interface XYOrdinalLineChartPaneProps<Data = void> extends XYLineChartPanePropsBase<string, Data> {
  readonly domainXType?: "ordinal";
}

export interface XYBarChartPaneProps<Data = void> extends XYChartPanePropsBase<string, number, Data> {
  readonly domainXType?: "ordinal";
}

export interface XYBubbleChartPaneProps<Data = void> extends XYChartPanePropsBase<string, string, Data> {
  readonly domainXType?: "ordinal";

  /**
   * Minimum size to use for scaling bubbles.
   * Defaults to `4`.
   */
  minBubbleSize?: number;
}

export interface XYNumericScatterChartPaneProps<Data = void> extends XYScatterChartPanePropsBase<number, Data> {
  readonly domainXType?: "numeric";
}

export interface XYOrdinalScatterChartPaneProps<Data = void> extends XYScatterChartPanePropsBase<string, Data> {
  readonly domainXType?: "ordinal";
}

export type XYLineChartPaneProps<Data = void> =
  | XYTimeLineChartPaneProps<Data>
  | XYNumericLineChartPaneProps<Data>
  | XYOrdinalLineChartPaneProps<Data>;

export type XYScatterChartPaneProps<Data = void> =
  | XYNumericScatterChartPaneProps<Data>
  | XYOrdinalScatterChartPaneProps<Data>;

export type XYChartPaneProps<Data = void> =
  | XYTimeLineChartPaneProps<Data>
  | XYNumericLineChartPaneProps<Data>
  | XYOrdinalLineChartPaneProps<Data>
  | XYBarChartPaneProps<Data>
  | XYBubbleChartPaneProps<Data>
  | XYScatterChartPaneProps<Data>;

export const PropTypeOverlay = PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string,
  titleAlignment: PropTypes.oneOf(["top-left", "top-right", "bottom-left", "bottom-right"]),
  x0: PropTypeDomainValue,
  x1: PropTypeDomainValue,
  color: PropTypes.string,
});

export const XYChartPropTypes = {
  children: PropTypes.any,
  width: PropTypes.number.isRequired,
  height: PropTypes.number,
  colorScheme: PropTypeColorScheme,
  domainType: PropTypeDomainType,
  domain: PropTypes.arrayOf(PropTypeDomainValue),
  domainNice: PropTypes.bool,
  formatDomain: PropTypes.func,
  formatTooltip: PropTypes.func,
  gridXVisible: PropTypes.bool,
  axisXValues: PropTypes.oneOf([PropTypes.number, PropTypes.arrayOf(PropTypeDomainValue)]),
  axisXVisible: PropTypes.bool,
  axisXTitle: PropTypes.string,
  axisYWidth: PropTypes.number,
  axisPadding: PropTypes.number,
  emptyText: PropTypes.string,
  colorMode: PropTypeColorMode,
  overlays: PropTypes.arrayOf(PropTypeOverlay),
  background: PropTypes.string,
};

export const XYChartPaneProps = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      ...PropTypeDatum,
      pri: PropTypes.arrayOf(
        PropTypes.shape({
          x: PropTypeDomainValue.isRequired,
          y: PropTypeDomainValue.isRequired,
          v: PropTypes.number,
        })
      ),
      sec: PropTypes.arrayOf(
        PropTypes.shape({
          x: PropTypeDomainValue.isRequired,
          y: PropTypeDomainValue.isRequired,
          v: PropTypes.number,
        })
      ),
      bands: PropTypes.arrayOf(
        PropTypes.shape({
          x: PropTypeDomainValue.isRequired,
          y0: PropTypeDomainValue.isRequired,
          y1: PropTypeDomainValue.isRequired,
        })
      ),
    })
  ),
  colorScheme: PropTypeColorScheme,
  color: PropTypes.func,
  height: PropTypes.number,
  header: PropTypes.any,
  stacked: PropTypes.bool,
  domainY: PropTypes.arrayOf(PropTypeDomainValue),
  formatYDomain: PropTypes.func,
  formatYTooltip: PropTypes.func,
  gridYVisible: PropTypes.bool,
  axisYValues: PropTypes.oneOf([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
  axisYVisible: PropTypes.bool,
  axisYTitle: PropTypes.string,
  tooltipVisible: PropTypes.bool,
  tooltipTotalVisible: PropTypes.bool,
  emptyText: PropTypes.any,
  legendVisible: PropTypes.bool,
  legendInteractive: PropTypes.bool,
  overlays: PropTypes.arrayOf(PropTypeOverlay),
};

export type XYChartPanePropsExBase = {
  /**
   * Unique component identifier.
   */
  componentId: string;

  /**
   * Theme.
   */
  theme: Theme;

  /**
   * Color mode.
   */
  colorMode: ColorMode;

  /**
   * Background color.
   */
  background: Color;

  /**
   * Palette,
   */
  palette: Palette;

  /**
   * Color scheme.
   */
  colorScheme?: ChromaticScheme | PaletteHue;

  /**
   * Content to display when no data is available.
   */
  emptyText?: React.ReactNode;

  /**
   * Propagated type of the X domain.
   */
  domainXType: DomainType;

  /**
   * Actual height of the pane.
   */
  height: number;

  /**
   * Actual width of the pane including the Y axis area.
   */
  width: number;

  /**
   * Header height.
   */
  headerHeight: number;

  /**
   * Padding for band of the ordinal axis.
   * A value between 0 and 1 representing the percentage of
   * the total distance between ticks.
   */
  axisPadding: number;

  /**
   * Width of the Y axis area shared by all panes.
   */
  axisYWidth: number;

  /**
   * Controls the visibility of vertical grid lines.
   */
  gridXVisible?: boolean;

  /**
   * Extent of the chart plot area in X direction (width).
   */
  extentX: number;

  /**
   * Extent of the chart plot area in Y direction (width).
   */
  extentY: number;

  /**
   * Additional SVG definitions.
   */
  defs?: React.ReactNode;

  /**
   * Callback invoked to highlight specific slice in the domain.
   */
  setSlice: React.Dispatch<React.SetStateAction<ChartSlice | undefined>>;

  /**
   * Tooltip offset from the default tick position.
   */
  tooltipOffset?: number;

  /**
   * An optional function to format numeric values in the tooltip.
   */
  formatTooltipValue?: (v: number, lb?: number, ub?: number) => string;
};

export type XYChartPanePropsEx<X extends DomainXValue> = XYChartPanePropsExBase & {
  /**
   * Scale function for X axis - converts X domain values into local coordinates.
   */
  scaleX: (v: X) => number | undefined;

  /**
   * Inverse scale function for X axis - converts local coordinates into X domain value.
   */
  invertX: (v: number) => X | undefined;

  /**
   * An optional function to format primary domain (X) values
   * displayed in the tooltip.
   */
  formatXTooltip?: (value: X) => string;

  /**
   * Aggregated values in X domain across all series (metrics).
   */
  computedDomainX?: Domain<X>;

  /**
   * Generates grid for X domain.
   */
  gridX: (p: XYChartPanePropsExBase) => React.ReactNode;

  /**
   * Pane overlays.
   */
  overlays?: XYChartOverlay<X>[];
};

export type XYChartPanePropsBaseEx<
  X extends DomainXValue,
  Y extends DomainYValue,
  Data = void
> = XYChartPanePropsEx<X> & {
  /**
   * Computed data representing individual series (metrics).
   */
  computed?: XYChartDatum<X, Y, Data>[];

  /**
   * Finds nearest datum based on X and Y coordinates.
   */
  findDatum?: (
    cx: number,
    cy: number,
    data: XYChartDatum<X, Y, Data>[],
    domainX: Domain<X> | undefined,
    domainY: Domain<Y> | undefined,
    x: X | undefined,
    y: Y | undefined,
    ix: number | undefined,
    iy: number | undefined
  ) => XYChartDatum<X, Y, Data> | undefined;

  /**
   * Aggregated values in Y domain across all series (metrics).
   */
  computedDomainY?: Domain<Y>;

  /**
   * Scale function for Y axis - converts Y domain values into local coordinates.
   */
  scaleY?: (v: Y) => number | undefined;

  /**
   * Inverse scale function for Y axis - converts local coordinates into Y domain value.
   */
  invertY?: (v: number) => Y | undefined;
};
