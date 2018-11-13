import { from } from 'pg-copy-streams';
import * as pg from 'pg';
import * as fs from 'fs';
import * as csv from 'fast-csv';
import { values } from 'lodash/fp';
import { DB_FIELDS_MAP } from './types';
import parseRow from './parse-row';
import { rejects } from 'assert';

const HEADERS = [
  ,
  ,
  'Provider Name',
  'Provider Street Address',
  'Provider City',
  'Provider State',
  'Provider Zip Code',
  'Hospital Referral Region Description',
  'Total Discharges',
  'Average Covered Charges',
  'Average Total Payments',
  'Average Medicare Payments'
];

const hydrate = (fileName: string) =>
  new Promise((resolve, reject) => {
    const ppgg = new pg.Client({
      connectionString: process.env.DATABASE_URL
    });

    ppgg.connect((err, client) => {
      if (err) return reject(err);

      const csvReadStream = fs.createReadStream(`${__dirname}/${fileName}`);
      const csvWriteStream = csv.createWriteStream({ headers: false });
      const postgresWriteStream = client.query(
        from(
          `COPY patients (${values(DB_FIELDS_MAP)
            .map(field => `"${field}"`)
            .join(', ')}) FROM STDIN CSV`
        )
      );

      csv
        // read csv from file system and convert each row to object
        // const HEADERS defines which coulmns should be skipped and which renamed
        .fromStream(csvReadStream, { headers: HEADERS, renameHeaders: true })
        // parse each row
        .transform(parseRow)
        // convert back to csv format
        .pipe(csvWriteStream)
        // save to postgres
        .pipe(postgresWriteStream)
        .on('end', resolve);
    });
  });
export default hydrate;
