import { add, converge, map, pipe, prop, reduce, toPairs } from 'ramda';
import { ChartData } from './statistic.page';
import { HLColor } from '../../shared/models/colors.models';

const mapArrayByProp = (property: string) => map(prop(property));

export const convertActivityStorageToChartData = pipe(
  toPairs,
  map(([label, { color, data }]: any) => ({
    label,
    color,
    data
  })),
  converge(
    (labels: string[], colors: HLColor[], data: number[]): ChartData => ({
      labels,
      colors,
      data
    }),
    [
      mapArrayByProp('label'),
      mapArrayByProp('color'),
      pipe(
        mapArrayByProp('data'),
        map(
          pipe(
            mapArrayByProp('performedTime'),
            // @ts-ignore
            reduce(add, 0)
          )
        )
      )
    ]
  )
);
