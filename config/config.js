'use strict';

require( "dotenv" ).config();
module.exports = {
  development: {
    username: "root",
    password: process.env.PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.HOST,
    port:3306,
    dialect: "mysql",
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port:3306,
    dialect: "mysql",
  },
};
