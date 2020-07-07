
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
      ctx.status = 200;
      ctx.body = { token };
    } else {
      ctx.status = 403;
    }
  }
});

api.route({
  method: 'post',
  path: '/gettimerhistoryitems',
  validate: {
    body: {
      username: Joi.string().max(20),
    },
    type: 'json',
    output: {
      200: {
        body: {
          historyItems: Joi.array(),
        }
      }
    }
  },
  handler: async (ctx) => {
    const historyItems = await controller.findTimerHistoryItems(ctx.request.body.username);

    ctx.status = 200;
    ctx.body = { historyItems };
  }
});

api.route({
  method: 'post',
  path: '/getprojects',
  validate: {
    body: {
      username: Joi.string().max(20),
    },
    type: 'json',
    output: {
      200: {
        body: {
          projects: Joi.array(),
        }
      }
    }
  },
  handler: async (ctx) => {
    const projects = await controller.findProjects(ctx.request.body.username);

    ctx.status = 200;
    ctx.body = { projects };
  }
});

api.route({
  method: 'post',
  path: '/addtimerhistoryitem',
  validate: {
    body: {
      username: Joi.string().max(20),
      description: Joi.string().max(20),
      project: Joi.string().max(20),
      start: Joi.number(),
      end: Joi.number(),
    },
    type: 'json',
    output: {
      201: {
        body: {
          timerHistoryItem: Joi.array()
        }
      }
    }
  },
  handler: async (ctx) => {
    const timerHistoryItem = await controller.addTimerHistoryItem(ctx.request.body);
    if (timerHistoryItem.length != 0) {
      ctx.status = 201;
      ctx.body = { timerHistoryItem };
    } else {
      ctx.status = 500;
    }
  }
});

api.route({
  method: 'post',
  path: '/addproject',
  validate: {
    body: {
      username: Joi.string().max(20),
      name: Joi.string().max(20),
      color: Joi.string().max(20),
    },
    type: 'json',
    output: {
      201: {
        body: {
          project: Joi.array()
        }
      }
    }
  },
  handler: async (ctx) => {
    const projectTest = await controller.findProjectByName(ctx.request.body.name);
    if (projectTest.length > 0) {
      ctx.status = 400;
    } else {
      const project = await controller.addProject(ctx.request.body);
      if (project.length != 0) {
        ctx.status = 201;
        ctx.body = { project };
      } else {
        ctx.status = 500;
      }
    }
  }
});

api.route({
  method: 'post',
  path: '/deleteproject',
  validate: {
    body: {
      username: Joi.string().max(20),
      name: Joi.string().max(20),
    },
    type: 'json',
  },
  handler: async (ctx) => {
    const project = await controller.deleteProject(ctx.request.body);
    ctx.status = 200;
    ctx.body = 'DELETED';
  }
});

api.route({
  method: 'post',
  path: '/deletetimerhistoryitem',
  validate: {
    body: {
      username: Joi.string().max(20),
      start: Joi.number(),
    },
    type: 'json',
  },
  handler: async (ctx) => {
    const project = await controller.deleteHistoryItem(ctx.request.body);
    ctx.status = 200;
    ctx.body = 'DELETED';
  }
});

module.exports = api;
