
const router = require('koa-joi-router');
const controller = require('./controller');
const util = require('./util');
const Joi = router.Joi;
const api = router();

api.route({
  method: 'post',
  path: '/signup',
  validate: {
    body: {
      username: Joi.string().max(20),
      password: Joi.string().max(30),
      signup: Joi.date()
    },
    type: 'json',
    output: {
      200: {
        body: {
          token: Joi.string(),
        }
      }
    }
  },
  handler: async (ctx) => {
    const usernameTest = await controller.findUserByUsername(ctx.request.body.username);
    if (usernameTest.length > 0) {
      ctx.status = 400;
    } else {
      const user = await controller.addUser(ctx.request.body);
      if (user.length != 0) {
        const token = util.createToken(user[0]);
        console.log('signup works', token);
        ctx.status = 201;
        ctx.body = { token };
      } else {
        ctx.status = 500;
      }
    }
  }
});

api.route({
  method: 'post',
  path: '/login',
  validate: {
    body: {
      username: Joi.string().max(20),
      password: Joi.string().max(30)
    },
    type: 'json',
    output: {
      200: {
        body: {
          token: Joi.string(),
        }
      }
    }
  },
  handler: async (ctx) => {
    const user = await controller.findUser(ctx.request.body);
    if (user.length != 0) {
      const token = util.createToken(user[0]);
      console.log('login works', token);
      ctx.status = 200;
      ctx.body = { token };
    } else {
      ctx.status = 403;
    }
  }
});

module.exports = api;
