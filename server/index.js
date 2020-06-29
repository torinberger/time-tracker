require('dotenv').config();

const koa = require('koa');
const router = require('koa-joi-router');
const Joi = router.Joi;

const public = router();

public.get('/', async (ctx) => {
  ctx.body = 'hello joi-router!';
});

const app = new koa();
app.use(public.middleware());
app.listen(3000);
