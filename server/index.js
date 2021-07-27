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

app.post('/api/lists', (req, res, next) => {
  const { listName } = req.body;
  const validName = listName.split(' ').join('');
  if (!validName) {
    throw new ClientError(400, 'A valid list name is required');
  }

  const sql = `
    insert into "lists" ("listTitle", "userId")
    values ($1, 1)
    returning "listTitle", "listId"
  `;
  const params = [listName];

  db.query(sql, params)
    .then(result => {
      const message = result.rows[0];
      res.status(201).json(message);
    })
    .catch(err => next(err));

});

app.get('/api/lists', (req, res, next) => {
  const sql = `
    select "listId", "listTitle", "isPublic"
    from "lists"
    where "userId" = 1
    order by "listId" desc;
  `;
  const params = [];
  db.query(sql, params)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
