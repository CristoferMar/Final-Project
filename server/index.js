require('dotenv/config');
const pg = require('pg');
const express = require('express');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

const jsonMiddleware = express.json();
app.use(jsonMiddleware);

app.use(staticMiddleware);

app.post('/api/lists/new-list', (req, res, next) => {
  console.log('req.body:', req.body);

  const { listName, userId } = req.body;
  const validName = listName.split(' ').join('');
  if (!validName) {
    throw new ClientError(400, 'A valid list name is required');
  }
  if (!userId) {
    console.error('no user in POST for new list');
    throw new ClientError(500, 'an unexpected error occurred');
  }

});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
