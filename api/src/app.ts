import * as express from 'express';
import * as cors from 'cors';
import providersHandler from './providers/';

// Set up the express app
const app = express();

// enable CORS
app.use(cors());

app.get('/providers', providersHandler);

export default app;
