import { flow, divide, pick, values, placeholder } from 'lodash/fp';
import { ResultHeaders, DbFields } from './types';

interface CentsToDollarStringFunction {
  (dolarCents: number): string;
}
/**
 * Convert dollar strings to cents (124 -> $1.24)
 */
const centsToDollarString: CentsToDollarStringFunction = flow([
  divide(placeholder, 100),
  (dollarValue: number) => dollarValue.toFixed(2),
  (dollarValue: string) => `$${dollarValue}`
]);

/**
 * Parse each row of data selected from the db to format expected to be returned from the endpoit
 */

const parseRow = (
  row: { [K in DbFields]: string | number }
): { [K in ResultHeaders]: string } => {
  // convert dollar values to cent integers
  const rowWithParsedDollars = {
    ...row,
    'Average Covered Charges': centsToDollarString(row[
      'Average Covered Charges Cents'
    ] as number),
    'Average Total Payments': centsToDollarString(row[
      'Average Total Payments Cents'
    ] as number),
    'Average Medicare Payments': centsToDollarString(row[
      'Average Medicare Payments Cents'
    ] as number)
  };

  // pick fields that are going to be stored database (and discard all others)
  const rowWithSelectedColumns = pick(
    values(ResultHeaders),
    rowWithParsedDollars
  );
  return rowWithSelectedColumns;
};

export default parseRow;
