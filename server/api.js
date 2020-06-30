
const router = require('koa-joi-router');
const database = require('./database');
const api = router();

database.query('SELECT * FROM appuser', (err, res) => {
  console.log(err ? err.stack : res.rows);
  database.end();
})

module.exports = api;
