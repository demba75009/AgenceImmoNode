const RealtyModel = require("../../repository/RealtyModel")
const MessageModel = require("../../repository/MessageModel")

module.exports = class Home {
    print(req, res) {


        let limit = 20; // nombre d'éléments par page
    
        let page = parseInt(req.query.page) || 1;
        let offset = (page - 1) * limit;

        new RealtyModel().RealtyCount().then(total=> {
         
         const totalPages = Math.ceil(total[0].realties/limit)


         new RealtyModel().RealtyList(limit,offset).then(realties=>
             {
             
                new RealtyModel().ImagesList().then(pictures=>{

                  new MessageModel().getConversation().then(messageMultiple=>{


                     if(req.user && req.user.id !== undefined){
                        
                                             let conversation = messageMultiple.filter(c=>c.user_id_Receive == req.user.id).map(c=>c)
                                                 
                                             const realty = conversation.map(r=>r.realty_id)  
                                 
                                             const userss = conversation.map(u=>u.user_id_Send)   
                                             
                                             let conNonLu = conversation.filter(c=>c.Lu == 0).map(c=>c)

                                             req.session.messagesNonLu = conNonLu
                                             
                                                                              


                     }
                     
                     
                  
  
             res.render("home",{realties,page,totalPages,pictures})

                  }) 
                })
             }
             )})
    }


    profil(req,res){

      let limit = 20; // nombre d'éléments par page
    
      let page = parseInt(req.query.page) || 1;
      let offset = (page - 1) * limit;

      let user = req.user
      new RealtyModel().RealtyCount().then(total=> {
       
       const totalPages = Math.ceil(total[0].realties/limit)


       new RealtyModel().RealtyList(limit,offset).then(realtiesMultiple=>
           {

            let realties = realtiesMultiple.filter(r=>r.user_id == user.id)
           
              new RealtyModel().ImagesList().then(pictures=>{

           
           res.render("Profil/profilUser",{user,realties,page,totalPages,pictures})
              })
           }
           )})


   }

   searchCity(req,res){

      
      let city = req.params.city
      let limit = 20; // nombre d'éléments par page
    
      let page = parseInt(req.query.page) || 1;
      let offset = (page - 1) * limit;

      new RealtyModel().RealtyCount().then(total=> {
       
       const totalPages = Math.ceil(total[0].realties/limit)


       new RealtyModel().RealtyList(limit,offset).then(realtiesMultiples=>
           {

            const realties = realtiesMultiples.filter(r =>r.town.includes(city)).map(r=>r)
           
              new RealtyModel().ImagesList().then(pictures=>{


               res.render("Realty-Client/realty-result",{city,realties,page,totalPages,pictures})

              })
           }
           )})



   }

    }
    

 