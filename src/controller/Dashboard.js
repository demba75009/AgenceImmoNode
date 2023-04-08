const path = require('path');
const jwt = require('jsonwebtoken');
const secretJwt = 'eyJeiwidHlwIjoiSyJhbGciOiJub25lIldUIn0Jub2wIjoiSldUIn0';
const Cookies = require("cookies");

module.exports = class Dashboard {
    print(request, response) {
          
        let token = new Cookies(request,response).get('access_token');
        if (token == null) {
            request.flash('error', `Vous devez être connecté pour accéder à l'administration.`);
            response.redirect('/connexion');  

        };

                // sinon on vérifie le jwt
                    jwt.verify(token, secretJwt, (err, dataJwt) => { 
                // Erreur du JWT (n'est pas un JWT, a été modifié, est expiré)
                 
                if(err){
                    request.flash('error', `Vous devez être connecté pour accéder à l'administration.`);
                    response.redirect('/connexion');  

                }

                if(typeof dataJwt.roles != 'undefined' && dataJwt.roles == 'admin') {

                    let user = request.user
                    console.log(user);

                    return response.render('admin/dashboard/index',{user});

                } 
        

            })

            return;
         
      
    }
};
