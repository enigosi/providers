import { Request, Response } from 'express';
import knex from '../db';
import applyFiltersToQuery from './apply-filters';
import applyPaginationToQuery from './apply-pagination';
import { QueryParameters } from './types';

const PER_PAGE_LIMIT = 500;

const handler = async (req: Request, res: Response) => {
  const query: QueryParameters = req.query;

  if (query.per_page && parseInt(query.per_page, 10) > PER_PAGE_LIMIT) {
    throw new Error(`Per page limit is ${PER_PAGE_LIMIT}`);
  }

  const queryBuilder = knex('patients').limit(20);
  const queryWithFilters = applyFiltersToQuery(queryBuilder, query);
  const queryWithFiltersAndPagination = applyPaginationToQuery(
    queryWithFilters,
    query
  );
  queryWithFiltersAndPagination.orderBy('Id');

  // pass in header total number of items - required to implement pagination
  const [{ count }] = await queryWithFilters.clone().count('*');
  res.setHeader('x-total-count', count);

  const result = await queryWithFiltersAndPagination;

  res.send(result);
};

export default handler;
