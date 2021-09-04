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

const DefaultTypography: Typography = {
  content: {
    font: DefaultFontRegular,
    xsmall: {
      regular: font(DefaultFontRegular, content.xs),
      medium: font(DefaultFontMedium, content.xs),
      bold: font(DefaultFontBold, content.xs),
    },
    small: {
      regular: font(DefaultFontRegular, content.s),
      medium: font(DefaultFontMedium, content.s),
      bold: font(DefaultFontBold, content.s),
    },
    medium: {
      regular: font(DefaultFontRegular, content.m),
      medium: font(DefaultFontMedium, content.m),
      bold: font(DefaultFontBold, content.m),
    },
    large: {
      regular: font(DefaultFontRegular, content.l),
      medium: font(DefaultFontMedium, content.l),
      bold: font(DefaultFontBold, content.l),
    },
    xlarge: {
      regular: font(DefaultFontRegular, content.xl),
      medium: font(DefaultFontMedium, content.xl),
      bold: font(DefaultFontBold, content.xl),
    },
    xxlarge: {
      regular: font(DefaultFontRegular, content.xxl),
      medium: font(DefaultFontMedium, content.xxl),
      bold: font(DefaultFontBold, content.xxl),
    },
  },
  numeric: {
    font: DefaultFontRegular,
    xsmall: {
      regular: font(DefaultFontRegular, content.xs, numerals),
      medium: font(DefaultFontMedium, content.xs, numerals),
      bold: font(DefaultFontBold, content.xs, numerals),
    },
    small: {
      regular: font(DefaultFontRegular, content.s, numerals),
      medium: font(DefaultFontMedium, content.s, numerals),
      bold: font(DefaultFontBold, content.s, numerals),
    },
    medium: {
      regular: font(DefaultFontRegular, content.m, numerals),
      medium: font(DefaultFontMedium, content.m, numerals),
      bold: font(DefaultFontBold, content.m, numerals),
    },
    large: {
      regular: font(DefaultFontRegular, content.l, numerals),
      medium: font(DefaultFontMedium, content.l, numerals),
      bold: font(DefaultFontBold, content.l, numerals),
    },
    xlarge: {
      regular: font(DefaultFontRegular, content.xl, numerals),
      medium: font(DefaultFontMedium, content.xl, numerals),
      bold: font(DefaultFontBold, content.xl, numerals),
    },
    xxlarge: {
      regular: font(DefaultFontRegular, content.xxl, numerals),
      medium: font(DefaultFontMedium, content.xxl, numerals),
      bold: font(DefaultFontBold, content.xxl, numerals),
    },
  },
  control: {
    font: DefaultFontRegular,
    small: {
      regular: font(DefaultFontRegular, control.s),
      medium: font(DefaultFontMedium, control.s),
      bold: font(DefaultFontBold, control.s),
    },
    medium: {
      regular: font(DefaultFontRegular, control.m),
      medium: font(DefaultFontMedium, control.m),
      bold: font(DefaultFontBold, control.m),
    },
    large: {
      regular: font(DefaultFontRegular, control.l),
      medium: font(DefaultFontMedium, control.l),
      bold: font(DefaultFontBold, control.l),
    },
  },
  header: {
    font: DefaultFontBold,
    xsmall: {
      bold: font(DefaultFontMedium, header.xs, {
        spacing: "0.05em",
      }),
    },
    small: {
      bold: font(DefaultFontBold, header.s),
    },
    medium: {
      bold: font(DefaultFontBold, header.m),
    },
    large: {
      bold: font(DefaultFontBold, header.l),
    },
    xlarge: {
      bold: font(DefaultFontBold, header.xl),
    },
  },
};

/**
 * Default theme: typography
 */
export default DefaultTypography;
