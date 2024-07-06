# ENDPOINTS

Se enumeran todos los endpoints de la API y lo que hacen

## User

- post("/user") &rarr; Crea un usuario
- put("/user/:id") &rarr; Actualiza el usuario id
- get("/user") &rarr; Devuelve todos los usuarios
- get("/user/:id") &rarr; Devuelve el usuario id
- delete("/user/:id") &rarr; Elimina el usuario id

## Game

- post("/game") &rarr; Crea un juego
- put("/game/:game_id/player/:player_id") &rarr; Agrega un jugador player_id a un juego game_id
- put("/game/:id") &rarr; Modifica un juego id
- get("/game") &rarr; Devuelve todos los juegos
- get("/game/:id") &rarr; Devuelve el juego id
- get("/game/:id/player") &rarr; Devuelve los jugadores del juego id
- get("/game/:id/cell") &rarr; Devuelve las casillas del juego id
- get("/game/:id/cell/:pos") &rarr; Devuelve la casilla del juego id en la posicion pos
- delete("/game/:id") &rarr; Elimina el juego id

## Player

- post("/player/:user_id") &rarr; Crea un jugador asociado al usuario user_id
- put("/player/:id") &rarr; Modifica al jugador id
- get("/player") &rarr; Devuelve todos los jugadores
- get("/player/:id") &rarr; Devuelve el jugador id
- delete("/player/:id") &rarr; Elimina el jugador id

## Property

- post("/property") &rarr; Crea una propiedad
- put("/property/:id") &rarr; Modifica una propiedad id
- get("/property") &rarr; Devuelve todas las propiedades
- get("/property/:id") &rarr; Devuelve una propiedad id
- delete("/property/:id") &rarr; Elimina una propiedad id

## Cell

- post("/cell") &rarr; Crea una casilla
- put("/cell/:id") &rarr; Modifica una casilla id
- get("/cell") &rarr; Devuelve todas las casillas
- get("/cell/:id/property") &rarr; Devuelve la propiedad de una casilla id (si tiene)
- get("/cell/:id") &rarr; Devuelve una casilla id
- delete("/cell/:id") &rarr; Elimina una casilla id

## Card

- get("/card") &rarr; Devuelve todas las cartas
- get("/card/:id") &rarr; Devuelve una carta id
- delete("/card/:id") &rarr; Elimina una carta id
