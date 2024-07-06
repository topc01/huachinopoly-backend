const Router = require('koa-router');

const router = new Router();

// crear casilla
router.post('casilla.add', '/', async (ctx) => {
  console.log('Creando casilla');
  try {
    const cell = await ctx.orm.Cell.create(ctx.request.body);
    ctx.body = cell;
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

// ver casillas
router.get('casilla.get_all', '/', async (ctx) => {
  console.log('Obteniendo todas las casillas');
  try {
    const cells = await ctx.orm.Cell.findAll();
    ctx.body = cells;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

// obtener propiedad de casilla
router.get('casilla.get_property', '/:id/property', async (ctx) => {
  console.log(`Obteniendo propiedad de casilla ${ctx.params.id}`);
  try {
    const cell = await ctx.orm.Cell.findByPk(ctx.params.id);
    const property = await ctx.orm.Property.findOne({
      where: { cellId: cell.id },
    });
    // console.log(property);
    // if (Object.is(property, null)) {
    //     ctx.body = 'No hay propiedad en esta casilla';
    //     ctx.status = 404;
    // }
    ctx.body = property;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

module.exports = router;
