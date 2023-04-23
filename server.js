const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config()
const session = require('express-session');
const methodOverride = require ("method-override")
const mime = require('mime-types');
const jwt = require('jsonwebtoken');
const secretJwt = 'eyJeiwidHlwIjoiSyJhbGciOiJub25lIldUIn0Jub2wIjoiSldUIn0';
const Cookies = require("cookies");
const http = require('http');

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

//--------------------------------------------------------------------
//      Mise en place du moteur de template
//--------------------------------------------------------------------
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'pug');

//  Mise en place du middleware pour récupérer les données du formulaire
app.use(express.urlencoded({ extended: true }));

//--------------------------------------------------------------------
//      Mise en place du répertoire static
//--------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));

//--------------------------------------------------------------------
//      Ajout du midlleware express session
//--------------------------------------------------------------------
app.use(session({
    secret: process.env.APP_KEY, resave:false, saveUninitialized:false, 
    cookie: {maxAge: 3600000} 
}));

// utiliser les sessions dans les vues
app.use((req,res,next) => {
  // req.session.user = { id: 15, firstname: 'Demba', lastname : 'KANTE' };
  let token = new Cookies(req,res).get('access_token');
 
  jwt.verify(token, secretJwt, (err, dataJwt) => { 

    if (err) req.session.user == null
   
    req.user = dataJwt

   
    req.session.user = dataJwt
    req.session.messagesNonLu = []
    res.locals.session = req.session;
    res.locals.route = req._parsedUrl.pathname;
  })
  next();
});

// method de surcharge, force le put et le delete
app.use(methodOverride('_method'))

 
//--------------------------------------------------------------------
//      Ajout du midlleware express flash messages
//--------------------------------------------------------------------
const flash = require('express-flash-messages');
const { log } = require('console');
app.use(flash());


//--------------------------------------------------------------------
//      Chargement des routes
//--------------------------------------------------------------------
require('./app/routes')(app);


//--------------------------------------------------------------------
//     Ecoute du serveur HTTP
//--------------------------------------------------------------------
 server.listen(process.env.PORT,() => {
    if (process.env.APP_ENV == 'dev' && process.send) {  process.send('online'); }
      console.log(`Le serveur est démarré : http://localhost:${process.env.PORT}`)
    });


