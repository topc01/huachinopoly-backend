const Router = require('koa-router');

const router = new Router();

// crear juego
router.post('game.create', '/', async (ctx) => {
  console.log('Creando juego');
  try {
    const game = await ctx.orm.Game.create();
    const cardsList = [
      { description: 'Ganaste un bono', value: 10000 },
      { description: 'Chocaste', value: -5000 },
      { description: 'Te robaron', value: -10000 },
      { description: 'Te ganaste el kino', value: 100000 },
      { description: 'Te ganaste el loto', value: 50000 },
    ];
    const propertiesList = [
      {
        position: 1, name: 'Santiago', value: 20000, rent: 1000,
      },
      {
        position: 3, name: 'Valparaiso', value: 15000, rent: 700,
      },
      {
        position: 6, name: 'Concepcion', value: 13000, rent: 400,
      },
      {
        position: 8, name: 'Temuco', value: 9000, rent: 100,
      },
      {
        position: 9, name: 'Puerto Montt', value: 11500, rent: 1000,
      },
      {
        position: 11, name: 'Arica', value: 8000, rent: 400,
      },
      {
        position: 13, name: 'Iquique', value: 17000, rent: 900,
      },
      {
        position: 14, name: 'Antofagasta', value: 4000, rent: 300,
      },
      {
        position: 16, name: 'Copiapo', value: 2000, rent: 150,
      },
      {
        position: 18, name: 'La Serena', value: 10000, rent: 600,
      },
      {
        position: 19, name: 'Coquimbo', value: 3000, rent: 200,
      },
      {
        position: 21, name: 'Rancagua', value: 5000, rent: 300,
      },
      {
        position: 23, name: 'Talca', value: 7000, rent: 400,
      },
      {
        position: 24, name: 'Chillan', value: 6000, rent: 300,
      },
      {
        position: 26, name: 'Los Angeles', value: 12000, rent: 700,
      },
      {
        position: 27, name: 'Valdivia', value: 15000, rent: 900,
      },
      {
        position: 29, name: 'Osorno', value: 10000, rent: 600,
      },
      {
        position: 31, name: 'Punta Arenas', value: 20000, rent: 1000,
      },
      {
        position: 32, name: 'Puerto Natales', value: 10000, rent: 600,
      },
      {
        position: 34, name: 'Puerto Williams', value: 20000, rent: 1000,
      },
      {
        position: 37, name: 'Isla de Pascua', value: 20000, rent: 1000,
      },
      {
        position: 39, name: 'Pucón', value: 20000, rent: 1000,
      },
    ];
    const cellsList = [
      { type: 0, position: 0, gameId: game.id },
      { type: 1, position: 1, gameId: game.id },
      { type: 2, position: 2, gameId: game.id },
      { type: 1, position: 3, gameId: game.id },
      { type: 0, position: 4, gameId: game.id },
      { type: 2, position: 5, gameId: game.id },
      { type: 1, position: 6, gameId: game.id },
      { type: 2, position: 7, gameId: game.id },
      { type: 1, position: 8, gameId: game.id },
      { type: 1, position: 9, gameId: game.id },
      { type: 3, position: 10, gameId: game.id },
      { type: 1, position: 11, gameId: game.id },
      { type: 0, position: 12, gameId: game.id },
      { type: 1, position: 13, gameId: game.id },
      { type: 0, position: 14, gameId: game.id },
      { type: 2, position: 15, gameId: game.id },
      { type: 1, position: 16, gameId: game.id },
      { type: 2, position: 17, gameId: game.id },
      { type: 1, position: 18, gameId: game.id },
      { type: 1, position: 19, gameId: game.id },
      { type: 0, position: 20, gameId: game.id },
      { type: 1, position: 21, gameId: game.id },
      { type: 2, position: 22, gameId: game.id },
      { type: 1, position: 23, gameId: game.id },
      { type: 1, position: 24, gameId: game.id },
      { type: 0, position: 25, gameId: game.id },
      { type: 1, position: 26, gameId: game.id },
      { type: 0, position: 27, gameId: game.id },
      { type: 1, position: 28, gameId: game.id },
      { type: 2, position: 29, gameId: game.id },
      { type: 4, position: 30, gameId: game.id },
      { type: 0, position: 31, gameId: game.id },
      { type: 1, position: 32, gameId: game.id },
      { type: 2, position: 33, gameId: game.id },
      { type: 1, position: 34, gameId: game.id },
      { type: 0, position: 35, gameId: game.id },
      { type: 2, position: 36, gameId: game.id },
      { type: 1, position: 37, gameId: game.id },
      { type: 0, position: 38, gameId: game.id },
      { type: 1, position: 39, gameId: game.id },
    ];
    await ctx.orm.Cell.bulkCreate(cellsList, { returning: false, logging: false });
    await ctx.orm.Property.bulkCreate(propertiesList, { returning: false, logging: false });
    await ctx.orm.Card.bulkCreate(cardsList, { returning: false, logging: false });
    ctx.body = game;
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

// usuario se une al juego
router.post('game.join', '/:game_id/join/:user_id', async (ctx) => {
  console.log(`User ${ctx.params.user_id} joins game ${ctx.params.game_id}`);
  try {
    const game = await ctx.orm.Game.findByPk(ctx.params.game_id);
    const gamePlayersId = await game.players;
    const gamePlayers = await ctx.orm.Player.findAll({
      where: {
        id: gamePlayersId,
      },
    });
    // check if user is already in the game
    if (gamePlayers.some((player) => player.userId === parseInt(ctx.params.user_id, 10))) {
      ctx.body = { error: 'User already in game' };
      ctx.status = 208;
      return;
    }
    const createPlayer = await ctx.orm.Player.create({
      gameId: game.id,
      userId: parseInt(ctx.params.user_id, 10),
      name: ctx.request.body.name,
      balance: parseInt(game.initial_balance, 10),
    });
    console.log(`Player ${createPlayer.id} created`);
    game.update({
      players: [...game.players, createPlayer.id],
    });
    console.log(`Player ${createPlayer.id} added to game ${game.id}`);
    ctx.body = { game, player: createPlayer };
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

// get all games
router.get('games.list', '/', async (ctx) => {
  try {
    const games = await ctx.orm.Game.findAll();
    ctx.body = games;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

// get player in turn
router.get('game.turn', '/:game_id/turn', async (ctx) => {
  try {
    const game = await ctx.orm.Game.findByPk(ctx.params.game_id);
    const player = await ctx.orm.Player.findByPk(game.players[game.turn]);
    if (player.jail) {
      game.update({
        turn: (game.turn + 1) % game.players.length,
      });
      player.update({
        jail: false,
      });
      ctx.body = {
        message: 'Player in jail',
        player,
      };
      ctx.status = 204;
    } else {
      console.log(`Player ${player.id} turn`);
      ctx.body = player;
      ctx.status = 200;
    }
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

// start game
router.post('game.start', '/:game_id/start', async (ctx) => {
  try {
    const game = await ctx.orm.Game.findByPk(ctx.params.game_id);
    await game.update({ started: true });
    ctx.body = game;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

// delete game
router.delete('game.delete', '/:game_id', async (ctx) => {
  try {
    const game = await ctx.orm.Game.destroy({
      where: { id: ctx.params.game_id },
    });
    ctx.body = game;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

// get game players
router.get('game.players', '/:game_id/players', async (ctx) => {
  try {
    const game = await ctx.orm.Game.findByPk(ctx.params.game_id);
    const players = await ctx.orm.Player.findAll({
      where: { id: game.players },
    });
    ctx.body = players;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

module.exports = router;
