const ContactModel = require("../../repository/ContactModel");
const RealtyModel = require("../../repository/RealtyModel");

module.exports = class Contact {


    ContactList(req,res){

    let limit = 20; // nombre d'éléments par page
    
    let page = parseInt(req.query.page) || 1;
    let offset = (page - 1) * limit;
 
     new ContactModel().ContactCount().then(total=>{

        const totalPages = Math.ceil(total[0].contacts/limit)

        

        new ContactModel().getContact(limit,offset).then(response => {
 

            const contacts = response
            let user = req.user


            res.render("admin/Contact/Contact-list",{contacts,user,page,totalPages})
            
        })
     })

    } 

    ContactDelete(req,res){

        let id = req.params.id

        new ContactModel().deleteContact(id).then(response=>{

            new RealtyModel().DeleteRealtyByContact(id).then(response2=>{


            

            this.ContactList()
            })

        })

    }


}