import { QueryBuilder } from 'knex';
import { QueryParameters } from './types';

const DEFAULT_PAGINATION_PAGE = 1;
const DEFAULT_PAGINATION_PER_PAGE = 20;

const applyPaginationToQuery = (
  queryBuilder: QueryBuilder,
  queryParameters: QueryParameters
) => {
  const queryWithPagination = queryBuilder.clone();
  const perPage = queryParameters.per_page
    ? parseInt(queryParameters.per_page, 10)
    : DEFAULT_PAGINATION_PER_PAGE;
  const page = queryParameters.page
    ? parseInt(queryParameters.page, 10)
    : DEFAULT_PAGINATION_PAGE;

  const offset = perPage * (page - 1);

  queryWithPagination.limit(perPage).offset(offset);

  return queryWithPagination;
};

export default applyPaginationToQuery;
