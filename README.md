# Entrega 2

En esta entrega se realizaron 3 avances en lo que es nuestro proyecto, se implemento una base de datos con sequelize para almacenar los datos de la aplicación, se implemento un  API que permite al backend interactuar con la base de datos y recibir los cambios del frontend. Esta última se implementó con KOA. Finalmente se hicieron avances en el frontend del proyecto, para agregar aspectos faltantes en la entrega pasada y también avanzar con lo que serán las vistas finales del juego (por ahora son borradores estáticos). Se hizo uso de linter para mantener estilo airbnb, se dejaron algunos detalles para el proyecto como el uso de console log.

## Levantamiento BDD

A continuación se indicará cómo levantar la base de datos de nuestro proyecto. En primer lugar el computador debe estar configurado con postgresql, sino, en una terminal del computador se debe correr la siguiente linea: `brew install postgresql`. Una vez teniendo postgres en el equipo, se debe abrir una terminal nueva. Aquí debemos correr la linea `psql postgres` lo cual nos dará acceso a postgres. Luego, ya estando en postgres hay que crear un superusuario de postgres para que sea el usuario en nuestro proyecto, que en este caso se llamará huachipato. Para esto corresmos la siguiente línea en postgres: `CREATE USER huachipato WITH SUPERUSER PASSWORD ‘ABC’;`. Esto habra creado el superusuario huachipato con la contraseña ABC. Una vez teniendo al usuario procedemos a crear las Bases de Datos necesarias para llevar a cabo el proyecto. Para esto corremos las siguientes lineas en postgres: `CREATE DATABASE huachinopoly_development;` , `CREATE DATABASE huachinopoly_test;` , `CREATE DATABASE huachinopoly_production;`. Con esto ya tenemos todo listo para seguir con nuestro proyecto.
Como nuestro proyecto ya tiene los modelos creados y las migraciones listas, solo será necesario abrir una terminal en la carpeta del backend del proyecto "grupo-huachipato-backend" y migrar todo a la base de datos con sequelize corriendo la siguiente línea: `yarn sequelize-cli db:migrate`.

## Implementación API con KOA

Para implementar el API con KOA, se crearon los archivos de ruta para cada una de las entidades (tambien se definieron sus parametros), y estas rutas luego fueron ensambladas en el archivo routes.js, agregando la ruta especifica para cada una de las entidades. En este directorio tambien se provee un archivo `endpoints.md` que contiene una lista de todos los endpoints de la API y lo que hacen.
Tambien se puede ver la documentacion de la API en el siguiente link: <http://localhost:3000/api-docs/> (una vez que se levanta el servidor).

## DEPLOY

link: <https://api-huachinopoly.onrender.com>

