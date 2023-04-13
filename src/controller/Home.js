const RealtyModel = require("../../repository/RealtyModel")

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

  
             res.render("home",{realties,page,totalPages,pictures})

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
           
            console.log(realties);
              new RealtyModel().ImagesList().then(pictures=>{

           
           res.render("Profil/profilUser",{user,realties,page,totalPages,pictures})
              })
           }
           )})


   }

    }
    

 