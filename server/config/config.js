<<<<<<< HEAD
const dotenv = require('dotenv');

dotenv.config();

const config = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres'
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: 'postgres',
    logging: false
  },
  production: {
    url: process.env.PRODUCTION_DATABASE_URL,
    dialect: 'postgres',
    dialectOptions: {
      ssl: true
    }
  }
};

module.exports = config;
=======
import env from 'dotenv';

env.config();

const config = {
  production: {
    database: process.env.DB_URL_PRODUCTION,
  },
  test: {
    database: process.env.DB_URL_TEST
  },
  default: {
    database: process.env.DB_URL_DEVELOPMENT,
  }
};

function get(nodeEnv) {
  return config[nodeEnv] || config.default;
}

module.exports = get;
>>>>>>> develop
