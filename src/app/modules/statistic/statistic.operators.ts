import { add, converge, map, pipe, prop, reduce, toPairs } from 'ramda';

import { ChartData } from './statistic.page';

const mapArrayByProp = (property: string) => map(prop(property));

const convertPairedStorageToObject = map(([label, { color, data }]: any) => ({
  label,
  color,
  data
}));

const getLabels = mapArrayByProp('label');
const getColors = mapArrayByProp('color');
const getData = mapArrayByProp('data');

const convertChartPropsToObject = (
  labels: string[],
  colors: string[],
  data: number[]
): ChartData => ({
  labels,
  colors: [
    {
      backgroundColor: colors
    }
  ],
  data
});

const toHSLA = color => `hsla(${color.hue}, 100%, ${color.luminance}%, 1)`;

const getPerformedTimeData = pipe(
  mapArrayByProp('performedTime'),
  // @ts-ignore
  reduce(add, 0)
);

export const convertActivityStorageToChartData = pipe(
  toPairs,
  convertPairedStorageToObject,
  converge(convertChartPropsToObject, [
    getLabels,
    pipe(
      getColors,
      map(toHSLA)
    ),
    pipe(
      getData,
      map(getPerformedTimeData)
    )
  ])
);
