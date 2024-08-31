const db =  require('../config/dbconnection');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const loginController = asyncHandler(async (req, res) => {
      const { email, password } = req.body;
      if (!username || !password) {
         res.status(400).json({
               message: "Please provide all the fields"
         })
      } else {
         db.query("SELECT * FROM user WHERE email = ?", [username], async (err, result) => {
               if (err) {
                  res.status(400).json({
                     message: "error in fetching user"
                  })
               } else {
                  if (result.length > 0) {
                     const isMatch = await bcrypt.compare(password, result[0].password);
                     if (isMatch) {
                           const token = jwt.sign({ id: result[0].id }, process.env.JWT_SECRET, {
                              expiresIn: process.env.JWT_EXPIRE
                           });
                           res.status(200).json({
                              message: "login successful",
                              token: token
                           })
                     } else {
                           res.status(400).json({
                              message: "Invalid credentials"
                           })
                     }
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