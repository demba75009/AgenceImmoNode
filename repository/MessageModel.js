const con = require('../app/database_sql');

module.exports = class MessageModel {


    addMessage(message){
        return con.promise().query(`INSERT INTO messages (realty_id,user_id_Send,user_id_Receive,contenu,Lu) values ("${message.id_realty}","${message.UserSend}","${message.UserReceive}","${message.contenu}","${message.lu}");`)

    }

    
    updateConversation(message){
        return con.promise().query(`UPDATE conversation SET lastMessage ="${message.contenu}" WHERE realty_id = ${message.id_realty} AND user_id_Send = ${message.UserSend} AND user_id_Receive = ${message.UserReceive};`)

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