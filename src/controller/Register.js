
const UserModel = require("../../repository/UserModel.js")

module.exports = class User{


    AddUserForm(req,res){

        res.render("User/User-form")
    }



    process(req, res) {
       

      new UserModel().addUser(req.body)

      req.flash('notify', 'Votre compte a bien été créé.');
      res.redirect("/")
    }


}