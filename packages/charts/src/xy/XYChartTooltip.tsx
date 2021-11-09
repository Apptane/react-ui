import { Pane } from "@apptane/react-ui-pane";
import { Tooltip } from "@apptane/react-ui-tooltip";
import { Text } from "@apptane/react-ui-typography";
import { useLayoutEffect, useRef, useState } from "react";
import { DomainXValue, DomainYValue } from "../common/Types";
import { ChartMarker } from "../parts/ChartMarker";
import { findValue } from "./common";
import { formatNumericTooltip } from "./commonXY";
import { XYChartTooltipProps } from "./XYChartTooltip.types";

export function XYChartTooltip<X extends DomainXValue, Y extends DomainYValue, Data = void>({
  theme,
  colorMode,
  slice,
  computed,
  domainX,
  domainY,
  format,
  tooltipTotalVisible,
  width,
  offset = 0,
  ...other
}: XYChartTooltipProps<X, Y, Data>) {
  const visualAppearance = theme.charts.xy.appearance(theme.palette[colorMode], colorMode, undefined, "none");
  const visualStyle = theme.charts.xy.style;

  const formatter = format ?? formatNumericTooltip;
  const containerRef = useRef<HTMLDivElement>(null);

  let hasValues = false;
  let total = 0;
  const items: JSX.Element[] = [];
  if (computed != null && domainX != null && slice.domainXIndex != null) {
    // use domain index to locate the corresponding value
    const dx = domainX.values[slice.domainXIndex];
    const dy = domainY != null && slice.domainYIndex != null ? domainY.values[slice.domainYIndex] : undefined;
    if (dx != null) {
      computed.forEach((d, index) => {
        let formattedValue = "—";

        // indicates XYZ situation
        if (domainY != null) {
          if (dy != null) {
            const p = findValue(d, (p) => domainX.isEqual(p.x, dx) && domainY.isEqual(p.y, dy));
            if (p != null && typeof p.z === "number" && isFinite(p.z)) {
              total += p.z;
              formattedValue = formatter(p.z);
              hasValues = true;
            }
          }
        } else {
          const p = findValue(d, (p) => domainX.isEqual(p.x, dx));
          if (p != null && typeof p.y === "number" && isFinite(p.y)) {
            total += p.y;

            let lb: number | undefined;
            let ub: number | undefined;
            if (d.bands != null) {
              const band = d.bands.find((p) => domainX.isEqual(p.x, dx));
              if (
                band != null &&
                typeof band.y0 === "number" &&
                isFinite(band.y0) &&
                typeof band.y1 === "number" &&
                isFinite(band.y1)
              ) {
                lb = band.y0;
                ub = band.y1;
              }
            }

            formattedValue = formatter(p.y, lb, ub);
            hasValues = true;
          }
        }

        items.push(
          <Pane key={`_${index}`} verticalAlignment="center" orientation="horizontal" overflow="hidden">
            <ChartMarker theme={theme} colorMode={colorMode} color={d.color ?? ""} {...other} />
            <Text
              color={visualAppearance.tooltip.label}
              {...visualStyle.font.tooltip.label}
              marginLeft={visualStyle.tooltip.markerSpacing}
              nowrap
              ellipsis>
              {d.label}
            </Text>
            <Pane grow={1} verticalAlignment="center" horizontalAlignment="right" orientation="horizontal">
              <Text
                alignment="right"
                color={visualAppearance.tooltip.value}
                {...visualStyle.font.tooltip.value}
                marginLeft={visualStyle.tooltip.valueSpacing}
                nowrap>
                {formattedValue}
              </Text>
            </Pane>
          </Pane>
        );
      });
    }
  }

  const top = slice.y != null ? Math.max(0, slice.y) : 0;
  const position = Math.max(0, slice.x ?? 0);

  const [left, setLeft] = useState(position);
  useLayoutEffect(() => {
    if (containerRef.current != null) {
      const containerWidth = Math.round(containerRef.current.getBoundingClientRect().width);
      setLeft(
        position >= width - offset - containerWidth
          ? Math.max(0, position - offset - containerWidth)
          : position + offset
      );
    }
  }, [position, offset, width]);

  if (items.length === 0 || !hasValues) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      style={{
        left: Math.round(left),
        top: Math.round(top),
        transform: slice.y != null ? "translateY(-50%)" : undefined,
      }}>
      <Tooltip colorMode={colorMode} maxWidth={Math.min(350, width)}>
        {slice.label && (
          <Text
            color={visualAppearance.tooltip.header}
            {...visualStyle.font.tooltip.header}
            marginBottom={visualStyle.tooltip.headerSpacing}>
            {slice.label}
          </Text>
        )}
        {tooltipTotalVisible && items.length > 1 && (
          <Pane verticalAlignment="center" orientation="horizontal">
            <Text color={visualAppearance.tooltip.label} {...visualStyle.font.tooltip.label} nowrap>
              Total
            </Text>
            <Pane grow={1} verticalAlignment="center" horizontalAlignment="right" orientation="horizontal">
              <Text
                alignment="right"
                color={visualAppearance.tooltip.value}
                {...visualStyle.font.tooltip.value}
                marginLeft={visualStyle.tooltip.valueSpacing}
                nowrap>
                {formatter(total)}
              </Text>
            </Pane>
          </Pane>
        )}
        {items}
      </Tooltip>
    </div>
  );
}
