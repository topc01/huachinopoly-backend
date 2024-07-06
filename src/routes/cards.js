const Router = require('koa-router');

const router = new Router();

// crear nueva carta
router.post('card.add', '/', async (ctx) => {
  console.log('Creando carta');
  try {
    const card = await ctx.orm.Card.create(ctx.request.body);
    ctx.body = card;
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

// obtener todas las cartas
router.get('card.get_all', '/', async (ctx) => {
  ctx.body = 'Obteniendo todas las cartas';
  try {
    const cards = await ctx.orm.Card.findAll();
    ctx.body = cards;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

module.exports = router;
