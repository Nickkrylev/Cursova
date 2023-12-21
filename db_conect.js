const mysql = require('mysql');

const db_config = {
    host: "localhost",
    user: "root",
    password: "password",
    database: "barbershop"
};

const db_connection = mysql.createConnection(db_config);

module.exports = db_connection;