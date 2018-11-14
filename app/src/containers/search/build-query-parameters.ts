import { toPairs, isEmpty, flow, join, map } from 'lodash/fp';
import { IFilters } from './types';
import {
  DISCHARGES_MAX,
  AVARAGE_COVERED_CHARGES_MAX,
  AVARAGE_MEDICARE_CHARGES_MAX,
  RESULTS_PER_PAGE
} from './consts';

type IQueryParams =
  | 'max_average_covered_charges'
  | 'min_average_covered_charges'
  | 'max_discharges'
  | 'min_discharges'
  | 'max_average_medicare_payments'
  | 'min_average_medicare_payments'
  | 'state';

/**
 * Based on filters state build string with query parameters
 * don't include filters that have default values
 */
const buildQueryParametersFromFilters = (filters: IFilters) => {
  const parameters: { [K in IQueryParams]?: string | number } = {};

  if (filters.avarageCoveredChargesFilter[0] !== 1) {
    parameters['min_average_covered_charges'] =
      filters.avarageCoveredChargesFilter[0];
  }
  if (filters.avarageCoveredChargesFilter[1] !== AVARAGE_COVERED_CHARGES_MAX) {
    parameters['max_average_covered_charges'] =
      filters.avarageCoveredChargesFilter[1];
  }
  if (filters.avarageMedicareChargesFilter[0] !== 1) {
    parameters['min_average_medicare_payments'] =
      filters.avarageMedicareChargesFilter[0];
  }
  if (filters.avarageCoveredChargesFilter[1] !== AVARAGE_MEDICARE_CHARGES_MAX) {
    parameters['max_average_medicare_payments'] =
      filters.avarageCoveredChargesFilter[1];
  }
  if (filters.dischargesFilter[0] !== 1) {
    parameters['min_discharges'] = filters.dischargesFilter[0];
  }
  if (filters.dischargesFilter[1] !== DISCHARGES_MAX) {
    parameters['max_discharges'] = filters.dischargesFilter[1];
  }
  if (filters.stateFilter) {
    parameters['state'] = filters.stateFilter;
  }

  // there is no UI for modifying this param
  parameters['per_page'] = RESULTS_PER_PAGE;
  parameters['page'] = filters.currentPage;

  if (isEmpty(parameters)) return '';

  const queryParamsPairs = toPairs(parameters);
  // join params with "=" and "&" (name=john&age=22)
  const joinedParams = flow([map(join('=')), join('&')])(queryParamsPairs);
  return `?${joinedParams}`;
};

export default buildQueryParametersFromFilters;
