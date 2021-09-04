import { Color, ComponentTheme, FontProps } from "@apptane/react-ui-core";

export type TableViewVisualStyle = {
  /**
   * Border width in pixels between rows.
   */
  rowBorderWidth: number;

  /**
   * Border width in pixels between fixed and other cells.
   */
  fixedBorderWidth: number;

  /**
   * Default left/right cell padding in pixels.
   */
  cellPadding: number;

  /**
   * Overrides default left padding for the first and
   * default right padding for the last cell.
   */
  cellSidePadding: number;

  /**
   * Left padding adjustment for the header cell with sort glyph.
   */
  cellSortPadding: number;

  /**
   * Sort icon spacing in pixels.
   */
  sortIconSpacing: number;

  /**
   * Sort icon (glyph) size.
   */
  sortIconSize: number;

  /**
   * Typography.
   */
  font: {
    /**
     * Header font.
     */
    header: FontProps;
  };
};

export type TableViewRowVisualAppearance = {
  /**
   * Text color.
   */
  text: Color;

  /**
   * Background color.
   */
  back: Color;

  /**
   * Highlight color.
   */
  highlight: Color;

  /**
   * Border color.
   */
  border?: Color;
};

export type TableViewVisualAppearance = {
  /**
   * Header row appearance.
   */
  header: TableViewRowVisualAppearance;

  /**
   * Regular row appearance.
   */
  row: TableViewRowVisualAppearance;

  /**
   * Sort glyph appearance.
   */
  sort: {
    /**
     * Active color.
     */
    active: Color;

    /**
     * Normal color.
     */
    default: Color;
  };
};

/**
 * Theme type definitions: TableView
 */
export type TableViewTheme = ComponentTheme<TableViewVisualStyle, TableViewVisualAppearance>;
