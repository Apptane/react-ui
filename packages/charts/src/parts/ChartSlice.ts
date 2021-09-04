export interface ChartSlice {
  /**
   * Formatted label.
   */
  label?: string;

  /**
   * Local X coordinate.
   */
  x?: number;

  /**
   * Index in the X domain.
   */
  domainXIndex?: number;

  /**
   * Local Y coordinate.
   */
  y?: number;

  /**
   * Index in the Y domain.
   */
  domainYIndex?: number;
}
