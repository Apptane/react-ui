import { BoxBorderArgTypes } from "./BoxBorderArgTypes";
import { BoxDimensionsArgTypes } from "./BoxDimensionsArgTypes";
import { BoxLayoutArgTypes } from "./BoxLayoutArgTypes";
import { MarginArgTypes } from "./MarginArgTypes";
import { PaddingArgTypes } from "./PaddingArgTypes";

export const PaneArgTypes = {
  children: {
    table: {
      category: "Content",
    },
    control: "text",
  },
  zIndex: {
    table: {
      category: "Behavior",
    },
  },
  overflow: {
    table: {
      category: "Behavior",
    },
  },
  inline: {
    table: {
      category: "Behavior",
    },
  },
  interactive: {
    table: {
      category: "Behavior",
    },
  },
  animated: {
    table: {
      category: "Behavior",
    },
  },
  scrollOnOverflow: {
    table: {
      category: "Behavior",
    },
  },
  transitionDuration: {
    table: {
      category: "Behavior",
    },
    control: {
      type: "range",
      min: 0,
      max: 5000,
      step: 100,
    },
  },
  colorMode: {
    table: {
      category: "Appearance",
    },
  },
  appearance: {
    table: {
      disable: true,
    },
  },
  style: {
    table: {
      category: "Appearance",
    },
  },
  accessibilityRole: {
    table: {
      category: "Accessibility",
    },
  },
  background: {
    table: {
      category: "Background",
    },
  },
  striped: {
    table: {
      category: "Background",
    },
  },
  elevation: {
    table: {
      category: "Border",
    },
  },
  ...BoxDimensionsArgTypes,
  ...BoxLayoutArgTypes,
  ...BoxBorderArgTypes,
  ...PaddingArgTypes,
  ...MarginArgTypes,
};
