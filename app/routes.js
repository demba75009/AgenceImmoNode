const Home = require('../src/controller/Home.js');
const User = require("../src/controller/Register.js")
const UserAdmin = require("../src/controller/UserAdmin.js")
const Authenticated = require('../src/controller/Authenticated.js');
const Dashboard = require('../src/controller/Dashboard.js');
const Realty = require('../src/controller/Realty.js');
const Contact = require("../src/controller/Contact.js")
const Register = require("../src/controller/Register.js")
const Chat = require("../src/controller/Chat.js")
module.exports = (app) => {
    // app.get('/', (req, res) => {
    //     new Home().print(req, res)    });

    app.get("/",(req,res)=>{

        new Home().print(req,res)

    })   
   
    app.get("/message/:id",(req,res)=>{

        new Chat().MessagesReçu(req,res)

    })   
    app.get("/messages/envoyer/:id",(req,res)=>{

        new Chat().MessagesEnvoyer(req,res)

    })   





    app.get("/profil",(req,res)=>{
 
        new Home().profil(req,res)

    })   


    app.get("/realty/:id",(req,res)=>{

        new Realty().RealtySingle(req,res)

    })   



    app.get("/realty/:id/contactResponse/:userSend",(req,res)=>{

        new Chat().GetChatReçu(req,res)

    }) 

    app.post("/realty/:id/contactResponse/:userReceive",(req,res)=>{

        new Chat().ResponseChat(req,res)

    }) 

    app.get("/realty/:id/contact/:contact",(req,res)=>{

        new Chat().Get(req,res)

    })   
    app.post("/realty/:id/contact/:contact",(req,res)=>{

        new Chat().Add(req,res)

    })   


    app.get('/admin', (req, res) => {
        (new Dashboard()).print(req, res);
    });

    app.get('/admin/user', (req, res) => {
        (new UserAdmin()).UserList(req, res);
    });

    app.get('/admin/contact', (req, res) => {
        (new Contact()).ContactList(req, res);
    });
    app.delete('/admin/contact-list/delete/:id', (req, res) => {
        (new Contact()).ContactDelete(req, res);
    });

  

    app.get('/realty/add/form', 
        (req, res) => {
         (new Realty()).RealtyAddFormClient(req, res);
    });

    app.post('/realty/add/ok',
        require('express-fileupload')({createParentPath: true}),
        require('../src/services/LcParserService.js'), 
        (req, res) => {
            (new Realty()).RealtyAddClient(req, res);
    });


    app.get('/realty/edit/:id', (req, res) => {
        (new Realty()).RealtyEditFormClient(req, res);
    });

    app.put('/realty/edit/:id', 
    require('express-fileupload')({createParentPath: true}),
    require('../src/services/LcParserService.js'),  (req, res) => {
        (new Realty()).RealtyEditClient(req, res);
    });


    app.delete('/realty/delete/:id', (req, res) => {
        (new Realty()).RealtyDeleteClient(req, res);
    });



    app.get('/admin/realty/add', 
        (req, res) => {
         (new Realty()).RealtyAddForm(req, res);
    });

    app.post('/admin/realty/add/ok',
        require('express-fileupload')({createParentPath: true}),
        require('../src/services/LcParserService.js'), 
        (req, res) => {
            (new Realty()).RealtyAdd(req, res);
    });

    app.get('/admin/realty', (req, res) => {
        (new Realty()).RealtyList(req, res);
    });
    
    app.get('/admin/realty/edit/:id', (req, res) => {
        (new Realty()).RealtyEditForm(req, res);
    });
    app.put('/admin/realty/edit/:id', 
    require('express-fileupload')({createParentPath: true}),
    require('../src/services/LcParserService.js'),  (req, res) => {
        (new Realty()).RealtyEdit(req, res);
    });
    
    app.delete('/admin/realty/delete/:id', (req, res) => {
        (new Realty()).RealtyDelete(req, res);
    });

    app.get("/user/inscription/form",(req,res)=>{

        new Register().AddUserForm(req,res)

    }) 
    app.post("/user/user-client/create",(req,res)=>{

        new Register().process(req,res)

    }) 

    app.get("/admin/user/form",(req,res)=>{

        new UserAdmin().AddUserForm(req,res)

    })   
    
    app.post("/user/create",(req,res)=>{

        new UserAdmin().process(req,res)
    })

    app.get('/connexion', (req, res) => {
     
        (new Authenticated()).print(req, res);
    });

    app.post('/connexion', (req, res) => {
        (new Authenticated()).process(req, res);
    });
    

    app.get('/deconnexion', (req, res) => {
        (new Authenticated()).disconnect(req, res);
      });
      
      app.get("/:city",(req,res)=>{

        new Home().searchCity(req,res)


    })



};

