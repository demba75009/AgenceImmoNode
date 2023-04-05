require('dotenv').config()
const con = require('./app/database_sql.js');
con.promise().query("SELECT 'connexion SQL OK'").then(([rows]) => {
    console.log(Object.values(rows[0]));
    process.exit();
});

