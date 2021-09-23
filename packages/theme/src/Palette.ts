import { Palette } from "@apptane/react-ui-core";

const DefaultPalette: Palette = {
  gray: {
    "900": "#161616",
    "800": "#262626",
    "700": "#393939",
    "600": "#525252",
    "500": "#6F6F6F",
    "400": "#8D8D8D",
    "300": "#A8A8A8",
    "200": "#C6C6C6",
    "100": "#E0E0E0",
    "50": "#F4F4F4",
  },

  text: {
    "900": "#14161C",
    "800": "#232630",
    "700": "#353946",
    "600": "#4C5264",
    "500": "#676E86",
    "400": "#858CA5",
    "300": "#A2A8BB",
    "200": "#C3C6D2",
    "100": "#DEE0E6",
    "50": "#F3F4F6",
  },

  pigments: {
    red: {
      "900": "#360004",
      "800": "#550009",
      "700": "#790011",
      "600": "#A7051E",
      "500": "#D91C32",
      "400": "#FC4C58",
      "300": "#FF8389",
      "200": "#FFB2B5",
      "100": "#FFD7D8",
      "50": "#FFF1F1",
    },
    orange: {
      "900": "#2B0D00",
      "800": "#451900",
      "700": "#632700",
      "600": "#8B3900",
      "500": "#B94E00",
      "400": "#E96500",
      "300": "#FF8759",
      "200": "#FFB4A1",
      "100": "#FFD7CF",
      "50": "#FFF1EE",
    },
    yellow: {
      "900": "#211300",
      "800": "#362200",
      "700": "#4F3400",
      "600": "#704B00",
      "500": "#956600",
      "400": "#BD8100",
      "300": "#E19B00",
      "200": "#FFB952",
      "100": "#FFDAB6",
      "50": "#FFF2E7",
    },
    green: {
      "900": "#001B06",
      "800": "#002D0F",
      "700": "#00431A",
      "600": "#006027",
      "500": "#008138",
      "400": "#00A348",
      "300": "#3ABF64",
      "200": "#70DB8C",
      "100": "#99F4AE",
      "50": "#D3FFDC",
    },
    cyan: {
      "900": "#001A17",
      "800": "#002C28",
      "700": "#00413C",
      "600": "#005D55",
      "500": "#007D73",
      "400": "#009E92",
      "300": "#00BCAF",
      "200": "#00DECE",
      "100": "#6CF6E7",
      "50": "#C8FFF7",
    },
    teal: {
      "900": "#00191F",
      "800": "#002B33",
      "700": "#003F4A",
      "600": "#005B69",
      "500": "#007A8D",
      "400": "#009BB2",
      "300": "#00B8D4",
      "200": "#5DD5F1",
      "100": "#A4EBFF",
      "50": "#E3F8FF",
    },
    blue: {
      "900": "#00172A",
      "800": "#002843",
      "700": "#003C61",
      "600": "#005688",
      "500": "#0074B5",
      "400": "#0093E4",
      "300": "#4FAEFF",
      "200": "#9DCAFF",
      "100": "#CEE2FF",
      "50": "#EEF5FF",
    },
    indigo: {
      "900": "#170052",
      "800": "#27007E",
      "700": "#3B00B1",
      "600": "#5519E8",
      "500": "#7152F2",
      "400": "#8E79FF",
      "300": "#A99BFF",
      "200": "#C7BFFF",
      "100": "#E0DDFF",
      "50": "#F4F3FF",
    },
    purple: {
      "900": "#28003E",
      "800": "#400060",
      "700": "#5D0088",
      "600": "#7F15B7",
      "500": "#AB1BF4",
      "400": "#BD61FF",
      "300": "#CB8EFF",
      "200": "#DBB8FF",
      "100": "#EBD9FF",
      "50": "#F8F2FF",
    },
  },

  white: "#FFFFFF",
  black: "#000000",
  light: "#FAFBFC", // "#F9F9FA",
  dark: "#0F1115",

  colormap: [
    {
      size: 4,
      colors: [
        ["blue", 400],
        ["orange", 300],
        ["cyan", 300],
        ["gray", 200],
      ],
    },
    {
      size: 5,
      colors: [
        ["indigo", 600],
        ["blue", 400],
        ["orange", 300],
        ["cyan", 300],
        ["gray", 200],
      ],
    },
    {
      size: 6,
      colors: [
        ["indigo", 600],
        ["blue", 400],
        ["orange", 300],
        ["cyan", 300],
        ["red", 400],
        ["gray", 200],
      ],
    },
    {
      size: 7,
      colors: [
        ["purple", 500],
        ["indigo", 600],
        ["blue", 400],
        ["orange", 300],
        ["cyan", 300],
        ["red", 400],
        ["gray", 200],
      ],
    },
  ],

  mapping: {
    accent: "blue",
    text: {
      default: ["text", 900],
      accent: ["accent", 500],
      contrast: ["text", 50],
      muted: ["text", 500],
      success: ["green", 400],
      warning: ["orange", 400],
      error: ["red", 500],
    },
    back: {
      default: ["accent", 50, 20],
      accent: ["accent", 50],
      contrast: ["accent", 900, 20],
      readonly: ["accent", 100, 20],
      backdrop: ["accent", 500, 20],
      highlight: ["accent", 100, 20],
    },
    border: {
      default: ["text", 200],
      accent: ["accent", 500],
      contrast: ["text", 800],
      divider: ["text", 100],
      focused: ["accent", 500],
      error: ["red", 500],
    },
  },
};

/**
 * Default theme: color palette
 */
export default DefaultPalette;
