import * as express from 'express';
import * as cors from 'cors';
import handler from './patients/handler';

// Set up the express app
const app = express();

// enable CORS
app.use(cors());

app.get('/providers', handler);

export default app;
