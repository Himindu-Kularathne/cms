const express = require('express');
const router = express.Router();
const {getAllUsers, getUser, createUser, updateUser, deleteUser} = require("../controllers/user-controller");
const validateToken = require('../middleware/ValidateToken');


router.route("/").post(createUser);
router.route("/:id").put(updateUser).delete(deleteUser);
router.get("/", validateToken, getUser);
module.exports = router;