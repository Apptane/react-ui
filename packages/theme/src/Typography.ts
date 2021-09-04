import {
  MonoNumeralsFontFeatures,
  MonoNumeralsFontNumeric,
  Typography,
  TypographyCategoryVariant,
  TypographyFont,
} from "./Typography.types";

const SystemFontFamily =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'";

const DefaultFontRegular = {
  family: SystemFontFamily,
  weight: 400,
};

const DefaultFontMedium = {
  family: SystemFontFamily,
  weight: 500,
};

const DefaultFontBold = {
  family: SystemFontFamily,
  weight: 700,
};

const content: {
  [key: string]: [size: number | string, lineHeight: number | string];
} = {
  xs: ["10px", "12px"],
  s: ["12px", "16px"],
  m: ["14px", "20px"],
  l: ["16px", "24px"],
  xl: ["24px", "32px"],
  xxl: ["32px", "40px"],
};

const control: {
  [key: string]: [size: number | string, lineHeight: number | string];
} = {
  s: ["12px", "16px"],
  m: ["14px", "18px"],
  l: ["16px", "24px"],
};

const header: {
  [key: string]: [size: number | string, lineHeight: number | string];
} = {
  xs: ["10px", "12px"],
  s: ["16px", "20px"],
  m: ["18px", "24px"],
  l: ["24px", "32px"],
  xl: ["32px", "40px"],
};

const numerals = {
  features: MonoNumeralsFontFeatures,
  numeric: MonoNumeralsFontNumeric,
};

const font = (
  font: TypographyFont,
  dimensions: [size: number | string, lineHeight: number | string],
  props?: Partial<TypographyCategoryVariant>
): TypographyCategoryVariant => ({
  family: font.family,
  weight: font.weight,
  size: dimensions[0],
  lineHeight: dimensions[1],
  ...props,
});

/**
 * Creates theme typography definition with the default sizes and specified fonts.
 */
export const createThemeTypography = (
  fontRegular: TypographyFont,
  fontMedium?: TypographyFont,
  fontBold?: TypographyFont
): Typography => ({
  content: {
    font: fontRegular,
    xsmall: {
      regular: font(fontRegular, content.xs),
      medium: font(fontMedium ?? fontRegular, content.xs),
      bold: font(fontBold ?? fontMedium ?? fontRegular, content.xs),
    },
    small: {
      regular: font(fontRegular, content.s),
      medium: font(fontMedium ?? fontRegular, content.s),
      bold: font(fontBold ?? fontMedium ?? fontRegular, content.s),
    },
    medium: {
      regular: font(fontRegular, content.m),
      medium: font(fontMedium ?? fontRegular, content.m),
      bold: font(fontBold ?? fontMedium ?? fontRegular, content.m),
    },
    large: {
      regular: font(fontRegular, content.l),
      medium: font(fontMedium ?? fontRegular, content.l),
      bold: font(fontBold ?? fontMedium ?? fontRegular, content.l),
    },
    xlarge: {
      regular: font(fontRegular, content.xl),
      medium: font(fontMedium ?? fontRegular, content.xl),
      bold: font(fontBold ?? fontMedium ?? fontRegular, content.xl),
    },
    xxlarge: {
      regular: font(fontRegular, content.xxl),
      medium: font(fontMedium ?? fontRegular, content.xxl),
      bold: font(fontBold ?? fontMedium ?? fontRegular, content.xxl),
    },
  },
  numeric: {
    font: fontRegular,
    xsmall: {
      regular: font(fontRegular, content.xs, numerals),
      medium: font(fontMedium ?? fontRegular, content.xs, numerals),
      bold: font(fontBold ?? fontMedium ?? fontRegular, content.xs, numerals),
    },
    small: {
      regular: font(fontRegular, content.s, numerals),
      medium: font(fontMedium ?? fontRegular, content.s, numerals),
      bold: font(fontBold ?? fontMedium ?? fontRegular, content.s, numerals),
    },
    medium: {
      regular: font(fontRegular, content.m, numerals),
      medium: font(fontMedium ?? fontRegular, content.m, numerals),
      bold: font(fontBold ?? fontMedium ?? fontRegular, content.m, numerals),
    },
    large: {
      regular: font(fontRegular, content.l, numerals),
      medium: font(fontMedium ?? fontRegular, content.l, numerals),
      bold: font(fontBold ?? fontMedium ?? fontRegular, content.l, numerals),
    },
    xlarge: {
      regular: font(fontRegular, content.xl, numerals),
      medium: font(fontMedium ?? fontRegular, content.xl, numerals),
      bold: font(fontBold ?? fontMedium ?? fontRegular, content.xl, numerals),
    },
    xxlarge: {
      regular: font(fontRegular, content.xxl, numerals),
      medium: font(fontMedium ?? fontRegular, content.xxl, numerals),
      bold: font(fontBold ?? fontMedium ?? fontRegular, content.xxl, numerals),
    },
  },
  control: {
    font: fontRegular,
    small: {
      regular: font(fontRegular, control.s),
      medium: font(fontMedium ?? fontRegular, control.s),
      bold: font(fontBold ?? fontMedium ?? fontRegular, control.s),
    },
    medium: {
      regular: font(fontRegular, control.m),
      medium: font(fontMedium ?? fontRegular, control.m),
      bold: font(fontBold ?? fontMedium ?? fontRegular, control.m),
    },
    large: {
      regular: font(fontRegular, control.l),
      medium: font(fontMedium ?? fontRegular, control.l),
      bold: font(fontBold ?? fontMedium ?? fontRegular, control.l),
    },
  },
  header: {
    font: fontBold ?? fontMedium ?? fontRegular,
    xsmall: {
      bold: font(fontMedium ?? fontRegular, header.xs, {
        spacing: "0.05em",
      }),
    },
    small: {
      bold: font(fontBold ?? fontMedium ?? fontRegular, header.s),
    },
    medium: {
      bold: font(fontBold ?? fontMedium ?? fontRegular, header.m),
    },
    large: {
      bold: font(fontBold ?? fontMedium ?? fontRegular, header.l),
    },
    xlarge: {
      bold: font(fontBold ?? fontMedium ?? fontRegular, header.xl),
    },
  },
});

const DefaultTypography = createThemeTypography(DefaultFontRegular, DefaultFontMedium, DefaultFontBold);

/**
 * Default theme: typography
 */
export default DefaultTypography;
