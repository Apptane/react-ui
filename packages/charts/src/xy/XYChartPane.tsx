import { AnimationStyle } from "@apptane/react-ui-core";
import { css } from "@emotion/react";
import { useCallback, useContext, useRef, useState } from "react";
import { Datum, DomainXValue, DomainYValue } from "../common/Types";
import { ChartDatumContext } from "../parts/ChartDatumContext";
import { ChartEmptyBlock } from "../parts/ChartEmptyBlock";
import { ChartHeader } from "../parts/ChartHeader";
import { ChartLegend } from "../parts/ChartLegend";
import { ChartSliceContext } from "../parts/ChartSliceContext";
import { XYChartDatum, XYChartPanePropsBase, XYChartPanePropsBaseEx } from "./XYChart.types";
import { XYChartOverlay } from "./XYChartOverlay";
import { XYChartTooltip } from "./XYChartTooltip";

const StyleContainer = css`
  position: relative;
  overflow: visible;
`;

const StyleTooltip = (animation: AnimationStyle) => css`
  > div {
    transition-delay: ${animation.delay}ms;
    transition-duration: ${animation.duration}ms;
    transition-timing-function: ${animation.function};
    position: absolute;
  }

  // prevents tooltip from triggering onMouseLeave
  pointer-events: none;
  position: absolute;
`;

const getRelativePosition = (node: Element, event: React.MouseEvent) => {
  const { clientX, clientY } = event;
  const box = node.getBoundingClientRect();
  return [clientX - box.left, clientY - box.top];
};

export function XYChartPane<X extends DomainXValue, Y extends DomainYValue, Data = void>({
  children,
  componentId,
  theme,
  colorMode,
  height,
  width,
  computed,
  findDatum,
  setSlice,
  scaleX,
  scaleY,
  invertX,
  invertY,
  computedDomainX,
  computedDomainY,
  formatXTooltip,
  formatYTooltip,
  formatTooltipValue,
  header,
  headerHeight,
  extentX,
  extentY,
  axisYWidth,
  axisXTitle,
  axisYTitle,
  tooltipVisible,
  tooltipTotalVisible,
  tooltipOffset,
  emptyText,
  legendVisible,
  legendInteractive,
  defs,
  overlays,
  background,
}: React.PropsWithChildren<XYChartPanePropsBase<X, Y, Data> & XYChartPanePropsBaseEx<X, Y, Data>>) {
  const visualAppearance = theme.charts.xy.appearance(theme.palette[colorMode], colorMode, undefined, "none");

  const slice = useContext(ChartSliceContext);
  const [currentDatumId, setCurrentDatumId] = useState<string | undefined>();
  const selectMetric = useCallback((datum: Datum<Data>) => setCurrentDatumId(datum.id), []);
  const deselectMetric = useCallback(() => setCurrentDatumId(undefined), []);

  const legend =
    computed != null && legendVisible ? (
      <ChartLegend<XYChartDatum<X, Y, Data>, Data>
        theme={theme}
        colorMode={colorMode}
        data={computed}
        selectedDatumId={legendInteractive ? currentDatumId : undefined}
        onMouseEnter={legendInteractive ? selectMetric : undefined}
        onMouseLeave={legendInteractive ? deselectMetric : undefined}
        onClick={legendInteractive ? selectMetric : undefined}
      />
    ) : undefined;

  const trackerRef = useRef<SVGRectElement>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (trackerRef.current) {
        const [x, y] = getRelativePosition(trackerRef.current, e);
        const rx = Math.round(x);
        const ry = Math.round(y);

        const dx = invertX(rx);
        const dy = invertY != null ? invertY(ry) : undefined;

        const [nx, ix] = computedDomainX?.findNearest(dx) ?? [undefined, undefined];
        const [ny, iy] = computedDomainY?.findNearest(dy) ?? [undefined, undefined];

        // locate nearest series
        let datumId: string | undefined;
        if (computed != null && findDatum != null) {
          const datum = findDatum(rx, ry, computed, computedDomainX, computedDomainY, nx, ny, ix, iy);
          datumId = datum?.id;
        }

        function formatLabel(nx: X | undefined, ny: Y | undefined) {
          const parts: string[] = [];
          if (nx != null) {
            const s = formatXTooltip != null ? formatXTooltip(nx) : nx.toLocaleString();
            parts.push(axisXTitle ? `${axisXTitle}: ${s}` : s);
          }

          if (ny != null) {
            const s = formatYTooltip != null ? formatYTooltip(ny) : ny.toLocaleString();
            parts.push(axisYTitle ? `${axisYTitle}: ${s}` : s);
          }

          return parts.join(" • ");
        }

        setCurrentDatumId(datumId);
        setSlice((prevSlice) =>
          prevSlice?.domainXIndex === ix && prevSlice?.domainYIndex === iy
            ? prevSlice
            : nx == null && ny == null
            ? undefined
            : {
                label: formatLabel(nx, ny),
                x: nx != null ? scaleX(nx) : undefined,
                y: ny != null && scaleY != null ? scaleY(ny) : undefined,
                domainXIndex: ix,
                domainYIndex: iy,
              }
        );
      }
    },
    [
      computed,
      axisXTitle,
      axisYTitle,
      scaleX,
      scaleY,
      invertX,
      invertY,
      computedDomainX,
      computedDomainY,
      formatXTooltip,
      formatYTooltip,
      findDatum,
      setSlice,
    ]
  );

  const onMouseLeave = useCallback(() => {
    setCurrentDatumId(undefined);
    setSlice(undefined);
  }, [setSlice]);

  return (
    <ChartDatumContext.Provider value={currentDatumId}>
      <div css={StyleContainer} style={{ height: height }}>
        <ChartHeader theme={theme} colorMode={colorMode} header={header} legend={legend} axisYTitle={axisYTitle} />
        <svg xmlns="http://www.w3.org/2000/svg" role="img" height={extentY} width={width}>
          <defs>
            <filter x={0} y={0} width={1.2} height={1} id={`${componentId}-axis-label-back`}>
              <feFlood floodColor={background ?? visualAppearance.back} result="bg" />
              <feMerge>
                <feMergeNode in="bg" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <clipPath id={`${componentId}-main-clip`}>
              <rect x={0} y={0} width={extentX} height={extentY} />
            </clipPath>
            {defs}
          </defs>
          {children}
          <g transform={`translate(${axisYWidth},0)`} clipPath={`url(#${componentId}-main-clip)`}>
            {overlays?.map((overlay, index) => (
              <XYChartOverlay<X>
                key={`_${overlay.id ?? index}`}
                {...overlay}
                theme={theme}
                colorMode={colorMode}
                scaleX={scaleX}
                width={extentX}
                height={extentY}
              />
            ))}
          </g>
          <rect
            ref={trackerRef}
            x={axisYWidth}
            y={0}
            width={extentX}
            height={extentY}
            opacity={0}
            fill="red"
            onMouseMove={onMouseMove}
            onMouseEnter={onMouseMove}
            onMouseLeave={onMouseLeave}
          />
        </svg>
        {tooltipVisible && slice && (
          <div
            css={StyleTooltip(theme.charts.xy.animation)}
            style={{
              left: axisYWidth,
              top: headerHeight,
              width: extentX,
              height: extentY,
            }}>
            <XYChartTooltip<X, Y, Data>
              theme={theme}
              colorMode={colorMode}
              slice={slice}
              computed={computed}
              domainX={computedDomainX}
              domainY={computedDomainY}
              format={formatTooltipValue}
              tooltipTotalVisible={tooltipTotalVisible}
              width={extentX}
              offset={tooltipOffset}
            />
          </div>
        )}
        {(computed == null || computed.length == 0) && (
          <ChartEmptyBlock
            theme={theme}
            colorMode={colorMode}
            background={background}
            width={extentX}
            height={extentY}
            position="absolute"
            top={headerHeight}
            left={axisYWidth}>
            {emptyText}
          </ChartEmptyBlock>
        )}
      </div>
    </ChartDatumContext.Provider>
  );
}
