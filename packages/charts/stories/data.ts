import { XYChartDatum } from "@apptane/react-ui";

const ALPHABET = [
  "Alpha",
  "Beta",
  "Gamma",
  "Delta",
  "Epsilon",
  "Zeta",
  "Eta",
  "Theta",
  "Iota",
  "Kappa",
  "Lambda",
  "Mu",
  "Nu",
  "Xi",
  "Omicron",
  "Pi",
  "Rho",
  "Sigma",
  "Tau",
  "Upsilon",
  "Phi",
  "Chi",
  "Psi",
  "Omega",
];

function random(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

/**
 * Generates random values.
 */
export function generateRandomValues(count: number, min: number, max: number, gapThreshold?: number) {
  const values: number[] = [];
  for (let i = 0; i < count; i++) {
    if (gapThreshold && Math.random() < gapThreshold) {
      values.push(NaN);
    } else {
      values.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
  }
  return values;
}

export function generateTimeSeries(
  id: string,
  label: string,
  origin: Date,
  steps: number,
  grain: number,
  min: number,
  max: number,
  gapThreshold?: number,
  color?: string,
  band?: [number, number],
  secondary?: number
) {
  const originEpoch = origin.valueOf();
  const values = generateRandomValues(steps, min, max, gapThreshold).map((value, index) => ({
    x: new Date(originEpoch + index * grain * 1000),
    y: value,
  }));

  const datum: XYChartDatum<Date, number> = {
    id,
    label,
    color,
    pri: secondary != null && secondary > 0 ? values.slice(0, -secondary) : values,
    sec: secondary != null && secondary > 0 ? values.slice(-secondary) : undefined,
  };

  if (band != null) {
    datum.bands = values.map((value) => ({
      x: value.x,
      y0: isFinite(value.y) ? value.y * (1 - random(0.5, 1) * band[0]) : NaN,
      y1: isFinite(value.y) ? value.y * (1 + random(0.5, 1) * band[1]) : NaN,
    }));
  }

  return datum;
}

export const TimeDomainLength = 100;
export const TimeDomainGrain = 3600;
export const TimeDomainOrigin = new Date("2019-01-01T00:00:00");
export const TimeDomain = [
  TimeDomainOrigin,
  new Date(TimeDomainOrigin.valueOf() + (TimeDomainLength - 1) * TimeDomainGrain * 1000),
];

export const TimeOverlay1 = {
  title: "Forecast",
  x0: new Date(TimeDomain[1].valueOf() - 20 * TimeDomainGrain * 1000),
};

export const TimeOverlay2 = {
  x0: new Date(TimeDomain[0].valueOf() + 20 * TimeDomainGrain * 1000),
  x1: new Date(TimeDomain[0].valueOf() + 30 * TimeDomainGrain * 1000),
  color: "red",
};

export const SingleTimeSeriesData = [
  generateTimeSeries("a", "Alpha", TimeDomainOrigin, TimeDomainLength, TimeDomainGrain, 20, 80),
];

export const DoubleTimeSeriesData = [
  generateTimeSeries("a", "Alpha", TimeDomainOrigin, TimeDomainLength, TimeDomainGrain, 0, 100),
  generateTimeSeries("b", "Bravo", TimeDomainOrigin, TimeDomainLength, TimeDomainGrain, 0, 100, 0.5),
];

export const MultiTimeSeriesData = [
  generateTimeSeries("a", "Alpha", TimeDomainOrigin, TimeDomainLength, TimeDomainGrain, 0, 10),
  generateTimeSeries("b", "Bravo", TimeDomainOrigin, TimeDomainLength, TimeDomainGrain, 10, 20, 0.7),
  generateTimeSeries("c", "Charlie", TimeDomainOrigin, TimeDomainLength, TimeDomainGrain, 20, 30),
  generateTimeSeries("d", "Delta", TimeDomainOrigin, TimeDomainLength, TimeDomainGrain, 30, 40, 0.5),
  generateTimeSeries("e", "Echo", TimeDomainOrigin, TimeDomainLength, TimeDomainGrain, 40, 50),
  generateTimeSeries("f", "Foxtrot", TimeDomainOrigin, TimeDomainLength, TimeDomainGrain, 50, 60, 0.6),
  generateTimeSeries("g", "Golf", TimeDomainOrigin, TimeDomainLength, TimeDomainGrain, 60, 70, 0.6),
];

export const BandTimeSeriesData1 = [
  generateTimeSeries(
    "a",
    "Alpha",
    TimeDomainOrigin,
    TimeDomainLength,
    TimeDomainGrain,
    30,
    70,
    0.05,
    undefined,
    [0.25, 0.25],
    20
  ),
];

export const BandTimeSeriesData2 = [
  generateTimeSeries(
    "a",
    "Alpha",
    TimeDomainOrigin,
    TimeDomainLength,
    TimeDomainGrain,
    30,
    70,
    0.05,
    undefined,
    [0.25, 0.25],
    20
  ),
  generateTimeSeries(
    "b",
    "Bravo",
    TimeDomainOrigin,
    TimeDomainLength,
    TimeDomainGrain,
    45,
    80,
    undefined,
    undefined,
    [0.2, 0.1]
  ),
];

export const IoTimeSeriesData = [
  generateTimeSeries("io.r", "Read", TimeDomainOrigin, TimeDomainLength, TimeDomainGrain, 200, 300),
  generateTimeSeries("io.w", "Write", TimeDomainOrigin, TimeDomainLength, TimeDomainGrain, 150, 450, 0.2),
];

export function generateOrdinalSeries(
  id: string,
  label: string,
  domain: string[],
  min: number,
  max: number,
  gapThreshold?: number,
  color?: string,
  secondary?: number
) {
  const values = generateRandomValues(domain.length, min, max, gapThreshold).map((value, index) => ({
    x: domain[index],
    y: value,
  }));

  return {
    id,
    label,
    color,
    pri: secondary != null && secondary > 0 ? values.slice(0, -secondary) : values,
    sec: secondary != null && secondary > 0 ? values.slice(-secondary) : undefined,
  };
}

export const OrdinalDomain = ["0-1", "1-2", "2-5", "5-10", "10-20", "20-50", "50+"];

export const SingleOrdinalSeriesData = [generateOrdinalSeries("a", "Alpha", OrdinalDomain, 20, 80)];

export const DoubleOrdinalSeriesData = [
  generateOrdinalSeries("a", "Alpha", OrdinalDomain, 0, 100),
  generateOrdinalSeries("b", "Bravo", OrdinalDomain, 0, 100, 0.5),
];

export const MultiOrdinalSeriesData = [
  generateOrdinalSeries("a", "Alpha", OrdinalDomain, 0, 10),
  generateOrdinalSeries("b", "Bravo", OrdinalDomain, 10, 20, 0.7),
  generateOrdinalSeries("c", "Charlie", OrdinalDomain, 20, 30),
  generateOrdinalSeries("d", "Delta", OrdinalDomain, 30, 40, 0.5),
  generateOrdinalSeries("e", "Echo", OrdinalDomain, 40, 50),
  generateOrdinalSeries("f", "Foxtrot", OrdinalDomain, 50, 60, 0.6),
  generateOrdinalSeries("g", "Golf", OrdinalDomain, 60, 70, 0.6),
];

export const DoubleOrdinalSeriesData2 = [
  generateOrdinalSeries("a", "Alpha", OrdinalDomain, 0, 100, undefined, undefined, 1),
  generateOrdinalSeries("b", "Bravo", OrdinalDomain, 0, 100, 0.5, undefined, 1),
];

export function generateNumericSeries(
  id: string,
  label: string,
  domain: number[],
  steps: number,
  min: number,
  max: number,
  gapThreshold?: number,
  color?: string
) {
  const grain = (domain[1] - domain[0]) / steps;
  return {
    id,
    label,
    color,
    pri: generateRandomValues(steps, min, max, gapThreshold).map((value, index) => ({
      x: domain[0] + grain * index,
      y: value,
    })),
  };
}

export const NumericDomain = [100, 200];
export const NumericDomainLength = 100;

export const SingleNumericSeriesData = [
  generateNumericSeries("a", "Alpha", NumericDomain, NumericDomainLength, 20, 80),
];

export const DoubleNumericSeriesData = [
  generateNumericSeries("a", "Alpha", NumericDomain, NumericDomainLength, 0, 100),
  generateNumericSeries("b", "Bravo", NumericDomain, NumericDomainLength, 0, 100, 0.5),
];

export const MultiNumericSeriesData = [
  generateNumericSeries("a", "Alpha", NumericDomain, NumericDomainLength, 0, 10),
  generateNumericSeries("b", "Bravo", NumericDomain, NumericDomainLength, 10, 20, 0.7),
  generateNumericSeries("c", "Charlie", NumericDomain, NumericDomainLength, 20, 30),
  generateNumericSeries("d", "Delta", NumericDomain, NumericDomainLength, 30, 40, 0.5),
  generateNumericSeries("e", "Echo", NumericDomain, NumericDomainLength, 40, 50),
  generateNumericSeries("f", "Foxtrot", NumericDomain, NumericDomainLength, 50, 60, 0.6),
  generateNumericSeries("g", "Golf", NumericDomain, NumericDomainLength, 60, 70, 0.6),
];

export function generateXYZOrdinalOrdinalSeries(
  id: string,
  label: string,
  domainX: string[],
  domainY: string[],
  min: number,
  max: number,
  gapThreshold?: number,
  color?: string,
  secondaryThreshold?: number
) {
  const matrix = domainX.length * domainY.length;
  const values = generateRandomValues(matrix, min, max, gapThreshold);
  const pri = [];
  const sec = secondaryThreshold ? [] : undefined;

  values.forEach((value, index) => {
    if (!isNaN(value)) {
      const ix = index % domainX.length;
      const iy = Math.floor(index / domainX.length);
      const target = secondaryThreshold && Math.random() < secondaryThreshold ? sec : pri;
      target.push({
        x: domainX[ix],
        y: domainY[iy],
        z: value,
      });
    }
  });

  return {
    id,
    label,
    color,
    pri,
    sec,
  };
}

export const XYZOrdinalDomainX = ["0-4", "4-8", "8-16", "16+"];
export const XYZOrdinalDomainY = ["0-4", "4-8", "8-16", "16+"];

export const SingleXYZOrdinalOrdinalSeriesData = [
  generateXYZOrdinalOrdinalSeries("a", "Alpha", XYZOrdinalDomainX, XYZOrdinalDomainY, 10, 100, 0.5, undefined, 0.4),
];

export const DoubleXYZOrdinalOrdinalSeriesData = [
  generateXYZOrdinalOrdinalSeries("a", "Alpha", XYZOrdinalDomainX, XYZOrdinalDomainY, 10, 100, 0.2),
  generateXYZOrdinalOrdinalSeries("b", "Bravo", XYZOrdinalDomainX, XYZOrdinalDomainY, 50, 150, 0.5),
];

export const MultiXYZOrdinalOrdinalSeriesData = [
  generateXYZOrdinalOrdinalSeries("a", "Alpha", XYZOrdinalDomainX, XYZOrdinalDomainY, 0, 10),
  generateXYZOrdinalOrdinalSeries("b", "Bravo", XYZOrdinalDomainX, XYZOrdinalDomainY, 10, 20, 0.7),
  generateXYZOrdinalOrdinalSeries("c", "Charlie", XYZOrdinalDomainX, XYZOrdinalDomainY, 20, 30),
  generateXYZOrdinalOrdinalSeries("d", "Delta", XYZOrdinalDomainX, XYZOrdinalDomainY, 30, 40, 0.5),
  generateXYZOrdinalOrdinalSeries("e", "Echo", XYZOrdinalDomainX, XYZOrdinalDomainY, 40, 50),
  generateXYZOrdinalOrdinalSeries("f", "Foxtrot", XYZOrdinalDomainX, XYZOrdinalDomainY, 50, 60, 0.6),
  generateXYZOrdinalOrdinalSeries("g", "Golf", XYZOrdinalDomainX, XYZOrdinalDomainY, 60, 70, 0.6),
];

export function generateXYZOrdinalNumericSeries(
  id: string,
  label: string,
  domainX: string[],
  domainY: number[],
  steps: number,
  min: number,
  max: number,
  gapThreshold?: number,
  color?: string
) {
  const matrix = domainX.length * steps;
  const grain = (domainY[1] - domainY[0]) / steps;
  const values = generateRandomValues(matrix, min, max, gapThreshold);
  const pri = [];
  values.forEach((value, index) => {
    if (!isNaN(value)) {
      const ix = index % domainX.length;
      const iy = Math.floor(index / domainX.length);
      pri.push({
        x: domainX[ix],
        y: domainY[0] + grain * iy,
        z: value,
      });
    }
  });

  return {
    id,
    label,
    color,
    pri,
  };
}

export const SingleXYZOrdinalNumericSeriesData = [
  generateXYZOrdinalNumericSeries("a", "Alpha", XYZOrdinalDomainX, NumericDomain, NumericDomainLength, 10, 100, 0.5),
];

export const DoubleXYZOrdinalNumericSeriesData = [
  generateXYZOrdinalNumericSeries("a", "Alpha", XYZOrdinalDomainX, NumericDomain, NumericDomainLength, 10, 100, 0.2),
  generateXYZOrdinalNumericSeries("b", "Bravo", XYZOrdinalDomainX, NumericDomain, NumericDomainLength, 50, 150, 0.5),
];

export const MultiXYZOrdinalNumericSeriesData = [
  generateXYZOrdinalNumericSeries("a", "Alpha", XYZOrdinalDomainX, NumericDomain, 25, 40, 50, 0.6),
  generateXYZOrdinalNumericSeries("b", "Bravo", XYZOrdinalDomainX, NumericDomain, 25, 50, 70, 0.7),
  generateXYZOrdinalNumericSeries("c", "Charlie", XYZOrdinalDomainX, NumericDomain, 25, 60, 70, 0.5),
  generateXYZOrdinalNumericSeries("d", "Delta", XYZOrdinalDomainX, NumericDomain, 25, 65, 75, 0.8),
];

export function generateXYZNumericNumericSeries(
  id: string,
  label: string,
  domain: number[],
  steps: number,
  min: number,
  max: number,
  gapThreshold?: number,
  color?: string
) {
  const matrix = steps * steps;
  const grain = (domain[1] - domain[0]) / steps;
  const values = generateRandomValues(matrix, min, max, gapThreshold);
  const pri = [];
  values.forEach((value, index) => {
    if (!isNaN(value)) {
      const ix = index % steps;
      const iy = Math.floor(index / steps);
      pri.push({
        x: domain[0] + grain * ix,
        y: domain[0] + grain * iy,
        z: value,
      });
    }
  });

  return {
    id,
    label,
    color,
    pri,
  };
}

export const SingleXYZNumericNumericSeriesData = [
  generateXYZNumericNumericSeries("a", "Alpha", NumericDomain, 50, 10, 100, 0.9),
];

export const DoubleXYZNumericNumericSeriesData = [
  generateXYZNumericNumericSeries("a", "Alpha", NumericDomain, 50, 10, 100, 0.9),
  generateXYZNumericNumericSeries("b", "Bravo", NumericDomain, 50, 50, 150, 0.8),
];

export const MultiXYZNumericNumericSeriesData = [
  generateXYZNumericNumericSeries("a", "Alpha", NumericDomain, 25, 40, 50, 0.95),
  generateXYZNumericNumericSeries("b", "Bravo", NumericDomain, 25, 50, 70, 0.85),
  generateXYZNumericNumericSeries("c", "Charlie", NumericDomain, 25, 60, 70, 0.9),
  generateXYZNumericNumericSeries("d", "Delta", NumericDomain, 25, 65, 75, 0.95),
];

export const PieChartData1 = [
  { id: "windows-server", label: "Microsoft Windows Server", value: 39 },
  { id: "linux", label: "Linux", value: 18 },
  { id: "centos-linux", label: "CentOS Linux", value: 8 },
  { id: "windows-workstation", label: "Microsoft Windows Workstation", value: 39 },
  { id: "unix", label: "Unix", value: 18 },
  { id: "centos", label: "CentOS", value: 8 },
  { id: "other", label: "Other", value: 27 },
];

export const PieChartData2 = [
  { id: "rack", label: "Rackable Servers", value: 111139 },
  { id: "blade", label: "Blade Server", value: 1500 },
  { id: "node", label: "Node Servers", value: 118 },
  { id: "other", label: "Other", value: 11 },
];

export const HexBinData1 = generateRandomValues(ALPHABET.length, 0, 100).map((value, index) => ({
  id: ALPHABET[index],
  label: ALPHABET[index],
  value: value,
}));
