const Router = require('koa-router');

const router = new Router();

// eliminar jugador por id
router.delete('player.delete', '/:id', async (ctx) => {
  console.log('Eliminando jugador');
  try {
    const player = await ctx.orm.Player.destroy({
      where: { id: ctx.params.id },
    });
    ctx.body = player;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

// obtener todos los jugadores
router.get('player.get_all', '/', async (ctx) => {
  console.log('Obteniendo todos los jugadores');
  try {
    const players = await ctx.orm.Player.findAll();
    ctx.body = players;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

// mover jugador
router.put('player.move', '/:id/:nuevaPos', async (ctx) => {
  console.log('Moviendo jugador');
  try {
    const pos = parseInt(ctx.params.nuevaPos, 10);
    const id = parseInt(ctx.params.id, 10);
    await ctx.orm.Player.update(
      { position: pos },
      { where: { id } },
    );
    const player = await ctx.orm.Player.findByPk(id);
    // console.log(1);
    // console.log(player);
    const cell = await ctx.orm.Cell.findOne({
      where: {
        position: pos,
        gameId: player.gameId,
      },
    });
    // console.log(2);
    if (cell.type === 1) {
      const property = await ctx.orm.Property.findOne({
        where: { position: pos },
      });
      if (property.playerId === null) {
        ctx.body = {
          message: 'Comprar propiedad',
          property,
        };
        ctx.status = 200;
      } else {
        const owner = await ctx.orm.Player.findOne({
          where: { id: property.playerId },
        });
        ctx.body = {
          message: 'Pagar renta',
          property,
          owner,
        };
        ctx.status = 201;
        player.balance -= property.rent;
        owner.balance += property.rent;
      }
    } else if (cell.type === 2) {
      const cards = await ctx.orm.Card.findAll();
      const randomCard = cards[Math.floor(Math.random() * cards.length)];
      await ctx.orm.Player.update(
        { balance: player.balance + randomCard.value },
        { where: { id } },
      );
      ctx.body = {
        message: 'Carta',
        card: randomCard,
        player,
      };
      ctx.status = 202;
    } else if (cell.type === 3) {
      await ctx.orm.Player.update(
        { jail: true },
        { where: { id } },
      );
      //   player.jail = true;
      ctx.body = {
        message: 'Carcel',
        player,
      };
      ctx.status = 203;
    } else if (cell.type === 4) {
      await ctx.orm.Player.update(
        { position: 10, jail: true },
        { where: { id } },
      );
      //   player.position = 10;
      //   player.jail = true;
      ctx.body = {
        message: 'Visita a la carcel',
        player,
      };
      ctx.status = 204;
    }
    // console.log(3);
    const game = await ctx.orm.Game.findOne({
      where: { id: player.gameId },
    });
    // eslint-disable-next-line prefer-destructuring
    const turn = game.turn;
    // eslint-disable-next-line prefer-destructuring
    const length = game.players.length;
    // console.log(turn);
    // console.log(length);
    await ctx.orm.Game.update(
      { turn: (turn + 1) % length },
      { where: { id: player.gameId } },
    );
    // console.log(4);
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

// jugador compra terreno
router.put('player.buy', '/:id/buy/:propertyId', async (ctx) => {
  console.log('Comprando terreno');
  try {
    const id = parseInt(ctx.params.id, 10);
    const propertyId = parseInt(ctx.params.propertyId, 10);
    const player = await ctx.orm.Player.findByPk(id);
    const property = await ctx.orm.Property.findByPk(propertyId);
    await ctx.orm.Player.update(
      { balance: player.balance - property.value },
      { where: { id } },
    );
    await ctx.orm.Property.update(
      { playerId: id },
      { where: { id: propertyId } },
    );
    const playerOwner = await ctx.orm.Player.findByPk(id);
    const propertyBought = await ctx.orm.Property.findByPk(propertyId);
    ctx.body = {
      message: 'Propiedad comprada',
      playerOwner,
      propertyBought,
    };
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

// get player by id
router.get('player.get_by_id', '/:id', async (ctx) => {
  console.log('Obteniendo jugador por id');
  try {
    const id = parseInt(ctx.params.id, 10);
    const player = await ctx.orm.Player.findByPk(id);
    ctx.body = player;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

// get all players of user
router.get('player.get_by_user', '/user/:id', async (ctx) => {
  console.log('Obteniendo jugadores de un usuario');
  try {
    const id = parseInt(ctx.params.id, 10);
    const players = await ctx.orm.Player.findAll({
      where: { userId: id },
    });
    ctx.body = players;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

// get all properties of a player
router.get('player.get_properties', '/:id/properties', async (ctx) => {
  console.log('Obteniendo propiedades de un jugador');
  try {
    const id = parseInt(ctx.params.id, 10);
    const properties = await ctx.orm.Property.findAll({
      where: { playerId: id },
    });
    ctx.body = properties;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

module.exports = router;
