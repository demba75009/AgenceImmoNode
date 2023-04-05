const UserModel = require("../../repository/UserModel.js")

module.exports = class UserAdmin {

    UserList(req,res){

        if(typeof req.session.user !== 'undefined') {
          
            let limit = 20; // nombre d'éléments par page

           let page = parseInt(req.query.page) || 1;
           let offset = (page - 1) * limit;

           new UserModel().UserCount().then(total=> {
            
            const totalPages = Math.ceil(total[0].users/limit)


            new UserModel().UserList(limit,offset).then(users=>
                {
    
                     
    
                res.render("admin/User/User-List",{users,page,totalPages})
                }
                )
            }
           )
    
        
        }   
        else{
            req.flash('error', `Vous devez être connecté pour accéder à l'administration.`);
            res.redirect('/connexion');  
        }
       
        }
    }

