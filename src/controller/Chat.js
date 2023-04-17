const RealtyModel = require("../../repository/RealtyModel")
const ContactModel = require("../../repository/ContactModel")
const UserModel = require("../../repository/UserModel")
const MessageModel = require("../../repository/MessageModel")

module.exports = class Chat{


    Get(req,res){


        new RealtyModel().getRealtyById(req.params.id).then(realties=>{
                
            let realty=realties[0]
            
            new RealtyModel().ImagesList().then(picture=>{

                let pictures = picture.filter(p=> p.realty_id === realty.id).map(p=>p)



                new ContactModel().getContactById(realty.contact_id).then( conctacts=>{
        

                    let contact = conctacts[0]

                new UserModel().getUserById(realty.user_id).then(userMultiple =>
                    
                    {
                        
                let userChat = userMultiple[0]

                new MessageModel().getmessage().then(messageMultiple=>{



                    let messages = messageMultiple.filter(m=>m.user_id_Send == req.user.id && m.user_id_Receive === userChat.id).map(m=>m)

                    let user = req.user

                    console.log(messages);
                    res.render("Realty-Client/chat/chat-list",{contact,userChat,realty,pictures,messages,user})
                })
                
                    }
                )    
                

   

                })
                   })
        
        
        })



    }
    
    Add(req,res){

        new RealtyModel().getRealtyById(req.params.id).then(realties=>{

            let realty=realties[0]

                
        new UserModel().getUserById(realty.user_id).then(userMultiple =>
                    
            {

                let userR = userMultiple[0]

                let message = {
            
                    id_realty : realty.id,
                    UserSend:req.user.id, 
                    UserReceive:userR.id,    
                    contenu: req.body.dialogue,
                    lu:false
                    
                    }

                    

                    new MessageModel().addMessage(message).then(response=>{

                        req.flash("message envoyer ! ")
                        res.redirect("/")
                    })
            

            })

        })

      



    }
}