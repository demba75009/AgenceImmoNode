const con = require('../app/database_sql');

module.exports = class UserModel {


    addUser(user){

        con.promise().query(`INSERT INTO users (civility, lastname, email, firstname, phone, password) values ("${user.civility}", "${user.lastname}", "${user.email}", "${user.firstname}", "${user.phone}", "${user.password}");`).then(([rows]) => {


        });
    }

    UserList(limit,offset){

        return con.promise().query(`SELECT * FROM users LIMIT ${limit} OFFSET ${offset} `).then(([rows]) => {
            return Object.values(rows)
         });
    }


    UserCount (){

        return con.promise().query("SELECT COUNT(*) AS users FROM users").then((total) => {
            return total[0]
         });
    }

    getUserByEmail(email) {

        return con.promise().query(`SELECT * FROM users WHERE email="${email}"`).then(([rows]) => {
            return Object.values(rows)
         }).catch(err=> {return err});
   
    } 


}