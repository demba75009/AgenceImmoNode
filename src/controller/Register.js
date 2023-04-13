
const UserModel = require("../../repository/UserModel.js")

module.exports = class User{


    AddUserForm(req,res){

        res.render("User/User-form")
    }



    process(req, res) {
       

      let user = req.body

      user.roles = "client"
      new UserModel().addUser(user)

      req.flash('notify', 'Votre compte a bien été créé.');
      res.redirect("/")
    }


}