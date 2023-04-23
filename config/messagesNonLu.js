const MessageModel = require("../repository/MessageModel")

module.exports = class MessagesNonLu {


    print(req,res){


    
    new MessageModel().getConversation().then(messageMultiple=>{


        if(req.user && req.user.id !== undefined){
           
                                let conversation = messageMultiple.filter(c=>c.user_id_Receive == req.user.id).map(c=>c)
                                    
                                const realty = conversation.map(r=>r.realty_id)  
                    
                                const userss = conversation.map(u=>u.user_id_Send)   
                                
                                let conNonLu = conversation.filter(c=>c.Lu == 0).map(c=>c)

                                req.session.messagesNonLu = conNonLu
                                
                                                                 

        }
        
    })

}

}