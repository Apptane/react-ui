import { resolveBackgroundColor, resolveTextColor } from "@apptane/react-ui-core";
import memoize from "memoizee";
import { TableViewTheme } from "./TableViewTheme.types";

const DefaultTableViewTheme: TableViewTheme = {
  style: {
    rowBorderWidth: 1,
    fixedBorderWidth: 2,
    cellPadding: 16,
    cellSidePadding: 24,
    cellSortPadding: -8,
    sortIconSpacing: 4,
    sortIconSize: 20,
    font: {
      header: {
        category: "content",
        size: "medium",
        weight: "medium",
      },
    },
  },
  appearance: memoize((palette) => ({
    header: {
      text: resolveTextColor(palette, "default"),
      back: palette.light,
      highlight: resolveBackgroundColor(palette, "highlight"),
      border: palette.text[100],
    },
    row: {
      text: resolveTextColor(palette, "default"),
      back: palette.light,
      highlight: resolveBackgroundColor(palette, "highlight"),
      border: palette.text[100],
    },
    sort: {
      active: resolveTextColor(palette, "default"),
      default: resolveTextColor(palette, "muted"),
    },
  })),
};

/**
 * Default theme: TableView
 */
export default DefaultTableViewTheme;
