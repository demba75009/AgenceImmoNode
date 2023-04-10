const RealtyModel = require("../../repository/RealtyModel")
const ContactModel = require("../../repository/ContactModel")
const UploadImageProductService = require("../services/UploadImageProduct")
module.exports = class Realty{



        RealtyList(req,res){
            if(typeof req.user) {
          
                let limit = 20; // nombre d'éléments par page
    
               let page = parseInt(req.query.page) || 1;
               let offset = (page - 1) * limit;
    
               new RealtyModel().RealtyCount().then(total=> {
                
                const totalPages = Math.ceil(total[0].realties/limit)
    
    
                new RealtyModel().RealtyList(limit,offset).then(realties=>
                    {
                        let user = req.user
                       
                            res.render("admin/Realty/realty-List",{realties,page,totalPages,user})

                        
                         
        
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

        RealtySingle(req,res){

            new RealtyModel().getRealtyById(req.params.id).then(realties=>{
                
                let realty=realties[0]
                if(realty.type == 1)
                {
                    realty.type = "Appartement"

                }
                if(realty.type == 2)
                {
                    realty.type = "Maison"

                }
                if(realty.type == 3)
                {
                    realty.type = "Studio"

                }
                if(realty.type > 3)
                {
                    realty.type = "Autre"

                } 
                new RealtyModel().ImagesList().then(picture=>{

                    let pictures = picture.filter(p=> p.realty_id === realty.id).map(p=>p)

                    console.log(pictures);

                    
                    res.render("Realty-Client/detail/realty-detail",{realty,pictures})
       
                       })
            
            
            })

        }    
        
        RealtyAdd(req,res){

            const contact = {

                civility : req.body.civility,
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                email:req.body.email,
                phone:req.body.phone,
                mobile:req.body.mobile,
                info:req.body.infoContact,
    
            }
    
            const realty = {
    
                user_id : req.user.id,
                address1: req.body.Adresse,
                adresse2:req.body.Addresse2,
                town:req.body.town,
                zipcode:req.body.zipcode,
                info_address:req.body.info,
                type:req.body.type,
                area:req.body.area,
                room:req.body.room,
                price:req.body.price,
                sold:false,
                online:true,
                info:req.body.infoContact
    
            }     

            new ContactModel().getContactByEmail(contact.email).then(async response=>{
            
                if(response[0]){

                    new ContactModel().UpdateContact(contact,response[0].id)

                    realty.contact_id = response[0].id
                    console.log("realty:",realty);
                    new RealtyModel().addRealty(realty).then( response=>{
                        
                        let photos = [];
                        // Enregistrement des images
                        if(typeof req.files != 'undefined' && req.files != null) {
                            if(typeof req.files.photos[0] === 'undefined') {
                                req.files.photos = [req.files.photos];
                            }
                            const UploadImageProduct = new UploadImageProductService();
                            if(typeof req.files.photos != 'undefined' && req.files.photos.length > 0) {
                            
                                Object.values(req.files.photos).forEach(file => {
                                    photos.push(UploadImageProduct.moveFile(file, response[0].insertId));
                                });
                            }                                
                            Promise.all(photos).then((values) => {
                               
                                values.forEach((path, index) => {

                                    const picture = {

                                        id_realty : response[0].insertId,
                                        url_path: path.replace('public/',''),
                                        ordre:index+1
                                        

                                    }

                                    new RealtyModel().addRealtyPicture(picture).then(r=>{

                                        req.flash('notify', `Le bien a été enregistré`);
                                        let user = req.user

                                        res.redirect('/admin/realty',{user});
                                    })

                                })

                               
                            });
                        }


                    }
                        )

                }

                else{

                
                    new ContactModel().addContact(contact)
    
                    new ContactModel().getContactByEmail(contact.email).then(response1=>{
    
      
                    realty.contact_id = response1[0].id
                    new RealtyModel().addRealty(realty).then( response=>{
                        
                        let photos = [];
                        // Enregistrement des images
                        if(typeof req.files != 'undefined' && req.files != null) {
                            if(typeof req.files.photos[0] === 'undefined') {
                                req.files.photos = [req.files.photos];
                            }
                            const UploadImageProduct = new UploadImageProductService();
                            if(typeof req.files.photos != 'undefined' && req.files.photos.length > 0) {
                            
                                Object.values(req.files.photos).forEach(file => {
                                    photos.push(UploadImageProduct.moveFile(file, response[0].insertId));
                                });
                            }                                
                            Promise.all(photos).then((values) => {
                                
                                values.forEach((path, index) => {

                                    const picture = {

                                        id_realty : response[0].insertId,
                                        url_path: path.replace('public/',''),
                                        ordre:index+1


                                    } 

                                    new RealtyModel().addRealtyPicture(picture).then(r=>{

                                        let user = req.user

                                        req.flash('success', `Le bien a été enregistré`);
                                        res.redirect('/admin/realty',user);
                                    })

                                })
                            });
                        }
                        
                    }
                        )

                  })
                }


            })
        
        
        }    

        RealtyAddForm(req,res){
            let user = req.user

            res.render("admin/Realty/realty-form",{realty:0,user})
        }  

        RealtyEdit(req,res){

             new RealtyModel().UpdateRealty(req.body,req.params.id).then(response=>{
    
                let id = req.params.id

                let user = req.user

                req.flash('notify', `Votre bien ${id} bien modifiez ! `);
                res.redirect('/admin/realty',{user});
                        
        
            })

        }    

        RealtyEditForm(req,res){

             new RealtyModel().getRealtyById(req.params.id).then(response=>{
    
                const realty = response[0];
                console.log(realty);
        
                let user = req.user

                res.render("admin/Realty/realty-form",{realty,user})
            })

        }    


         RealtyDelete(req,res){

            
           new RealtyModel().DeleteRealty(req.params.id)

                req.flash("notify",`bien ${req.params.id} supprimé !`)
           
                this.RealtyList(req,res)
                
        
                


         }   

}