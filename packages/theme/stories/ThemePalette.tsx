import upperFirst from "lodash/upperFirst";
import { Text, useTheme } from "@apptane/react-ui";
import {
  Color,
  ColorMode,
  Palette,
  PaletteHue,
  PaletteMappingVariants,
  PalettePigment,
  PaletteReference,
  PaletteWeight,
  resolvePaletteReference,
} from "@apptane/react-ui-core";
import { contrast } from "@apptane/react-ui-storybook-docs";
import { css } from "@emotion/react";
import { hexToHsluv } from "hsluv";

const styleColorBlock = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  width: 60px;
  height: 60px;
  padding: 10px;
  row-gap: 5px;
`;

const styleColorHint = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

export type ThemeColorProps = {
  palette: Palette;
  color: Color;
  weight: PaletteWeight;
};

export const ThemeColor = ({ palette, color, weight }: ThemeColorProps) => {
  const hsluv = hexToHsluv(color);
  const c = contrast(color, "#ffffff");
  return (
    <td>
      <div css={styleColorBlock} style={{ background: color }}>
        <Text category="numeric" weight="bold" size="small" color={weight < 500 ? palette.black : palette.white}>
          {weight}
        </Text>
        <Text category="numeric" size="xsmall" color={weight < 500 ? palette.black : palette.white}>
          {c?.toFixed(2)} : 1
        </Text>
      </div>
      <div css={styleColorHint}>
        <Text category="numeric" size="medium">
          {color}
        </Text>
        <Text category="numeric" size="xsmall" color="muted" marginTop={4}>
          {Math.round(hsluv[0])}, {Math.round(hsluv[1])}%, {Math.round(hsluv[2])}%
        </Text>
      </div>
    </td>
  );
};

export type ThemeSemanticColorProps = {
  palette: Palette;
  color: Color;
  name: string;
};

export const ThemeSemanticColor = ({ palette, color, name }: ThemeSemanticColorProps) => {
  return (
    <td>
      <div css={styleColorBlock} style={{ background: color }} />
      <div css={styleColorHint}>
        <Text size="medium">{name}</Text>
      </div>
    </td>
  );
};

const styleColorAccent = (palette: Palette) => css`
  border: solid 1px ${palette.text[900]};
`;

export type ThemeColorPigmentProps = {
  palette: Palette;
  name: string;
  pigment: PalettePigment;
};

export const ThemeColorPigment = ({ palette, name, pigment }: ThemeColorPigmentProps) => {
  // compute average hue
  const colors = Object.values(pigment);
  const h = Math.round(colors.reduce((acc, color) => acc + hexToHsluv(color)[0], 0) / colors.length);
  return (
    <tr css={[name === palette.mapping.accent && styleColorAccent(palette)]}>
      <th>
        <Text size="medium">{upperFirst(name)}</Text>
        <br />
        <Text size="medium">H={h}</Text>
      </th>
      {Object.keys(pigment).map((key) => (
        <ThemeColor
          key={key}
          palette={palette}
          weight={parseInt(key) as PaletteWeight}
          color={pigment[parseInt(key) as PaletteWeight]}
        />
      ))}
    </tr>
  );
};

const styleContrast = css`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  left: calc(8px + 50%);
  width: 80px;

  > span {
    background: #fff;
    padding: 4px;
    z-index: 1;
  }
  &::before {
    content: "";
    border-color: #c3c6d2;
    border-width: 1px;
    border-style: none solid solid solid;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 50%;
  }
`;

export const ThemeColorPigmentContrasts = ({ pigment }: { pigment: PalettePigment }) => {
  const colors = Object.values(pigment);
  const contrasts = colors.map((c, index) => contrast(c, index === 0 ? "#ffffff" : colors[index - 1]));
  contrasts.push(contrast("#000000", colors[colors.length - 1]));

  return (
    <tr>
      {contrasts.map((c, index) => (
        <td key={`__${index}`} style={{ paddingTop: 0 }}>
          <div css={styleContrast}>
            <Text category="numeric" size="small">
              {c?.toFixed(2)} : 1
            </Text>
          </div>
        </td>
      ))}
    </tr>
  );
};

export type ThemeColorReferenceMappingProps<K extends string | symbol> = {
  palette: Palette;
  name: string;
  variants: PaletteMappingVariants<K, PaletteReference>;
};

export const ThemeColorReferenceMapping = <K extends string | symbol>({
  palette,
  name,
  variants,
}: ThemeColorReferenceMappingProps<K>) => {
  return (
    <tr>
      <th>
        <Text size="medium">{upperFirst(name)}</Text>
      </th>
      {Object.keys(variants).map((key) => (
        <ThemeSemanticColor
          key={key}
          palette={palette}
          name={key}
          color={resolvePaletteReference(palette, variants[key as K])}
        />
      ))}
    </tr>
  );
};

const styleColorTable = css`
  flex: 1 1 100%;
  border-spacing: 0;
  border-collapse: collapse;
  margin-bottom: 30px;

  td,
  th {
    padding: 8px;
    vertical-align: top;
  }

  th {
    padding-top: 30px;
  }

  thead > tr > td {
    text-align: center;
  }
`;

export const ThemeColorPalette = ({ mode = "light" }: { mode: ColorMode }) => {
  const theme = useTheme();
  const palette = theme.palette[mode];
  return (
    <table css={styleColorTable}>
      <thead>
        <tr>
          <td />
          {Object.keys(palette.gray).map((key) => (
            <td key={key}>
              <Text category="numeric" size="medium" weight="bold">
                {key}
              </Text>
            </td>
          ))}
        </tr>
      </thead>
      <tbody>
        <ThemeColorPigment palette={palette} name="gray" pigment={palette.gray} />
        <ThemeColorPigmentContrasts pigment={palette.gray} />
        <ThemeColorPigment palette={palette} name="text" pigment={palette.text} />
        {Object.keys(palette.pigments).map((key) => (
          <ThemeColorPigment key={key} palette={palette} name={key} pigment={palette.pigments[key as PaletteHue]} />
        ))}
      </tbody>
    </table>
  );
};

export const ThemeColorSemanticPalette = ({ mode = "light" }: { mode: ColorMode }) => {
  const theme = useTheme();
  const palette = theme.palette[mode];
  return (
    <table css={styleColorTable}>
      <tbody>
        <ThemeColorReferenceMapping palette={palette} name="text" variants={palette.mapping.text} />
        <ThemeColorReferenceMapping palette={palette} name="back" variants={palette.mapping.back} />
        <ThemeColorReferenceMapping palette={palette} name="border" variants={palette.mapping.border} />
      </tbody>
    </table>
  );
};
