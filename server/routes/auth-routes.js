const express = require('express');
const router = express.Router();

const {loginController} =     require("../controllers/auth-controller");

router.route("/login").post(loginController);


module.exports = router;