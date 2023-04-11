const con = require('../app/database_sql');

module.exports = class RealtyModel {


    addRealty(realties){

        return con.promise().query(`INSERT INTO realties (user_id, contact_id, address1, address2,  town,zipcode,info_address,type,area,room,price,sold,online,info) values ("${realties.user_id}", "${realties.contact_id}", "${realties.address1}", "${realties.adress2}", "${realties.town}", "${realties.zipcode}", "${realties.info_address}","${realties.type}","${realties.area}","${realties.room}","${realties.price}","${realties.sold}","${realties.online}","${realties.info}");`);
    }


    addRealtyPicture(pictures){
      
        return con.promise().query(`INSERT INTO pictures (realty_id,url_path,Ordre) values ("${pictures.id_realty}","${pictures.url_path}","${pictures.ordre}");`)


    }

    RealtyList(limit,offset){

        return con.promise().query("SELECT `r`.*, `u`.`firstname` AS `user_firstname`, `u`.`lastname` AS `user_lastname`, `c`.`firstname` AS `contact_firstname`, `c`.`lastname` AS `contact_lastname` FROM `realties` AS `r` INNER JOIN `users` AS `u` ON `u`.`id`=`r`.`user_id` INNER JOIN `contacts` AS `c` ON `c`.`id`=`r`.`contact_id`order by id desc LIMIT ? OFFSET ?  ;",[limit,offset]).then(([rows]) => {
            return Object.values(rows)
         });
    }

    ImagesList(){

        return con.promise().query("SELECT * FROM `pictures` ").then(([rows]) => {
            return Object.values(rows)
         });

    }

    DeleteRealty(id){

        return con.promise().query(`DELETE FROM realties WHERE id="${id}"`).then(() => {
            console.log("ok");
         });
    }

    DeleteRealtyByContact(id){
        return con.promise().query(`DELETE FROM realties WHERE contact_id="${id}"`).then(() => {
            console.log("ok");
         });
    }


    RealtyCount (){

        return con.promise().query("SELECT COUNT(*) AS realties FROM realties").then((total) => {
            return total[0]
         });
    }

    getRealtyById(id) {

        return con.promise().query(`SELECT * FROM realties WHERE id="${id}"`).then(([rows]) => {
            return Object.values(rows)
         }).catch(err=> {return err});
   
    } 

    UpdateRealty = async (realties,id) => {
        console.log(realties);
        return  con.promise().query(`UPDATE realties SET address1 = "${realties.Adresse}", address2 = "${realties.Addresse2}", zipcode = "${realties.zipcode}",town = "${realties.town}", info = "${realties.info}", type = "${realties.type}", price = "${realties.price}", area = "${realties.area}", room = "${realties.room}"   WHERE realties.id = "${id}"`)
        .then((rows) => {
             console.log("modifiez");
        });
    }


}