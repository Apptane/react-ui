import { Color, ColorMode, Palette, useComponentId, warning } from "@apptane/react-ui-core";
import { Theme, useColorMode, useTheme } from "@apptane/react-ui-theme";
import { css } from "@emotion/react";
import { Children, cloneElement, Fragment, isValidElement, useMemo, useState } from "react";
import { scaleBand, scaleLinear, scaleTime } from "d3-scale";
import { timeFormat } from "d3-time-format";
import { DomainType, DomainXValue } from "../common/Types";
import {
  ChartData,
  ChartNumericDataContext,
  ChartOrdinalDataContext,
  ChartTimeDataContext,
} from "../parts/ChartDataContext";
import { ChartEmptyBlock } from "../parts/ChartEmptyBlock";
import { ChartLinearAxis } from "../parts/ChartLinearAxis";
import { ChartLinearGrid } from "../parts/ChartLinearGrid";
import { ChartOrdinalAxis } from "../parts/ChartOrdinalAxis";
import { ChartOrdinalGrid } from "../parts/ChartOrdinalGrid";
import { ChartSlice } from "../parts/ChartSlice";
import { ChartSliceContext } from "../parts/ChartSliceContext";
import { ChartTimeAxis } from "../parts/ChartTimeAxis";
import { ChartTimeGrid } from "../parts/ChartTimeGrid";
import { scaleBandInvert } from "./common";
import { XYBarChartPane } from "./XYBarChartPane";
import { XYBubbleChartPane } from "./XYBubbleChartPane";
import {
  XYChartPaneProps,
  XYChartPanePropsEx,
  XYChartPanePropsExBase,
  XYChartProps,
  XYNumericChartProps,
  XYOrdinalChartProps,
  XYTimeChartProps,
} from "./XYChart.types";
import { XYLineChartPane } from "./XYLineChartPane";
import { XYScatterChartPane } from "./XYScatterChartPane";

const StyleContainer = (back: Color, gap: number) => css`
  background: ${back};

  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  align-content: stretch;
  justify-content: center;
  overflow: visible;

  // required to force correct height on the wrapper div
  svg {
    display: block;
    overflow: visible;
  }

  > div + div {
    margin-top: ${gap}px;
  }
`;

function computePaneHeights(panes: React.ReactNode, gap: number) {
  let totalPaneHeight = 0;
  let totalPaneCount = 0;
  let dynamicPaneCount = 0;

  Children.forEach(panes, (pane) => {
    if (isValidElement(pane)) {
      const item = pane as React.ReactElement<XYChartPaneProps>;
      totalPaneCount++;

      if (item.props.height != null) {
        totalPaneHeight += item.props.height;
      } else {
        dynamicPaneCount++;
      }
    }
  });

  totalPaneHeight += (totalPaneCount - 1) * gap;
  return { totalPaneHeight, totalPaneCount, dynamicPaneCount };
}

type SvgWrapperProps = {
  children: React.ReactNode;
  width: number;
  height: number;
  componentId: string;
  background: Color;
};

const SvgWrapper = ({ children, width, height, componentId, background }: SvgWrapperProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" role="img" height={height} width={width}>
    <defs>
      <filter x={-0.2} y={0} width={1.2} height={1} id={`${componentId}-axis-title-back`}>
        <feFlood floodColor={background} result="bg" />
        <feMerge>
          <feMergeNode in="bg" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    {children}
  </svg>
);

type XYChartPropsEx = {
  chartId: string;
  theme: Theme;
  palette: Palette;
  colorMode: ColorMode;
  background: Color;
  domainXType: DomainType;
  extent: number;
  paneGap: number;
  axisXHeight: number;
  axisXVisible: boolean;
  axisYWidth: number;
  axisPadding: number;
  setSlice: React.Dispatch<React.SetStateAction<ChartSlice | undefined>>;
};

type XYChartPanes<X extends DomainXValue> = XYChartProps &
  XYChartPropsEx & {
    formatDomain?: (value: X) => string;
    formatTooltip?: (value: X) => string;
    gridX: (p: XYChartPanePropsExBase) => React.ReactNode;
  };

/**
 * Computes and sets individual panes geometry (width and height).
 */
const XYChartPanes = <X extends DomainXValue>({
  children,
  theme,
  palette,
  colorMode,
  colorScheme,
  domainXType,
  width,
  height,
  extent,
  paneGap,
  axisXHeight,
  axisXVisible,
  gridXVisible,
  axisYWidth,
  axisPadding,
  gridX,
  setSlice,
  formatDomain,
  formatTooltip,
  emptyText,
  overlays,
  background,
}: XYChartPanes<X>) => {
  const { totalPaneHeight, dynamicPaneCount } = computePaneHeights(children, paneGap);

  let dynamicPaneHeight = 0;
  if (dynamicPaneCount > 0) {
    if (height == null) {
      throw new Error("`height` is required unless all panes have their height specified.");
    }

    dynamicPaneHeight = (height - totalPaneHeight - (axisXVisible ? axisXHeight : 0)) / dynamicPaneCount;
  }

  const visualStyle = theme.charts.xy.style;
  const panes: JSX.Element[] = [];
  Children.forEach(children, (child) => {
    if (isValidElement(child)) {
      const item = child as React.ReactElement<XYChartPaneProps>;
      const paneActualHeight = item.props.height ?? dynamicPaneHeight;

      // height occupied by the header and Y axis title when specified
      const legendVisible = item.props.legendVisible && item.props.data != null && item.props.data.length > 0;

      let headerHeight = item.props.header || legendVisible ? visualStyle.header.height : 0;
      if (item.props.axisYTitle) {
        headerHeight += visualStyle.yAxis.titleHeight + visualStyle.yAxis.titleSpacing;
      }

      if (headerHeight > 0) {
        headerHeight += visualStyle.header.spacing;
      }

      const mergedOverlays =
        overlays != null
          ? child.props.overlays != null
            ? [...overlays, ...child.props.overlays]
            : overlays
          : child.props.overlays;

      panes.push(
        cloneElement<XYChartPanePropsEx<X>>(child, {
          key: child.key ?? `pane-${panes.length}`,
          theme: theme,
          palette: palette,
          background: background,
          colorMode: colorMode,
          colorScheme: child.props.colorScheme ?? colorScheme,
          emptyText: child.props.emptyText ?? emptyText,
          domainXType: domainXType,
          height: paneActualHeight,
          width: width,
          axisPadding: axisPadding,
          axisYWidth: axisYWidth,
          gridXVisible: child.props.gridXVisible ?? gridXVisible,
          headerHeight: headerHeight,
          extentX: extent,
          extentY: Math.max(0, paneActualHeight - headerHeight),
          setSlice: setSlice,
          formatXTooltip: formatTooltip ?? formatDomain,
          gridX: gridX,
          overlays: mergedOverlays,
        })
      );
    }
  });

  return <Fragment>{panes}</Fragment>;
};

const DefaultFormatTimeTooltip = timeFormat("%d %b %Y, %I:%M %p (UTC %Z)");

const XYTimeChart = (props: XYTimeChartProps & XYChartPropsEx) => {
  const { domainType, domain, domainNice, width, extent, axisXHeight, axisXVisible } = props;
  const [scale, context, gridX] = useMemo(() => {
    const scale = scaleTime()
      .rangeRound([0, extent])
      .domain(domain ?? []);

    if (domainNice) {
      scale.nice();
    }

    const context: ChartData<Date> = {
      domainType: domainType,
      scaleX: scale,
      invertX: scale.invert,
      compareX: (a, b) => {
        const d = a.getTime() - b.getTime();
        return d < 0 ? -1 : d > 0 ? 1 : 0;
      },
    };

    const gridX = (p: XYChartPanePropsExBase) => (
      <ChartTimeGrid
        key="gridX"
        orientation="vertical"
        componentId={p.componentId}
        theme={p.theme}
        colorMode={p.colorMode}
        left={p.axisYWidth}
        width={p.extentX}
        height={p.extentY}
        tickValues={props.axisXValues}
        scale={scale}
      />
    );

    return [scale, context, gridX];
  }, [domainType, domain, domainNice, extent, props.axisXValues]);

  return (
    <ChartTimeDataContext.Provider value={context}>
      <XYChartPanes<Date> {...props} formatTooltip={props.formatTooltip ?? DefaultFormatTimeTooltip} gridX={gridX} />
      {axisXVisible && (
        <SvgWrapper width={width} height={axisXHeight} componentId={props.chartId} background={props.background}>
          <ChartTimeAxis
            componentId={props.chartId}
            theme={props.theme}
            colorMode={props.colorMode}
            orientation="x"
            offset={props.axisYWidth}
            span={axisXHeight}
            textOffset={8}
            tickSize={4}
            tickValues={props.axisXValues}
            format={props.formatDomain}
            scale={scale}
            title={props.axisXTitle}
          />
        </SvgWrapper>
      )}
    </ChartTimeDataContext.Provider>
  );
};

const DefaultFormatNumericTooltip = (v: number) => v.toLocaleString();

const XYNumericChart = (props: XYNumericChartProps & XYChartPropsEx) => {
  const { domainType, domain, domainNice, width, extent, axisXHeight, axisXVisible } = props;
  const [scale, context, gridX] = useMemo(() => {
    const scale = scaleLinear()
      .rangeRound([0, extent])
      .domain(domain ?? []);

    if (domainNice) {
      scale.nice();
    }

    const context: ChartData<number> = {
      domainType: domainType,
      scaleX: scale,
      invertX: scale.invert,
      compareX: (a, b) => (a === b ? 0 : a < b ? -1 : 1),
    };

    const gridX = (p: XYChartPanePropsExBase) => (
      <ChartLinearGrid
        key="gridX"
        orientation="vertical"
        componentId={p.componentId}
        theme={p.theme}
        colorMode={p.colorMode}
        left={p.axisYWidth}
        width={p.extentX}
        height={p.extentY}
        tickValues={props.axisXValues}
        scale={scale}
      />
    );

    return [scale, context, gridX];
  }, [domainType, domain, domainNice, extent, props.axisXValues]);

  return (
    <ChartNumericDataContext.Provider value={context}>
      <XYChartPanes<number>
        {...props}
        formatTooltip={props.formatTooltip ?? DefaultFormatNumericTooltip}
        gridX={gridX}
      />
      {axisXVisible && (
        <SvgWrapper width={width} height={axisXHeight} componentId={props.chartId} background={props.background}>
          <ChartLinearAxis
            componentId={props.chartId}
            theme={props.theme}
            colorMode={props.colorMode}
            orientation="x"
            offset={props.axisYWidth}
            span={axisXHeight}
            textOffset={8}
            tickSize={4}
            tickValues={props.axisXValues}
            format={props.formatDomain}
            scale={scale}
            title={props.axisXTitle}
          />
        </SvgWrapper>
      )}
    </ChartNumericDataContext.Provider>
  );
};

const XYOrdinalChart = (props: XYOrdinalChartProps & XYChartPropsEx) => {
  const { domainType, domain, width, extent, axisXHeight, axisPadding, axisXVisible } = props;
  const [scale, context, gridX] = useMemo(() => {
    const domainX = domain ?? [];

    const padding = axisPadding ?? 0;
    const scale = scaleBand()
      .rangeRound([0, extent])
      .domain(domainX)
      .paddingOuter(padding * 0.5)
      .paddingInner(padding);

    const bandwidth = scale.bandwidth();
    const half = bandwidth * 0.5;
    const scaleX = (v: string) => {
      const x = scale(v);
      return x != null ? x + half : undefined;
    };

    // build a lookup map using original domain order for sorting
    const lookup = new Map<string, number>();
    domainX.map((value, index) => lookup.set(value, index));
    const compare = (a: string, b: string) => {
      const d = (lookup.get(a) ?? -1) - (lookup.get(b) ?? -1);
      return d < 0 ? -1 : d > 0 ? 1 : 0;
    };

    const context: ChartData<string> = {
      domainType: domainType,
      scaleX: scaleX,
      invertX: scaleBandInvert(scale),
      compareX: compare,
      bandwidth: bandwidth,
    };

    const gridX = (p: XYChartPanePropsExBase) => (
      <ChartOrdinalGrid
        key="gridX"
        orientation="vertical"
        componentId={p.componentId}
        theme={p.theme}
        colorMode={p.colorMode}
        left={p.axisYWidth}
        width={p.extentX}
        height={p.extentY}
        scale={scale}
      />
    );

    return [scale, context, gridX];
  }, [domainType, domain, extent, axisPadding]);

  return (
    <ChartOrdinalDataContext.Provider value={context}>
      <XYChartPanes<string> {...props} gridX={gridX} />
      {axisXVisible && (
        <SvgWrapper width={width} height={axisXHeight} componentId={props.chartId} background={props.background}>
          <ChartOrdinalAxis
            componentId={props.chartId}
            theme={props.theme}
            colorMode={props.colorMode}
            orientation="x"
            offset={props.axisYWidth}
            span={axisXHeight}
            textOffset={8}
            tickSize={0}
            tickVisible={false}
            tickValues={props.axisXValues}
            format={props.formatDomain}
            scale={scale}
            title={props.axisXTitle}
          />
        </SvgWrapper>
      )}
    </ChartOrdinalDataContext.Provider>
  );
};

/**
 * `XYChart` component — presents metrics on XY plane that are based
 * in continuous domain (time and numeric) or ordinal domain.
 * Metrics can be visualized as line/area, bar, or bubble series.
 * Supports one or more panes sharing the same primary X domain, but
 * having independent Y, and optionally Z, ranges and visualization
 * properties.
 */
function XYChart(props: XYChartProps) {
  const { axisXVisible = true, axisYWidth = 40, axisPadding = 0.2 } = props;

  const theme = useTheme();
  const colorMode = useColorMode(props.colorMode);
  const palette = theme.palette[colorMode];
  const visualAppearance = theme.charts.xy.appearance(palette, colorMode, undefined, "none");
  const visualStyle = theme.charts.xy.style;

  const [slice, setSlice] = useState<ChartSlice | undefined>(undefined);

  const propsEx: Omit<XYChartPropsEx, "domainXType"> = {
    chartId: useComponentId("--apptane-chart"),
    theme: theme,
    colorMode: colorMode,
    palette: palette,
    background: props.background ?? visualAppearance.back,
    extent: Math.max(0, props.width - axisYWidth), // viewport extent for data series, i.e. X domain
    axisYWidth: axisYWidth,
    paneGap: visualStyle.gap,
    axisXHeight: visualStyle.xAxis.height,
    axisXVisible: axisXVisible,
    axisPadding: axisPadding,
    setSlice: setSlice,
  };

  let chart: React.ReactNode;
  if (props.domain != null && props.domain.length > 0) {
    switch (props.domainType) {
      case "time":
        if (props.domain.length !== 2) {
          warning(false, "`domain` must contain exactly two elements, property ignored");
        } else {
          chart = <XYTimeChart {...props} {...propsEx} domainXType="time" />;
        }
        break;

      case "numeric":
        if (props.domain.length !== 2) {
          warning(false, "`domain` must contain exactly two elements, property ignored`");
        } else {
          chart = <XYNumericChart {...props} {...propsEx} domainXType="numeric" />;
        }
        break;

      case "ordinal":
        chart = <XYOrdinalChart {...props} {...propsEx} domainXType="ordinal" />;
        break;
    }
  }

  if (chart == null) {
    let height = props.height;
    if (height == null) {
      const { totalPaneHeight, dynamicPaneCount } = computePaneHeights(props.children, propsEx.paneGap);
      if (dynamicPaneCount > 0) {
        throw new Error("`height` is required unless all panes have their height specified.");
      }
      height = totalPaneHeight;
    }

    chart = (
      <ChartEmptyBlock
        theme={theme}
        colorMode={colorMode}
        background={props.background}
        width={props.width}
        height={height}
        top={0}
        left={0}>
        {props.emptyText}
      </ChartEmptyBlock>
    );
  }

  return (
    <ChartSliceContext.Provider value={slice}>
      <div
        css={[
          StyleContainer(props.background ?? visualAppearance.back, visualStyle.gap),
          { width: props.width, height: props.height },
        ]}>
        {chart}
      </div>
    </ChartSliceContext.Provider>
  );
}

/**
 * `Line` — a pane in the chart displaying one or more metrics as line or area plots.
 */
XYChart.Line = XYLineChartPane;

/**
 * `Bar` — a pane in the chart displaying one or more metrics as bars.
 */
XYChart.Bar = XYBarChartPane;

/**
 * `Bubble` — a pane in the chart displaying one or more metrics as bubbles.
 * Allows representing data that resides within two domains.
 */
XYChart.Bubble = XYBubbleChartPane;

/**
 * `Scatter` — a pane in the chart displaying one or more metrics as bubbles.
 * Allows representing data that resides within two domains.
 */
XYChart.Scatter = XYScatterChartPane;

XYChart.displayName = "XYChart";
export default XYChart;
