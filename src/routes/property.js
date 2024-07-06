const Router = require('koa-router');

const router = new Router();

// crear propiedad
router.post('propiedad.add', '/', async (ctx) => {
  console.log('Agregando propiedad');
  try {
    const property = await ctx.orm.Property.create(ctx.request.body);
    ctx.body = property;
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

// ver propiedades
router.get('propiedad.get_all', '/', async (ctx) => {
  console.log('Obteniendo todas las propiedades');
  try {
    const properties = await ctx.orm.Property.findAll();
    ctx.body = properties;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

module.exports = router;
