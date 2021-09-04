import { Elevation, ElevationStyle } from "@apptane/react-ui-core";

/**
 * Default theme: pane elevations
 */
export default (level?: Elevation): ElevationStyle | undefined => {
  switch (level) {
    case 1:
      return {
        filter: "drop-shadow(0px 0px 2px rgba(26, 26, 51, 0.1)) drop-shadow(0px 2px 6px rgba(26, 26, 51, 0.2))",
      };
    case 2:
      return {
        filter: "drop-shadow(0px 2px 4px rgba(26, 26, 51, 0.08)) drop-shadow(0px 8px 20px rgba(26, 26, 51, 0.2))",
      };
    case 3:
      return {
        filter: "drop-shadow(0px 0px 16px rgba(26, 26, 51, 0.05)) drop-shadow(0px 24px 56px rgba(26, 26, 51, 0.24))",
      };
  }
};
