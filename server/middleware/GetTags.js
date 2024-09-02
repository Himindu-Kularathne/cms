
const asyncHandler = require('express-async-handler');
const db = require('../config/dbconnection');
const getTags = asyncHandler(async (req, res , next) => {
    //SELECT c.id AS contact_id, t.tag FROM contact c LEFT JOIN tag t ON c.id = t.contact_id WHERE c.user_id = 1;
      const sql = "SELECT c.id AS contact_id, t.tag FROM contact c LEFT JOIN tag t ON c.id = t.contact_id WHERE c.user_id = ?";
      const userid = req.userID;
      console.log("userid" , userid);
      db.query(sql, [userid], (err, result) => {
        
         if(err) {
            res.status(400).json(
               {
                  message : "error in fetching tags"
               }
            )
         }
         else {
              console.log(result);
            req.tags = result;
            next();
         }
      });
  
} );

module.exports = getTags;