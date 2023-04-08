const UserModel = require("../../repository/UserModel.js")
const jwt = require('jsonwebtoken');
const secretJwt = 'eyJeiwidHlwIjoiSyJhbGciOiJub25lIldUIn0Jub2wIjoiSldUIn0';
const Cookies = require("cookies");

const bcrypt = require('bcrypt');

module.exports = class UserAdmin {

    UserList(req,res){

        let token = new Cookies(req,res).get('access_token');
        if (token == null) {
            req.flash('error', `Vous devez être connecté pour accéder à l'administration.`);
            res.redirect('/connexion');  

        };

        // sinon on vérifie le jwt
        jwt.verify(token, secretJwt, (err, dataJwt) => { 
            // Erreur du JWT (n'est pas un JWT, a été modifié, est expiré)
             
            if(err){
                req.flash('error', `Vous devez être connecté pour accéder à l'administration.`);
                res.redirect('/connexion');  

            }

            if(typeof dataJwt.roles != 'undefined' && dataJwt.roles == 'admin') {
          
            let limit = 20; // nombre d'éléments par page

           let page = parseInt(req.query.page) || 1;
           let offset = (page - 1) * limit;

           new UserModel().UserCount().then(total=> {
            
            const totalPages = Math.ceil(total[0].users/limit)


            new UserModel().UserList(limit,offset).then(users=>
                {

                    let user = req.user

                res.render("admin/User/User-List",{users,page,totalPages,user})
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
        )
    }

    AddUserForm(req,res){
        let user = req.user

        res.render("admin/User/User-form",{user})
    }

   async process(req, res) {


            let user={
                civility : req.body.civility,
                firstname : req.body.firstname,
                lastname : req.body.lastname,
                email : req.body.email,
                phone : req.body.phone,
                password : req.body.password,
                roles : "admin"
            }


          new UserModel().getUserByEmail(req.body.email).then(exist=> {

                if(exist.length > 0)

                {

                    req.flash('error', 'Cette adresse email existe déjà !');
                    res.render('admin/User/User-form', {user});

                }

                else {

                   new UserModel().addUser(user)
                    req.flash('notify', 'Votre compte a bien été créé.');
   
                    res.redirect('/admin');     
                }

            }).catch(err=> {
                console.log(err);

                res.render("admin/User/User-form",{user,error:"MAIL DEJA EXISTANT"})


            })

           
    }


}

