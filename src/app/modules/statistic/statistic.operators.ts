import { add, converge, map, pipe, prop, reduce, toPairs } from 'ramda';
import { ChartData } from './statistic.page';
import { HLColor } from '../../shared/models/colors.models';

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
  colors: HLColor[],
  data: number[]
): ChartData => ({
  labels,
  colors,
  data
});

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
    getColors,
    pipe(
      getData,
      map(getPerformedTimeData)
    )
  ])
);
