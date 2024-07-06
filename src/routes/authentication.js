const Router = require('koa-router');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();

const router = new Router();
const saltRounds = 10;

router.post('authentication.signup', '/signup', async (ctx) => {
  const authInfo = ctx.request.body;
  let user = await ctx.orm.User.findOne({ where: { mail: authInfo.mail } });
  if (user) {
    ctx.body = `User with mail ${authInfo.mail} already exists`;
    ctx.status = 400;
    return;
  }
  try {
    console.log(0);
    user = await ctx.orm.User.create({
      username: authInfo.username,
      mail: authInfo.mail,
      password: bcrypt.hashSync(authInfo.password, saltRounds),
    });
    console.log('Usuario creado');
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
    return;
  }
  ctx.body = {
    username: user.username,
    mail: user.mail,
  };
  ctx.status = 201;
});

router.post('authentication.login', '/login', async (ctx) => {
  let user;
  const authInfo = ctx.request.body;
  console.log(ctx.request.body);
  try {
    user = await ctx.orm.User.findOne({ where: { mail: authInfo.mail } });
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
    return;
  }
  if (!user) {
    ctx.body = `User with mail ${authInfo.mail} does not exist`;
    ctx.status = 400;
    return;
  }
  if (!bcrypt.compareSync(authInfo.password, user.password)) {
    ctx.body = 'Incorrect password';
    ctx.status = 400;
    return;
  }
  // ctx.body = {
  //   username: user.username,
  //   mail: user.mail,
  // };
  // ctx.status = 200;

  const expirationSeconds = 60 * 60 * 24;
  const token = jwt.sign(
    { scope: ['user'] },
    process.env.JWT_SECRET,
    { subject: user.id.toString() },
    { expiresIn: expirationSeconds },
  );
  ctx.body = {
    user,
    access_token: token,
    token_type: 'Bearer',
    expires_in: expirationSeconds,
  };
  ctx.status = 200;
});

module.exports = router;
