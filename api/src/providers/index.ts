import { Request, Response } from 'express';
import { map } from 'lodash/fp';
import knex from '../db';
import applyFiltersToQuery from './apply-filters';
import applyPaginationToQuery from './apply-pagination';
import { QueryParameters } from './types';
import parseResultRow from './parse-row';

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

export default handler;
