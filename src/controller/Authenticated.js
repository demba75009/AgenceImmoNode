const UserModel = require("../../repository/UserModel");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Cookies = require("cookies");
const secretJwt = 'eyJeiwidHlwIjoiSyJhbGciOiJub25lIldUIn0Jub2wIjoiSldUIn0';

module.exports = class Authenticated {
    print(request, response) {
        response.render('authenticated/form', {form: {}});  
    }

     process(request, response) {

        new UserModel().getUserByEmail(request.body.email).then(async user=>{

            if(user.length > 0){


            
            const password = request.body.password

            const match = user[0].password
 
            if(match === password){

                let accessToken = jwt.sign({civility:user[0].civility,id:user[0].id,username: user[0].firstname,lastname: user[0].lastname, roles: user[0].roles}, secretJwt, {expiresIn: 604800});   

                request.user = accessToken

                new Cookies(request,response).set('access_token', accessToken, {httpOnly: true, secure: false });
        
              
                request.flash('notify', 'Vous êtes bien connecté !');
               
                response.redirect("/")
                
            }
            else{
                request.flash('error', 'Authentification incorrecte veuillez vérifiez vos informations !');

                console.log("error");
                response.redirect("/connexion")

            }
        }
        else{

            request.flash('error', 'Authentification incorrecte veuillez vérifiez vos informations !');

            response.redirect("/connexion")
        }

        })

    }

    disconnect(request, response) {
        request.session.user == null;
        console.log(request.session.user);
        request.flash('notify', 'Vous êtes maintenant déconnecté.');
        response.redirect('/');
    }

}

 