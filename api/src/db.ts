import * as createKnex from 'knex';
import * as knexfile from '../knexfile';
import ENV_VARS from '../env-vars';

const knex = createKnex(knexfile[ENV_VARS.ENV] || knexfile.development);

export default knex;
