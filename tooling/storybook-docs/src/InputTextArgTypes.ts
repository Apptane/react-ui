import { InputBoxArgTypes } from "./InputBoxArgTypes";

export const InputTextArgTypes = {
  value: {
    table: {
      category: "Interactivity",
    },
  },
  onChange: {
    table: {
      category: "Interactivity",
    },
  },
  onKeyDown: {
    table: {
      category: "Interactivity",
    },
  },
  type: {
    table: {
      category: "Appearance",
    },
  },
  autoFocus: {
    table: {
      category: "Behavior",
    },
  },
  placeholder: {
    table: {
      category: "Content",
    },
  },
  lines: {
    table: {
      category: "Dimensions",
    },
  },
  ...InputBoxArgTypes,
};
