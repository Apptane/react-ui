import { MarginArgTypes } from "./MarginArgTypes";

export const InputBoxArgTypes = {
  embedLeft: {
    table: {
      category: "Content",
    },
  },
  embedRight: {
    table: {
      category: "Content",
    },
  },
  label: {
    table: {
      category: "Content",
    },
  },
  colorMode: {
    table: {
      category: "Appearance",
    },
  },
  appearance: {
    table: {
      category: "Appearance",
    },
    options: ["default", "embedded"],
    control: {
      type: "radio",
    },
  },
  alignment: {
    table: {
      category: "Appearance",
    },
  },
  error: {
    table: {
      category: "Appearance",
    },
  },
  errorAppearance: {
    table: {
      category: "Appearance",
    },
  },
  disabled: {
    table: {
      category: "Behavior",
    },
  },
  readonly: {
    table: {
      category: "Behavior",
    },
  },
  focused: {
    table: {
      category: "Behavior",
    },
  },
  size: {
    table: {
      category: "Dimensions",
    },
  },
  width: {
    table: {
      category: "Dimensions",
    },
  },
  flex: {
    table: {
      category: "Dimensions",
    },
  },
  inline: {
    table: {
      category: "Dimensions",
    },
  },
  iconAfterName: {
    table: {
      category: "Icon",
    },
  },
  iconAfterData: {
    table: {
      category: "Icon",
    },
  },
  iconBeforeName: {
    table: {
      category: "Icon",
    },
  },
  iconBeforeData: {
    table: {
      category: "Icon",
    },
  },
  ...MarginArgTypes,
};
