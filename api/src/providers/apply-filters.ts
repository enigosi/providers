import { multiply, flow } from 'lodash/fp';
import { QueryBuilder } from 'knex';
import { QueryParameters } from './types';

const parseDollarQueryParam = flow([
  param => parseInt(param, 10),
  multiply(100)
]);

const applyFiltersToQuery = (
  queryBuilder: QueryBuilder,
  queryParameters: QueryParameters
) => {
  const queryWithFilters = queryBuilder.clone();

  // filter by total charges
  if (queryParameters.max_discharges) {
    queryWithFilters.where(
      'Total Discharges',
      '<=',
      parseInt(queryParameters.max_discharges, 10)
    );
  }
  if (queryParameters.min_discharges) {
    queryWithFilters.where(
      'Total Discharges',
      '>=',
      parseInt(queryParameters.min_discharges, 10)
    );
  }

  // filter by avarage covered cahrges
  if (queryParameters.max_average_covered_charges) {
    queryWithFilters.where(
      'Average Covered Charges Cents',
      '<=',
      parseDollarQueryParam(queryParameters.max_average_covered_charges)
    );
  }
  if (queryParameters.min_average_covered_charges) {
    queryWithFilters.where(
      'Average Covered Charges Cents',
      '>=',
      parseDollarQueryParam(queryParameters.min_average_covered_charges)
    );
  }

  // filter by medicare payments cents
  if (queryParameters.max_average_medicare_payments) {
    queryWithFilters.where(
      'Average Medicare Payments Cents',
      '<=',
      parseDollarQueryParam(queryParameters.max_average_medicare_payments)
    );
  }
  if (queryParameters.min_average_medicare_payments) {
    queryWithFilters.where(
      'Average Medicare Payments Cents',
      '>=',
      parseDollarQueryParam(queryParameters.min_average_medicare_payments)
    );
  }

  // filter by state
  if (queryParameters.state) {
    queryWithFilters.where({
      'Provider State': queryParameters.state
    });
  }
  return queryWithFilters;
};

export default applyFiltersToQuery;
