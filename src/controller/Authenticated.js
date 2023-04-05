const UserModel = require("../../repository/UserModel");

const bcrypt = require('bcrypt');

module.exports = class Authenticated {
    print(request, response) {
        response.render('authenticated/form', {form: {}});  
    }

     process(request, response) {

        new UserModel().getUserByEmail(request.body.email).then(async user=>{
            const password = request.body.password

            const match = await bcrypt.compare(password, user[0].password);

            if(match){

                request.session.user = user;

                request.flash('notify', 'Vous êtes bien connecté !');
               
                response.redirect("/")
                
            }
            else{
                request.flash('error', 'Authentification incorrecte veuillez vérifiez vos informations !');

                console.log("error");
                response.redirect("/connexion")

            }


        })

    }

    disconnect(request, response) {
        request.session.user = null;
        request.flash('notify', 'Vous êtes maintenant déconnecté.');
        response.redirect('/');
    }

}

 