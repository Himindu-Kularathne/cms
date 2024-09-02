const express = require('express');
const router = express.Router();
const {getContacts, getContact, createContact, updateContact , deleteContact} =  require("../controllers/contact-controller")
const validateToken = require("../middleware/ValidateToken");
const getTags = require("../middleware/GetTags");
//get and add all contacts
router.post("/", validateToken, createContact);
router.get("/", validateToken , getTags, getContacts);

//get specific contact & update contact & delete contact
router.route("/:id").get(getContact).put(updateContact);
router.route("/:userid").get(getContacts);
router.delete("/:contactID",validateToken,deleteContact);
module.exports = router;
