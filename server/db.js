const Pool = require("pg").Pool; //pg is required to work with postgres

const pool = new Pool({
  host: "localhost",
  user: "postgres", //this will most likely be postgres
  password: "nayyara", //this is the password you use to access your PostgreSQL database
  port: 5432, //postgres, by default, runs on this port
  database: "medicine" //change this to any database in your postgreSQL or create a new database called 'medicine'
});

module.exports = pool;