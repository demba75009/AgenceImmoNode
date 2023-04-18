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



                    let messagesChat = messageMultiple.filter(m=>m.user_id_Send == req.user.id && m.user_id_Receive === userChat.id && m.realty_id === realty.id).map(m=>m)

                    let user = req.user

                    console.log(messagesChat);
                    res.render("Realty-Client/chat/chat-list",{contact,userChat,realty,pictures,messagesChat,user})
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

                    let user = req.user
                    

                    new MessageModel().addMessage(message).then(response=>{

                     
                      new MessageModel().getConversationbyId(message).then(conv => {


                        if(conv.length > 0)

                        {

                            new MessageModel().updateConversation(message).then( response2 =>{
                                req.flash("message envoyer ! ")
                            
                                this.Get(req,res)
                            

                                
                             }
                             )
                            

                        }
                    else{


                        
                        
                          
                       new MessageModel().addConversation(message).then( response2 =>{
                          req.flash("message envoyer ! ")
                      
                          this.Get(req,res)
                      
  
                       }
                       )
                    }
                      })  
                    

                        

                        
                    })
                       
            

            })

        })

      



    }


    MessagesReçu(req,res){


        
        new MessageModel().getConversation().then(messageMultiple=>{


            let conversation = messageMultiple.filter(c=>c.user_id_Receive == req.user.id).map(c=>c)
                
            const realty = conversation.map(r=>r.realty_id)       
           
            for (let r of realty){

              new RealtyModel().getRealtyById(r).then(realties=>{

                    let singleRealty = realties
                    console.log(singleRealty);
                
                    res.render("profil/Messages.pug",{conversation,singleRealty})

                }

                )

                
            }

            





        })


    }
}