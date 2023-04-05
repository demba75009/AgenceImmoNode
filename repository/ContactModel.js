const con = require('../app/database_sql');

module.exports = class ContactModel{


    getContactByEmail = async (email) => {
        return con.promise().query("SELECT * FROM `contacts` WHERE `email`=?",  email).then((rows) => {
            if(rows[0].length == 1) return rows[0];            
            return {};    });
    }
    

    UpdateContact = async (contacts,id) => {
        return  con.promise().query(`UPDATE contacts SET civility = "${contacts.civility}", lastname = "${contacts.lastname}", email = "${contacts.email}",firstname = "${contacts.firstname}", phone = "${contacts.phone}, mobile = ${contacts.mobile},info = ${contacts.info} " WHERE contacts.id = "${id}"`)
        .then((rows) => {
             console.log( "ok");
        });
       
    }

    addContact = (contact)=>{

   
        return con.promise().query(`INSERT INTO contacts (civility, firstname, lastname, email,  phone, mobile,info) values ("${contact.civility}", "${contact.lastname}", "${contact.firstname}", "${contact.email}", "${contact.phone}", "${contact.mobile}", "${contact.info}");`)
       
       
       // can.promise().query("INSERT INTO `contacts` SET ?", contact)
       
       }

}