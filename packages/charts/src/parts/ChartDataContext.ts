import { createContext } from "react";
import { DomainType, DomainXValue } from "../common/Types";

export interface ChartData<X extends DomainXValue> {
  /**
   * X domain type.
   */
  domainType: DomainType;

  /**
   * Comparator for values in X domain.
   */
  compareX?: (a: X, b: X) => number;

  /**
   * Scale function for X axis - converts X domain values into local coordinates.
   */
  scaleX: (v: X) => number | undefined;

  /**
   * Inverse scale function for X axis - converts local coordinates into X domain value.
   */
  invertX: (v: number) => X | undefined;

  /**
   * Bandwidth for ordinal scale.
   */
  bandwidth?: number;
}

const createEmptyChartData = <T extends DomainXValue>(): ChartData<T> => ({
  domainType: "none",
  compareX: () => 0,
  scaleX: () => undefined,
  invertX: () => undefined,
});

export const ChartTimeDataContext = createContext(createEmptyChartData<Date>());
export const ChartNumericDataContext = createContext(createEmptyChartData<number>());
export const ChartOrdinalDataContext = createContext(createEmptyChartData<string>());
