require('dotenv').config();

const koa = require('koa');
const router = require('koa-joi-router');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser')

const public = router();

public.get('/', async (ctx) => {
  ctx.body = 'hello joi-router!';
});

const app = new koa();
app
  .use(cors())
  .use(bodyParser());

app.use(require('./api').middleware());
app.use(public.middleware());
app.listen(3000);
