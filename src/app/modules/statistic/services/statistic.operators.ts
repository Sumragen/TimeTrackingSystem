import {
  add,
  both,
  complement,
  converge,
  filter,
  flip,
  fromPairs,
  gte,
  isEmpty,
  length,
  lte,
  map,
  pipe,
  prop,
  propSatisfies,
  reduce,
  tap,
  toPairs
} from 'ramda';

import { ChartData } from '../statistic.page';
import {
  ActivityCategoryStorage,
  ActivityStorage
} from '../../activity/services/activity-storage.types';
import { DateFilter } from '../components/date-filter/date-filter.component';
import { HSLColor } from '../../../shared/models/colors.models';

const mapArrayByProp = (property: string) => map(prop(property));

const convertPairedStorageToObject = map(
  ([label, { color, data }]: [string, ActivityCategoryStorage]) => ({
    label,
    color,
    data
  })
);

const getLabels = mapArrayByProp('label');
const getColors = mapArrayByProp('color');
const getData = mapArrayByProp('data');

const convertChartPropsToObject = (
  labels: string[],
  colors: HSLColor[],
  data: { amount: number; value: number }[]
): ChartData => ({
  labels,
  colors,
  data
});

export const toHSLA = color => `hsla(${color.hue}, ${color.saturation}%, ${color.luminance}%, 1)`;

const getPerformedTimeData = pipe(
  converge((amount: number, value: number) => ({ amount, value }), [
    length,
    pipe(
      mapArrayByProp('performedTime'),
      // @ts-ignore
      reduce(add, 0)
    )
  ])
);

const grE = flip(gte);
const lessE = flip(lte);

const filterInnerData = (date: DateFilter) => (storage: { label; color; data }[]) => {
  return storage.map(category => {
    return {
      ...category,
      data: category.data.filter(
        pipe(
          prop('date'),
          both(grE(date.from), lessE(date.to))
        )
      )
    };
  });
};

const filterEmptyRecords = filter(propSatisfies(complement(isEmpty), 'data'));

export const log = (key: string) => tap(data => console.log(key, data));

export const convertActivityStorageToChartData = ([date, storage]: [DateFilter, ActivityStorage]) =>
  pipe(
    toPairs,
    convertPairedStorageToObject,
    filterInnerData(date),
    filterEmptyRecords,
    // @ts-ignore
    converge(convertChartPropsToObject, [
      getLabels,
      getColors,
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
