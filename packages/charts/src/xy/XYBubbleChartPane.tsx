import { useComponentId, warning } from "@apptane/react-ui-core";
import { useContext, useMemo } from "react";
import { scaleBand } from "d3-scale";
import { ChartOrdinalAxis } from "../parts";
import { ChartOrdinalDataContext } from "../parts/ChartDataContext";
import { ChartOrdinalGrid } from "../parts/ChartOrdinalGrid";
import { scaleBandInvert } from "./common";
import { findDatum, useXYZPaneData } from "./commonXYZ";
import { XYBubbleLayer } from "./XYBubbleLayer";
import { XYBubbleChartPaneProps, XYChartPanePropsEx } from "./XYChart.types";
import { XYChartPane } from "./XYChartPane";

export function XYBubbleChartPane<Data = void>(props: XYBubbleChartPaneProps<Data>) {
  const componentId = useComponentId("--apptane-chart");
  const {
    axisYVisible = true,
    gridYVisible = true,
    gridXVisible = true,
    legendInteractive = true,
    tooltipVisible = true,
    ...p
  } = props as XYBubbleChartPaneProps<Data> & XYChartPanePropsEx<string>; // see XYChartPanes

  const propsEx = {
    componentId,
    axisYVisible,
    gridYVisible,
    gridXVisible,
    legendInteractive,
    tooltipVisible,
    axisYWidth: axisYVisible ? p.axisYWidth : 0,
  };

  const context = useContext(ChartOrdinalDataContext);
  const bandwidthX = context.bandwidth ?? 0;
  const offset = propsEx.axisYWidth;

  const [scaleY, scaleYp, scaleYi, compareY, bandwidthY] = useMemo(() => {
    const domainY = p.domainY ?? [];

    const padding = p.axisPadding;
    const scaleY = scaleBand()
      .rangeRound([0, p.extentY])
      .domain(domainY.slice().reverse() ?? []) // [!] reversed domain
      .paddingOuter(padding * 0.5)
      .paddingInner(padding);

    // build a lookup map using original domain order for sorting
    const lookup = new Map<string, number>();
    domainY.map((value, index) => lookup.set(value, index));
    const compare = (a: string, b: string) => {
      const d = (lookup.get(a) ?? -1) - (lookup.get(b) ?? -1);
      return d < 0 ? -1 : d > 0 ? 1 : 0;
    };

    const bandwidth = scaleY.bandwidth();
    const half = bandwidth * 0.5;
    const scaleYp = (v: string) => {
      const p = scaleY(v);
      return p != null ? Math.round(p + half) : undefined;
    };

    return [scaleY, scaleYp, scaleBandInvert(scaleY), compare, bandwidth];
  }, [p.domainY, p.extentY, p.axisPadding]);

  const bandwidth = Math.min(bandwidthX, bandwidthY);
  const [computed, domainX, domainY, , layers] = useXYZPaneData<string, string, Data>(
    context,
    scaleYp,
    compareY,
    "ordinal",
    bandwidth,
    {
      ...p,
      ...propsEx,
    }
  );

  const axisY = scaleY && (
    <ChartOrdinalAxis
      key="axisY"
      orientation="y"
      componentId={componentId}
      theme={p.theme}
      colorMode={p.colorMode}
      span={p.axisYWidth}
      textOffset={1}
      tickSize={0}
      axisVisible={false}
      tickVisible={false}
      format={props.formatYDomain}
      scale={scaleY}
    />
  );

  const gridY = scaleY && gridYVisible && (
    <ChartOrdinalGrid
      key="gridY"
      orientation="horizontal"
      componentId={componentId}
      theme={p.theme}
      colorMode={p.colorMode}
      left={p.axisYWidth}
      width={p.extentX}
      height={p.extentY}
      scale={scaleY}
    />
  );

  warning(p.domainXType === "ordinal", `Chart pane is not supported with domainXType='${p.domainXType}'`);
  return (
    <XYChartPane<string, string, Data>
      {...p}
      {...propsEx}
      computed={computed}
      computedDomainX={domainX}
      computedDomainY={domainY}
      scaleY={scaleYp}
      invertY={scaleYi}
      findDatum={props.legendInteractive ? findDatum : undefined}
      {...context}
      tooltipOffset={bandwidth * 0.5}>
      {axisY}
      {gridY}
      {gridXVisible && p.gridX(p)}
      {layers}
      {computed && <XYBubbleLayer<string, string, Data> componentId={componentId} offset={offset} data={computed} />}
    </XYChartPane>
  );
}
