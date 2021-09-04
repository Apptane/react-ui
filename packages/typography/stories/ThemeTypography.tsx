import upperFirst from "lodash/upperFirst";
import { FontSize, FontWeight, Text, Theme, TypographyCategory, useTheme } from "@apptane/react-ui";
import { css } from "@emotion/react";
import { Fragment } from "react";

export type ThemeTypographyVariantProps = {
  theme: Theme;
  category: TypographyCategory;
  size: FontSize;
  weight: FontWeight;
};

function formatSizeName(size: FontSize): string {
  switch (size) {
    case "xsmall":
      return "Extra Small";
    case "small":
      return "Small";
    case "medium":
      return "Medium";
    case "large":
      return "Large";
    case "xlarge":
      return "XL";
    case "xxlarge":
      return "XXL";
  }
}

export const ThemeTypographyVariant = ({ theme, category, size, weight }: ThemeTypographyVariantProps) => {
  const variant = theme.typography[category]![size]![weight]!;
  return (
    <tr>
      <td>
        <Text category={category} weight={weight} size={size}>
          {upperFirst(category)} {formatSizeName(size)} {upperFirst(weight)}
        </Text>
      </td>
      <td>
        <Text>{variant.weight}</Text>
      </td>
      <td>
        <Text>{variant.size}</Text>
      </td>
      <td>
        <Text>{variant.lineHeight}</Text>
      </td>
    </tr>
  );
};

export type ThemeTypographyCategoryProps = {
  theme: Theme;
  category: TypographyCategory;
};

export const ThemeTypographyCategory = ({ theme, category }: ThemeTypographyCategoryProps) => (
  <Fragment>
    {Object.keys(theme.typography[category])
      .filter((key) => key !== "font")
      .flatMap((size) =>
        Object.keys(theme.typography[category]![size as FontSize]!).map((weight) => (
          <ThemeTypographyVariant
            key={`${category}-${size}-${weight}`}
            theme={theme}
            category={category}
            size={size as FontSize}
            weight={weight as FontWeight}
          />
        ))
      )}
  </Fragment>
);

const styleTypographyTable = (theme: Theme) => css`
  flex: 1 1 100%;
  border-spacing: 0;
  border-collapse: collapse;

  td,
  th {
    padding: 20px 40px 20px 0;
    text-align: left;
  }

  td {
    border-bottom: solid 1px ${theme.palette.light.gray[50]};
  }
`;

export const ThemeTypographyVariants = () => {
  const theme = useTheme();
  return (
    <table css={styleTypographyTable(theme)}>
      <thead>
        <tr>
          <th></th>
          <th>
            <Text weight="bold">Weight</Text>
          </th>
          <th>
            <Text weight="bold">Size</Text>
          </th>
          <th>
            <Text weight="bold">Line Height</Text>
          </th>
        </tr>
      </thead>
      <tbody>
        <ThemeTypographyCategory theme={theme} category="header" />
        <ThemeTypographyCategory theme={theme} category="content" />
        <ThemeTypographyCategory theme={theme} category="control" />
      </tbody>
    </table>
  );
};
