import { InputBoxArgTypes } from "./InputBoxArgTypes";

export const InputNumericArgTypes = {
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
  prefix: {
    table: {
      category: "Format",
    },
  },
  suffix: {
    table: {
      category: "Format",
    },
  },
  thousands: {
    table: {
      category: "Format",
    },
  },
  precision: {
    table: {
      category: "Format",
    },
  },
  digits: {
    table: {
      category: "Format",
    },
  },
  negative: {
    table: {
      category: "Format",
    },
  },
  delimiters: {
    table: {
      category: "Format",
    },
  },
  ...InputBoxArgTypes,
};
