import { Request, Response } from 'express';
import knex from './db';

const handler = async (req: Request, res: Response) => {
  const { query } = req;
  const patients = knex('patients').limit(20);
  if (query.max_discharges) {
    patients.where(
      'Total Discharges',
      '<=',
      parseInt(query.max_discharges, 10)
    );
  }
  // knex('patients')
  console.log(req.query, patients.toString());
  const result = await patients;
  console.log(result);

  res.send(result);
};

export default handler;
