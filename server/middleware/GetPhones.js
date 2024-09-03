
const asyncHandler = require('express-async-handler');
const db = require('../config/dbconnection');
const getPhones = asyncHandler(async (req, res , next) => {

      const sql = "SELECT c.id AS contact_id, p.phone_number FROM contact c LEFT JOIN phone p ON c.id = p.contact_id WHERE c.user_id = ?";
      const userid = req.userID;
      console.log("userid" , userid);
      db.query(sql, [userid], (err, result) => {
        
         if(err) {
            res.status(400).json(
               {
                  message : "error in fetching phones"
               }
            )
         }
         else {
              console.log(result);
            req.phones = result;
            next();
         }
      });
  
} );

module.exports = getPhones;