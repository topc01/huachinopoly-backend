const dotenv = require('dotenv');
const app = require('./app');
const db = require('./models');
// const [createSuperUser, createDatabase] = require('../create');

dotenv.config();

// createSuperUser();
// createDatabase();

const { PORT } = process.env;

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
    app.listen(PORT, (err) => {
      if (err) {
        return console.error('Failed', err);
      }
      console.log(`Listening on port ${PORT}`);
      return true;
    });
  })
  .catch((err) => console.error('Unable to connect to the database:', err));
