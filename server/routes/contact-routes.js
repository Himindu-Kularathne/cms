const express = require('express');
const router = express.Router();
const {getContacts, getContact, createContact, updateContact , deleteContact} =  require("../controllers/contact-controller")
const validateToken = require("../middleware/ValidateToken");
const getTags = require("../middleware/GetTags");
const getPhones = require('../middleware/GetPhones');
//get and add all contacts
router.post("/", validateToken, createContact);
router.get("/", validateToken , getTags,getPhones, getContacts);

//get specific contact & update contact & delete contact
router.put("/:contactID",validateToken,updateContact);
router.route("/:userid").get(getContacts);
router.delete("/:contactID",validateToken,deleteContact);
module.exports = router;
