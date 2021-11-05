require('dotenv/config');
const pg = require('pg');
const express = require('express');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const authorizationMiddleware = require('./authorization-middleware');

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

app.post('/api/auth/sign-up', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(400, 'Username and password are required fields.');
  }

  argon2.hash(password)
    .then(hash => {
      const sql = `
      insert into
      "users" ("userName", "password")
      values ($1, $2)
      on conflict ("userName")
      do nothing
      returning "userId", "userName", "createdAt"
      `;
      const params = [username, hash];
      db.query(sql, params)
        .then(result => {
          if (result.rows[0]) {
            res.status(201).json(result.rows[0]);
          } else {
            throw new ClientError(409, 'This user name is already taken.');
          }
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(400, 'Username and password are required fields.');
  }

  const sql = `
  select "userId", "password"
  from "users"
  where "userName" = $1
  `;
  const params = [username];

  db.query(sql, params)
    .then(response => {
      if (response.rowCount < 1) {
        throw new ClientError(401, 'invalid login');
      }

      argon2.verify(response.rows[0].password, password)
        .then(matchTest => {
          if (!matchTest) {
            throw new ClientError(401, 'invalid login');
          } else {
            const payload = { userId: response.rows[0].userId, username: username };
            const token = jwt.sign(payload, process.env.TOKEN_SECRET);
            const wholeResponse = { token: token, user: username };
            res.status(200).json(wholeResponse);
          }
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

/* ⛔ Every route after this middleware requires a token! ⛔ */
app.use(authorizationMiddleware);

app.get('/api/lists', (req, res, next) => {
  const { userId } = req.user;
  const sql = `
    select "listId", "listTitle", "isPublic"
      from "lists"
      where "userId" = $1
      order by "listId" desc;
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/lists', (req, res, next) => {
  const { userId } = req.user;
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
      values ($1, $2)
      returning "listTitle", "listId"
  `;
  const params = [listName, userId];

  db.query(sql, params)
    .then(result => {
      const message = result.rows[0];
      res.status(201).json(message);
    })
    .catch(err => next(err));
});

app.get('/api/dates/:listId', (req, res, next) => {
  const { userId } = req.user;
  let { listId } = req.params;
  listId = parseInt(listId);
  if (!Number.isInteger(listId) || listId < 0) {
    throw new ClientError(400, 'The listId must be a positive integer');
  }
  const sql = `
    select "l"."listId", "l"."listTitle", json_agg("d" order by "d"."dateIdea") as "dateIdeas"
      from "lists" as "l"
      left join "dates" as "d" using ("listId")
      where "l"."userId" = $1
      and "l"."listId" = $2
      group by "l"."listId"
  `;

  const params = [userId, listId];
  db.query(sql, params)
    .then(result => {
      if (result.rows.length === 0) {
        throw new ClientError(404, `Could not find a list with listId ${listId}`);
      }
      res.status(200).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.post('/api/dates', (req, res, next) => {
  const { userId } = req.user;
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
       where "userId" = $1
         and "listId" = $2
    )
    insert into "dates" ("listId", "dateIdea", "costAmount")
    select $2, $3, $4
    where exists (select * from "userList")
    returning "listId", "dateId", "dateIdea", "costAmount";
  `;
  const params = [userId, listId, dateIdea, costAmount];

  db.query(sql, params)
    .then(result => {
      if (result.rows.length === 0) {
        throw new ClientError(404, `Could not find a list with listId ${listId}`);
      }
      res.status(201).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.get('/api/random', (req, res, next) => {
  const { userId } = req.user;
  let { listId, costAmount } = req.query;
  listId = parseInt(listId);
  costAmount = parseInt(costAmount);
  if (!Number.isInteger(listId) || !Number.isInteger(costAmount)) {
    throw new ClientError(400, 'Both listId and costAmount need to exist in the request, as positive integers');
  }
  const sql = `
    select "d"."dateId", "d"."listId", "d"."dateIdea", "d"."costAmount", "d"."isActive"
      from "dates" as "d"
      join "lists" as "l" using("listId")
      where "d"."listId" = $1
      and "d"."costAmount" = $2
      and "d"."isActive" = true
      and "l"."userId" = $3
      order by Random()
      limit 1;
  `;
  const params = [listId, costAmount, userId];
  db.query(sql, params)
    .then(result => {
      console.log(result.rows);
      res.status(200).json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/history', (req, res, next) => {
  const { userId } = req.user;
  let { dateId } = req.body;
  dateId = parseInt(dateId);
  if (!Number.isInteger(dateId) || !Number.isInteger(userId)) {
    throw new ClientError(400, 'Both userId and dateId need to be positive integers.');
  }
  const sql = `
    insert into "history" ("dateId", "userId")
      values ($1, $2)
      returning "dateId", "addedAt"
  `;
  const params = [dateId, userId];
  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.get('/api/history', (req, res, next) => {
  const { userId } = req.user;
  const sql = `
    select "d"."dateIdea", "l"."listTitle", "d"."dateId", "h"."addedAt"
      from "dates" as "d"
      join "history" as "h" using("dateId")
      join "lists" as "l" using("listId")
      where "h"."userId" = $1
      order by "addedAt" desc
  `;
  const params = [userId];
  db.query(sql, params)
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
  update "dates" SET "isActive" = NOT "isActive"
  where "dateId" = $1
  `;
  const params = [dateId];
  db.query(sql, params)
    .then(result => {
      res.sendStatus(204);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
