import * as express from 'express';
import handler from './handler';

// Set up the express app
const app = express();

app.get('/providers', handler);
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
