import { useComponentId, warning } from "@apptane/react-ui-core";
import { useContext, useMemo } from "react";
import { scaleLinear } from "d3-scale";
import { DomainXValue } from "../common/Types";
import { ChartData, ChartNumericDataContext, ChartOrdinalDataContext } from "../parts/ChartDataContext";
import { ChartLinearAxis } from "../parts/ChartLinearAxis";
import { ChartLinearGrid } from "../parts/ChartLinearGrid";
import { findDatum, useXYZPaneData } from "./commonXYZ";
import { XYBubbleLayer } from "./XYBubbleLayer";
import {
  XYChartPanePropsBase,
  XYChartPanePropsEx,
  XYChartPanePropsExBase,
  XYNumericScatterChartPaneProps,
  XYOrdinalScatterChartPaneProps,
  XYScatterChartPaneProps,
  XYScatterChartPanePropsBase,
} from "./XYChart.types";
import { XYChartPane } from "./XYChartPane";

type XYScatterChartPaneBasePropsEx<X extends DomainXValue, Data = void> = XYScatterChartPanePropsBase<X, Data> &
  XYChartPanePropsExBase & {
    context: ChartData<X>;
    minPointSize: number;
    maxPointSize: number;
  };

function XYScatterChartPaneBase<X extends DomainXValue, Data = void>({
  context,
  minPointSize,
  maxPointSize,
  ...props
}: XYScatterChartPaneBasePropsEx<X, Data>) {
  const p = props as XYChartPanePropsBase<X, number, Data> & XYChartPanePropsEx<X>;
  const offset = props.axisYWidth;

  const [scaleY, compareY] = useMemo(() => {
    const domainY = props.domainY ?? [];
    const scaleY = scaleLinear()
      .rangeRound([0, props.extentY])
      .domain(domainY.slice().reverse() ?? []) // [!] reversed domain
      .nice();

    const compare = (a: number, b: number) => (a === b ? 0 : a < b ? -1 : 1);
    return [scaleY, compare];
  }, [props.domainY, props.extentY]);

  const [computed, domainX, domainY, , layers] = useXYZPaneData<X, number, Data>(
    context,
    scaleY,
    compareY,
    "numeric",
    minPointSize,
    maxPointSize,
    p,
    p.domainXType === "numeric"
  );

  const axisY = scaleY && (
    <ChartLinearAxis
      key="axisY"
      orientation="y"
      componentId={props.componentId}
      theme={props.theme}
      colorMode={props.colorMode}
      span={props.axisYWidth}
      textOffset={1}
      tickSize={props.axisYWidth - 4}
      axisVisible={false}
      tickVisible={true}
      tickValues={props.axisYValues}
      format={props.formatYDomain}
      scale={scaleY}
    />
  );

  const gridY = scaleY && props.gridYVisible && (
    <ChartLinearGrid
      key="gridY"
      orientation="horizontal"
      componentId={props.componentId}
      theme={props.theme}
      colorMode={props.colorMode}
      left={props.axisYWidth}
      width={props.extentX}
      height={props.extentY}
      tickValues={props.axisYValues}
      scale={scaleY}
    />
  );

  return (
    <XYChartPane<X, number, Data>
      {...p}
      computed={computed}
      computedDomainX={domainX}
      computedDomainY={domainY}
      scaleY={scaleY}
      invertY={scaleY.invert}
      findDatum={props.legendInteractive ? findDatum : undefined}
      {...context}
      tooltipOffset={maxPointSize * 0.5}>
      {axisY}
      {gridY}
      {props.gridXVisible && p.gridX(p)}
      {layers}
      {computed && <XYBubbleLayer<X, number, Data> componentId={props.componentId} offset={offset} data={computed} />}
    </XYChartPane>
  );
}

type XYScatterChartPanePropsEx = XYChartPanePropsExBase & {
  minPointSize: number;
  maxPointSize: number;
};

function XYNumericScatterChartPane<Data = void>(
  props: XYNumericScatterChartPaneProps<Data> & XYScatterChartPanePropsEx
) {
  const context = useContext(ChartNumericDataContext);
  return <XYScatterChartPaneBase<number, Data> {...props} context={context} />;
}

function XYOrdinalScatterChartPane<Data = void>(
  props: XYOrdinalScatterChartPaneProps<Data> & XYScatterChartPanePropsEx
) {
  const context = useContext(ChartOrdinalDataContext);
  return <XYScatterChartPaneBase<string, Data> {...props} context={context} />;
}

export function XYScatterChartPane<Data = void>(props: XYScatterChartPaneProps<Data>) {
  const componentId = useComponentId("--apptane-chart");
  const {
    axisYVisible = true,
    gridYVisible = true,
    gridXVisible = true,
    legendInteractive = true,
    tooltipVisible = true,
    ...p
  } = props as XYScatterChartPaneProps<Data> & XYChartPanePropsExBase; // see XYChartPanes

  const propsEx = {
    componentId,
    axisYVisible,
    gridYVisible,
    gridXVisible,
    legendInteractive,
    tooltipVisible,
    minPointSize: props.minPointSize ?? 4,
    maxPointSize: props.maxPointSize ?? 0.05 * Math.min(p.extentX, p.extentY),
    axisYWidth: axisYVisible ? p.axisYWidth : 0,
  };

  switch (p.domainXType) {
    case "numeric":
      return <XYNumericScatterChartPane {...p} {...propsEx} />;
    case "ordinal":
      return <XYOrdinalScatterChartPane {...p} {...propsEx} />;
    default:
      warning(false, "Chart pane does not have 'domainXType' specified");
      return null;
  }
}
