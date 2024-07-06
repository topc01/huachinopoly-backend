const Router = require('koa-router');
const dotenv = require('dotenv');
const jwtMiddleware = require('koa-jwt');
const authRoutes = require('./routes/authentication');
// const user = require('./routes/users');
const game = require('./routes/game');
const player = require('./routes/players');
// const cell = require('./routes/cells');
// const property = require('./routes/property');
// const card = require('./routes/cards');

dotenv.config();

const router = new Router();

const auth = false;

router.use(authRoutes.routes());

if (auth) {
  router.use(jwtMiddleware({ secret: process.env.JWT_SECRET }));
}

router
  .use('/game', game.routes())
  .use('/player', player.routes());

module.exports = router;
