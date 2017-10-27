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
