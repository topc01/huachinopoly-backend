const Router = require('koa-router');

const router = new Router();

// agregar usuario
router.post('user.add', '/', async (ctx) => {
  console.log('Agregando usuario');
  try {
    const user = await ctx.orm.User.create(ctx.request.body);
    ctx.body = user;
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

// obtener todos los usuarios
router.get('user.get_all', '/', async (ctx) => {
  console.log('Obteniendo todos los usuarios');
  try {
    const users = await ctx.orm.User.findAll();
    ctx.body = users;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

module.exports = router;
