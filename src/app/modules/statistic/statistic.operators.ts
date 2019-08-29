import {
  add,
  complement,
  converge,
  filter,
  fromPairs,
  isEmpty,
  lte,
  map,
  pipe,
  prop,
  propSatisfies,
  reduce,
  tap,
  toPairs
} from 'ramda';

import { ChartData } from './statistic.page';
import { ActivityStorage } from '../activity/services/activity-storage.types';

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

const filterInnerData = (startDate: number) => (storage: { label; color; data }[]) => {
  return storage.map(category => {
    return {
      ...category,
      data: category.data.filter(
        pipe(
          prop('date'),
          lte(startDate)
        )
      )
    };
  });
};

const filterEmptyRecords = filter(propSatisfies(complement(isEmpty), 'data'));

export const log = (key: string) => tap(data => console.log(key, data));

export const convertActivityStorageToChartData = ([startDate, storage]: [
  number,
  ActivityStorage
]) =>
  pipe(
    toPairs,
    convertPairedStorageToObject,
    filterInnerData(startDate),
    filterEmptyRecords,
    // @ts-ignore
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
  )(storage);

export const convertFilterDates = pipe(
  toPairs,
  map(([key, date]: [string, string]) => [key, new Date(date).getTime()]),
  // @ts-ignore
  fromPairs
);
