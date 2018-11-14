import { Request, Response } from 'express';
import { map, flow, filter } from 'lodash/fp';
import knex from '../db';
import applyFiltersToQuery from './apply-filters';
import applyPaginationToQuery from './apply-pagination';
import { QueryParameters } from './types';
import parseResultRow from './parse-row';
import { QUERY_PARAM_FEILDS_TO_DB_COLUMNS_MAP } from './consts';

const PER_PAGE_LIMIT = 500;

const handler = async (req: Request, res: Response) => {
  try {
    const query: QueryParameters = req.query;

    if (query.per_page && parseInt(query.per_page, 10) > PER_PAGE_LIMIT) {
      return res
        .status(403)
        .json({ error: `Per page limit is ${PER_PAGE_LIMIT}` });
    }

    const queryBuilder = knex('patients').limit(20);
    const queryWithFilters = applyFiltersToQuery(queryBuilder, query);
    const queryWithFiltersAndPagination = applyPaginationToQuery(
      queryWithFilters,
      query
    );

    // if field[] query params were passed select only required coulmns from the db
    if (Array.isArray(query.field)) {
      queryWithFiltersAndPagination.select(
        getValidColumnNamesFromFieldsQueryParams(query.field)
      );
    }

    queryWithFiltersAndPagination.orderBy('Id');

    // pass in header total number of items - required to implement pagination
    const [{ count }] = await queryWithFilters.clone().count('*');
    res.setHeader('x-total-count', count);

    const result = await queryWithFiltersAndPagination;
    const parsedResults = map(parseResultRow, result);

    res.send(parsedResults);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

/**
 * Helper for matching field[] QP with datbase fields
 */
const getValidColumnNamesFromFieldsQueryParams = flow([
  map(fieldQP => QUERY_PARAM_FEILDS_TO_DB_COLUMNS_MAP[fieldQP]),
  // will remove all fields that were not found in QUERY_PARAM_FEILDS_TO_DB_COLUMNS_MAP
  filter(Boolean)
]);

export default handler;
