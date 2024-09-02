const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (token === null) {
        return res.status(401).json({ message: "User is not Authorized" });
      } else {
        
        if (err) {
          return res.status(401).json({ message: "User is not Authorized" });
        } else {
          if (err) {
            res.status(401).json({ message: "User is not Authorized" });
          }
          req.userID = decoded.id;
          console.log("decoded", decoded);
          next();
        }
      }
    });
  }
});

module.exports = validateToken;