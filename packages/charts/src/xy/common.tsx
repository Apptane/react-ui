import { ScaleBand } from "d3-scale";
import { DomainXValue, DomainYValue } from "../common/Types";
import { XYChartDatum, XYChartValue } from "./XYChart.types";

/**
 * Returns inverse function for d3-scaleBand
 */
export function scaleBandInvert<T>(scale: ScaleBand<T>) {
  const domain = scale.domain();
  const step = scale.step();
  const offset = scale(domain[0]) ?? 0;
  const paddingInnerHalf = scale.paddingInner() * step * 0.5;

  return function (value: number) {
    let index = Math.floor((value - offset) / step);
    if (value > offset + (index + 1) * step - paddingInnerHalf) {
      index++;
    }

    return domain[Math.max(0, Math.min(index, domain.length - 1))];
  };
}

/**
 * Finds primary or secondary value that matches the criteria in the predicate.
 */
export function findValue<X extends DomainXValue, Y extends DomainYValue, Data = void>(
  datum: XYChartDatum<X, Y, Data>,
  predicate: (p: XYChartValue<X, Y>) => boolean
): XYChartValue<X, Y> | undefined {
  return datum.pri.find(predicate) ?? datum.sec?.find(predicate);
}
