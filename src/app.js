const Koa = require('koa');
const Router = require('koa-router');
const KoaLogger = require('koa-logger');
const { koaBody } = require('koa-body');
const { koaSwagger } = require('koa2-swagger-ui');
const yamljs = require('yamljs');
const cors = require('@koa/cors');
const dotenv = require('dotenv');
const router = require('./routes');
const orm = require('./models');

dotenv.config();
// const { PORT } = process.env;

const app = new Koa();

const docsRouter = new Router();
const spec = yamljs.load('./src/openapi.yml');
docsRouter.get(
  '/api-docs',
  koaSwagger({
    routePrefix: false,
    swaggerOptions: { spec },
  }),
);

app.context.orm = orm;

app
  .use(cors())
  .use(KoaLogger())
  .use(koaBody())
  .use(docsRouter.routes())
  .use(router.routes());

module.exports = app;

// app.use(KoaLogger());
// app.use(koaBody());

// app.use(router.routes());

// function addCorsOptions(app) {
//   const corsOptions = {
//     origin: 'http://localhost:8080',
//     // origin: 'http://localhost:3000',
//     // origin: '*',
//     credentials: true,
//     allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
//     optionSuccessStatus: 200,
//   };
//   app.use(cors(corsOptions));
// }
// addCorsOptions(app);
