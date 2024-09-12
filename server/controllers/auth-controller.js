const db =  require('../config/dbconnection');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const loginController = asyncHandler(async (req, res) => {
      const { email, password } = req.body;
      if (!email || !password) {
         res.status(400).json({
               message: "Please provide all the fields"
         })
      } else {
      
         db.query("SELECT * FROM user WHERE email = ?", [ email], async (err, result) => {
            console.log("result");
               if (err) {
                  res.status(400).json({
                     message: "hi"
                  })
               } else {
                  console.log(result[0].hashed_password);
                  if (result.length > 0) {
                     bcrypt.compare(password, result[0].hashed_password, (err, isMatch) => {
                        if (err) {
                           res.status(400).json({
                              message: "Invalid credentials"
                           })
                        } else {
                           if (isMatch) {
                              const token = jwt.sign({ email: result[0].email, id: result[0].id }, process.env.JWT_SECRET, {
                                 expiresIn: "1h"
                              });
                              res.status(200).json({
                                 message: "Login successful",
                                 token: token
                              })
                           } else {
                              res.status(400).json({
                                 message: "Invalid credentials"
                              })
                           }
                        }
                     }
                     )

                     
                  } else {
                     res.status(400).json({
                           message: "Invalid credentials"
                     })
                  }
               }
         })
      }
   }
);


module.exports = { loginController };