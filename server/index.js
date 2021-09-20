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
  if (!listName) {
    throw new ClientError(400, 'A valid listName is required');
  }
  const validName = listName.split(' ').join('');
  if (!validName) {
    throw new ClientError(400, 'A valid listName is required');
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

app.post('/api/dates', (req, res, next) => {
  let { listId, dateIdea, costAmount } = req.body;
  listId = parseInt(req.body.listId);
  costAmount = parseInt(costAmount);
  if (!Number.isInteger(listId) || listId < 0) {
    throw new ClientError(400, 'The listId must be a positive integer');
  }
  if (!dateIdea || !Number.isInteger(costAmount)) {
    throw new ClientError(400, 'The dateIdea and costAmount fields are required');
  }

  const sql = `
    with "userList" as (
      select "listId"
        from "lists"
       where "userId" = 1
         and "listId" = $1
    )
    insert into "dates" ("listId", "dateIdea", "costAmount")
    select $1, $2, $3
     where exists (select * from "userList")
    returning "listId", "dateId", "dateIdea", "costAmount";
  `;
  const params = [listId, dateIdea, costAmount];

  db.query(sql, params)
    .then(result => {
      if (result.rows.length === 0) {
        throw new ClientError(404, `Could not find a list with listId ${listId}`);
      }
      res.status(201).json(result.rows[0]);
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

app.get('/api/dates/:listId', (req, res, next) => {
  let { listId } = req.params;
  listId = parseInt(listId);
  if (!Number.isInteger(listId) || listId < 0) {
    throw new ClientError(400, 'The listId must be a positive integer');
  }
  const sql = `
  select "l"."listId", "l"."listTitle", json_agg("d" order by "d"."dateIdea") as "dateIdeas"
    from "lists" as "l"
    left join "dates" as "d" using ("listId")
    where "l"."userId" = 1
      and "l"."listId" = $1
    group by "l"."listId"
  `;

  const params = [listId];
  db.query(sql, params)
    .then(result => {
      if (result.rows.length === 0) {
        throw new ClientError(404, `Could not find a list with listId ${listId}`);
      }
      res.status(200).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.get('/api/random', (req, res, next) => {
  let { listId, costAmount } = req.query;
  listId = parseInt(listId);
  costAmount = parseInt(costAmount);
  if (!Number.isInteger(listId) || !Number.isInteger(costAmount)) {
    throw new ClientError(400, 'Both listId and costAmount need to exist in the request, as positive integers');
  }
  const sql = `
    select * from "dates"
    where "listId" = $1
    and "costAmount" = $2
    and "isActive" = true
    order by Random()
    limit 1;
  `;
  const params = [listId, costAmount];
  db.query(sql, params)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/history', (req, res, next) => {
  let { userId, dateId } = req.body;
  userId = parseInt(userId);
  dateId = parseInt(dateId);
  if (!Number.isInteger(dateId) || !Number.isInteger(userId)) {
    throw new ClientError(400, 'Both userId and dateId need to be positive integers.');
  }
  const sql = `
    insert into "history" ("dateId", "userId")
    values ($1, 1)
    returning "dateId", "addedAt"
  `;
  const params = [dateId];
  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.get('/api/history', (req, res, next) => {
  const sql = `
    select "dates"."dateIdea", "lists"."listTitle", "dates"."dateId", "history"."addedAt"
    from "dates"
    join "history" using("dateId")
    join "lists" using("listId")
    where "history"."userId" = 1
    order by "addedAt" desc
  `;
  db.query(sql)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => next(err));
});

app.patch('/api/dateActive/:dateId', (req, res, next) => {
  let { dateId } = req.params;
  dateId = parseInt(dateId);
  if (!Number.isInteger(dateId)) {
    throw new ClientError(400, 'The userId must be a positive integer.');
  }
  const sql = `
  UPDATE "dates" SET "isActive" = NOT "isActive"
  WHERE "dateId" = $1
  `;
  const params = [dateId];
  db.query(sql, params)
    .then(result => {
      res.status(204).json(result);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
