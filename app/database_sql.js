module.exports = require('mysql2').createPool({
    host     : process.env.SQL_HOST || 'localhost',
    user     : process.env.SQL_USER || 'root',
    password : process.env.SQL_PASSWORD || '',
    port     : process.env.SQL_PORT || 3306,
    database : process.env.SQL_DBNAME
});

