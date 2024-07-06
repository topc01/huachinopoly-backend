const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const config = require('./src/config/config'); // Ruta al archivo de configuración

dotenv.config();

const env = process.env.NODE_ENV || 'development'; // Si no se especifica un entorno, se usa development

const configuration = config[env]; // Selecciona la configuración correspondiente al entorno

const sequelize = new Sequelize(configuration); // Crea la instancia de Sequelize

// Funcion para crear el usuario
async function createSuperUser() {
  try {
    await sequelize.query(`
      CREATE USER ${configuration.username} 
      LOGIN
      WITH SUPERUSER PASSWORD '${configuration.password}';
    `);
    console.log('Usuario creado correctamente');
  } catch (error) {
    console.error('Error al crear el usuario:', error);
  } finally {
    sequelize.close();
  }
}

// Funcion para crear la base de datos
async function createDatabase() {
  try {
    await sequelize.query(`CREATE DATABASE IF NOT EXISTS ${configuration.database};`);
    console.log('Base de datos creada correctamente');
  } catch (error) {
    console.error('Error al crear la base de datos:', error);
  } finally {
    sequelize.close();
  }
}

// // Código para crear la base de datos
// sequelize
//   .query(`CREATE DATABASE ${config.development.database};`)
//   .then(() => {
//     console.log('Base de datos creada correctamente');
//   })
//   .catch((error) => {
//     console.error('Error al crear la base de datos:', error);
//   })
//   .finally(() => {
//     sequelize.close(); // Cierra la conexión después de ejecutar la consulta
//   });

// createSuperUser();
// createDatabase();

module.exports = [
  createSuperUser,
  createDatabase,
];
