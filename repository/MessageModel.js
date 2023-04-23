const con = require('../app/database_sql');

module.exports = class MessageModel {


    addMessage(message){
        return con.promise().query(`INSERT INTO messages (realty_id,user_id_Send,user_id_Receive,contenu,Lu) values ("${message.id_realty}","${message.UserSend}","${message.UserReceive}","${message.contenu}","${message.lu}");`)

    }

    
    updateConversation(message){
        let date = Date.now()
        console.log(date);
        return con.promise().query(`UPDATE conversation SET lastMessage ="${message.contenu}", Lu = 0,created_date =${date} WHERE realty_id = ${message.id_realty} AND user_id_Send = ${message.UserSend} AND user_id_Receive = ${message.UserReceive};`)

    }
    
    updateConversationLu(message){
        console.log(message);
        return con.promise().query(`UPDATE conversation SET Lu = 1 WHERE realty_id = ${message.realty_id} AND user_id_Send = ${message.user_id_Send} AND user_id_Receive = ${message.user_id_Receive};`)

    }

    addConversation(message){
        return con.promise().query(`INSERT INTO conversation (realty_id,user_id_Send,user_id_Receive,lastMessage) values ("${message.id_realty}","${message.UserSend}","${message.UserReceive}","${message.contenu}");`)

    }

    getConversationbyId(message){

        return con.promise().query(`SELECT * FROM conversation WHERE realty_id = ${message.id_realty} AND user_id_Send = ${message.UserSend} AND user_id_Receive = ${message.UserReceive};`).then(([rows]) => {
            return Object.values(rows)
         });    }

    getConversation(){

        return con.promise().query("SELECT * FROM `conversation` ").then(([rows]) => {
            return Object.values(rows)
         });    }

    getmessage(){

        return con.promise().query("SELECT * FROM `messages` ").then(([rows]) => {
            return Object.values(rows)
         });    }

}