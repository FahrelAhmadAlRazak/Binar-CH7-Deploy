require('dotenv').config();

const {
  DB_USERNAME = "postgres",
  DB_PASSWORD = "1Eb2adB6Dbd*Gf55Dd*CAa3cCCg*3561",
  DB_HOST = "viaduct.proxy.rlwy.net",
  DB_NAME = "railway"
} = process.env;

module.exports = {
  "development": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_NAME,
    "host": DB_HOST,
    "port": 33737,
    "dialect": "postgres"
  },
  "test": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_NAME,
    "host": DB_HOST,
    "dialect": "postgres"
  },
  "production": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_NAME,
    "host": DB_HOST,
    "port": 33737,
    "dialect": "postgres"
  }
};
