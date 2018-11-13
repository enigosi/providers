import { flow, replace, values, pick, multiply, round } from 'lodash/fp';
import { HEADERS_MAP, DB_FIELDS_MAP } from './types';

interface DollarStringToCentsFunction {
  (dolarString: string): number;
}
/**
 * Convert dollar strings to cents ($1.24 -> 124)
 */
const dollarStringToCents: DollarStringToCentsFunction = flow([
  replace('$', ''),
  multiply(100),
  round
]);

/**
 * Parse each row of data imported from csv to format expected by the db
 */
const parseRow = (
  row: { [K in HEADERS_MAP]: string }
): { [K in DB_FIELDS_MAP]?: string | number } => {
  // convert dollar values to cent integers
  const rowWithParsedNumbers = {
    ...row,
    'Total Discharges': parseInt(row['Total Discharges'], 10),
    'Average Covered Charges Cents': dollarStringToCents(
      row['Average Covered Charges']
    ),
    'Average Total Payments Cents': dollarStringToCents(
      row['Average Total Payments']
    ),
    'Average Medicare Payments Cents': dollarStringToCents(
      row['Average Medicare Payments']
    )
  };
  // pick fields that are going to be stored database (and discard all others)
  const rowWithSelectedColumns = pick(
    values(DB_FIELDS_MAP),
    rowWithParsedNumbers
  );
  return rowWithSelectedColumns;
};

export default parseRow;
