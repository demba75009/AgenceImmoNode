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



                    let messagesChat = messageMultiple.filter(m=>(m.user_id_Send || m.user_id_Receive == req.user.id) && (m.user_id_Receive || m.user_id_Send === userChat.id) && m.realty_id === realty.id).map(m=>m)

                    let user = req.user

                   
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

    ResponseChat(req,res){

       
        new RealtyModel().getRealtyById(req.params.id).then(realties=>{

            let realty=realties[0]

                
        new UserModel().getUserById(realty.user_id).then(userMultiple =>
                    
            {

                let userR = req.params.userReceive

                let message = {
            
                    id_realty : realty.id,
                    UserSend:req.user.id, 
                    UserReceive:userR,    
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
                            
                                this.GetChatResponseReçu(req,res,userR)
                            

                                
                             }
                             )
                            

                        }
                    else{


                        
                        
                          
                       new MessageModel().addConversation(message).then( response2 =>{
                          req.flash("message envoyer ! ")
                      
                          this.GetChatResponseReçu(req,res,userR)
                      
  
                       }
                       )
                    }
                      })  
                    

                        

                        
                    })
                       
            

            })

        })
 
    }

    GetChatResponseReçu(req,res,receive){

        let userSend = receive

        new RealtyModel().getRealtyById(req.params.id).then(realties=>{
                
            let realty=realties[0]
            
            new RealtyModel().ImagesList().then(picture=>{

                let pictures = picture.filter(p=> p.realty_id === realty.id).map(p=>p)



                new ContactModel().getContactById(realty.contact_id).then( conctacts=>{
        

                    let contact = conctacts[0]

                new UserModel().getUserById(userSend).then(userMultiple =>
                    
                    {
                        
                let userChat = userMultiple[0]


                new MessageModel().getmessage().then(messageMultiple=>{



                    let messagesChat = messageMultiple.filter(m=>(m.user_id_Send || m.user_id_Receive == req.user.id) && (m.user_id_Receive || m.user_id_Send === userChat.id) && m.realty_id === realty.id).map(m=>m)

                    let user = req.user

                    let messageDiscution = messagesChat.filter(m=>m.realty_id == realty.id).map(m=>m)


                    res.render("Realty-Client/chat/chat-list-discution",{contact,userChat,realty,pictures,messageDiscution,user})
                })
                
                    }
                )    
                

   

                })
                   })
        
        
        })


    }

    MessagesEnvoyer(req,res){


        
        new MessageModel().getConversation().then(messageMultiple=>{


            let conversation = messageMultiple.filter(c=>c.user_id_Send == req.user.id).map(c=>c)

            const realty = conversation.map(r=>r.realty_id)  

            const userss = conversation.map(u=>u.user_id_Receive)       
           


              new RealtyModel().GetRealty().then(realties=>{


                let realtie = []
                for (let r2 in realty){

                     let dr = realties.find(r=>r.id === realty[r2])

                     realtie.push(dr)
                }


                new UserModel().GetUser().then(users=>{

                    let userMessage = []

                    for(let u in userss){

                        let ur = users.find(r=>r.id === userss[u])
                        if(!userMessage.includes(ur))
                         userMessage.push(ur)
                    }

                       let user = req.user 

                    res.render("profil/messages/Messages-envoyer.pug",{conversation,realtie,userMessage,user})
                })


                

                

                }

                )

                
            

            





        })


    }
    MessagesReçu(req,res){


        
        new MessageModel().getConversation().then(messageMultiple=>{


            let conversation = messageMultiple.filter(c=>c.user_id_Receive == req.user.id).map(c=>c)
                
            const realty = conversation.map(r=>r.realty_id)  

            const userss = conversation.map(u=>u.user_id_Send)       
           


              new RealtyModel().GetRealty().then(realties=>{


                let realtie = []
                for (let r2 in realty){

                     let dr = realties.find(r=>r.id === realty[r2])

                     realtie.push(dr)
                }


                new UserModel().GetUser().then(users=>{

                    let userMessage = []

                    for(let u in userss){

                        let ur = users.find(r=>r.id === userss[u])
                        if(!userMessage.includes(ur))
                         userMessage.push(ur)
                    }

                       let user = req.user 

                    res.render("profil/Messages.pug",{conversation,realtie,userMessage,user})
                })


                

                

                }

                )

                
            

            





        })


    }


    GetChatReçu(req,res){

        let userSend = req.params.userSend

        new RealtyModel().getRealtyById(req.params.id).then(realties=>{
                
            let realty=realties[0]
            
            new RealtyModel().ImagesList().then(picture=>{

                let pictures = picture.filter(p=> p.realty_id === realty.id).map(p=>p)



                new ContactModel().getContactById(realty.contact_id).then( conctacts=>{
        

                    let contact = conctacts[0]

                new UserModel().getUserById(userSend).then(userMultiple =>
                    
                    {
                        
                let userChat = userMultiple[0]


                new MessageModel().getmessage().then(messageMultiple=>{



                    let messagesChat = messageMultiple.filter(m=>(m.user_id_Send || m.user_id_Receive == req.user.id) && (m.user_id_Receive || m.user_id_Send === userChat.id) && m.realty_id === realty.id).map(m=>m)

                    let user = req.user

                    let messageDiscution = messagesChat.filter(m=>m.realty_id == realty.id).map(m=>m)


                    res.render("Realty-Client/chat/chat-list-discution",{contact,userChat,realty,pictures,messageDiscution,user})
                })
                
                    }
                )    
                

   

                })
                   })
        
        
        })


    }
}