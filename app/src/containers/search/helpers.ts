import { pickBy, flow, keys, filter, invert } from 'lodash/fp';
import { COLUMNS, FIELD_QUERY_PARAM_LABELS } from './consts';
import { IFilters } from './types';
/**
 * From array of strings return hash map
 * where each key is value from array and value is passed as a second parameter
 */
export const stringsToHashMap = (strings: string[], value: any) =>
  strings.reduce((prev, curr) => ({ ...prev, [curr]: value }), {});

/**
 * From hash map with boolean values
 * return array of string keys of truthy values
 */
export const getKeysWithTruthyValues = (hashmap: {
  [key: string]: boolean;
}): string[] => flow([pickBy(Boolean), keys])(hashmap);

/**
 * Filter Ant Design columns to match selection
 */
export const getFilteredColumns = (
  feildSelection: IFilters['fieldsSelection']
) =>
  filter((column: { dataIndex: string }) => {
    // get key
    const columnQueryParam = invertedFieldQueryParams[column.dataIndex];
    // return fieldSelectionValie
    return feildSelection[columnQueryParam];
  })(COLUMNS);
const invertedFieldQueryParams = invert(FIELD_QUERY_PARAM_LABELS);
