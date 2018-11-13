import * as express from 'express';
import * as cors from 'cors';
import handler from './handler';

// Set up the express app
const app = express();

// enable CORS
app.use(cors());

app.get('/providers', handler);
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
