const con = require('../app/database_sql');

module.exports = class MessageModel {


    addMessage(message){
        return con.promise().query(`INSERT INTO messages (realty_id,user_id_Send,user_id_Receive,contenu,Lu) values ("${message.id_realty}","${message.UserSend}","${message.UserReceive}","${message.contenu}","${message.lu}");`)

    }


    getmessage(){

        return con.promise().query("SELECT * FROM `messages` ").then(([rows]) => {
            return Object.values(rows)
         });    }

}