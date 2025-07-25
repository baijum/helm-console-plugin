import * as _ from 'lodash';
import { isFunction } from 'lodash';

import { PrometheusResponse } from '@openshift-console/dynamic-plugin-sdk';
import { chart_color_orange_300 as requestedColor } from '@patternfly/react-tokens/dist/js/chart_color_orange_300';
import { LAST_LANGUAGE_LOCAL_STORAGE_KEY } from '@utils/components/Area/utils/constants';
import {
  CallbackArgs,
  DataPoint,
  GetRangeStats,
  ValueOrAccessor,
  XMutator,
  YMutator,
} from '@utils/components/Area/utils/types';
import { t } from '@utils/hooks/useNetworkingTranslation';

import { getType } from '../../../utils/units';

export const defaultXMutator: XMutator = (x) => new Date(x * 1000);
export const defaultYMutator: YMutator = (y) => parseFloat(y);

export const getRangeVectorStats: GetRangeStats = (
  response,
  description,
  symbol,
  xMutator,
  yMutator,
) => {
  const results = response?.data?.result;
  return results?.map((r, index) => {
    return r?.values?.map(([x, y]) => {
      return {
        description: _.isFunction(description) ? description(r, index) : description,
        symbol,
        x: xMutator?.(x) ?? defaultXMutator(x),
        y: yMutator?.(y) ?? defaultYMutator(y),
      } as DataPoint<Date>;
    });
  });
};

export const mapLimitsRequests = (
  utilization: PrometheusResponse,
  limit: PrometheusResponse,
  requested: PrometheusResponse,
  xMutator?: XMutator,
): { chartStyle: object[]; data: DataPoint[][] } => {
  const utilizationData = getRangeVectorStats(utilization, 'usage', null, xMutator);
  const data = utilizationData ? [...utilizationData] : [];
  const chartStyle = [null];
  if (limit) {
    const limitData = getRangeVectorStats(limit, t('total limit'), { type: 'dash' }, xMutator);
    data.push(...limitData);
    if (limitData.length) {
      chartStyle.push({
        data: { fillOpacity: 0, strokeDasharray: '3,3' },
      });
    }
  }
  if (requested) {
    const reqData = getRangeVectorStats(
      requested,
      t('total requested'),
      {
        fill: requestedColor.value,
        type: 'dash',
      },
      xMutator,
    );
    data.push(...reqData);
    if (reqData.length) {
      chartStyle.push({
        data: { fillOpacity: 0, stroke: requestedColor.value, strokeDasharray: '3,3' },
      });
    }
  }

  return { chartStyle, data };
};

export const getLastLanguage = (): string =>
  localStorage.getItem(LAST_LANGUAGE_LOCAL_STORAGE_KEY) ?? navigator.language;

const lang = getLastLanguage();

// https://tc39.es/ecma402/#datetimeformat-objects
export const timeFormatter = new Intl.DateTimeFormat(lang, {
  hour: 'numeric',
  minute: 'numeric',
});

const log = (x: number, y: number) => {
  return Math.log(y) / Math.log(x);
};

// Get the larget unit seen in the dataframe within the supported range
const bestUnit = (dataPoints: DataPoint[][], type) => {
  const flattenDataPoints = dataPoints.reduce((acc, arr) => acc.concat(arr), []);

  const bestLevel = flattenDataPoints.reduce((maxUnit, point) => {
    const index = Math.floor(log(_.get(type, 'divisor', 1024), point.y));
    const unitIndex = index >= type.units.length ? type.units.length - 1 : index;
    return maxUnit < unitIndex ? unitIndex : maxUnit;
  }, -1);
  return _.get(type, ['units', bestLevel]);
};

// Array based processor
export const processFrame = (dataPoints: DataPoint[][], typeName: string): ProcessFrameResult => {
  const type = getType(typeName);
  let unit = null;
  if (dataPoints && dataPoints[0]) {
    // Get the appropriate unit and convert the dataset to that level
    unit = bestUnit(dataPoints, type);
    const frameLevel = type.units.indexOf(unit);
    dataPoints.forEach((arr) =>
      arr.forEach((point) => {
        point.y /= type.divisor ** frameLevel;
      }),
    );
  }
  return { processedData: dataPoints, unit };
};

export type ProcessFrameResult = {
  processedData: DataPoint[][];
  unit: string;
};

export function evaluateProp<TValue>(
  prop: ValueOrAccessor<TValue, CallbackArgs>,
  props: CallbackArgs,
): TValue {
  return isFunction(prop) ? prop(props) : prop;
}

export const getLegendData = (processedData: DataPoint[][]) =>
  processedData.map((d) => ({
    childName: d[0].description,
    name: d[0].description,
    symbol: d[0].symbol,
  }));
