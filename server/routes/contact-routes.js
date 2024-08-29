const express = require('express');
const router = express.Router();
const {getContacts, getContact, createContact, updateContact , deleteContact} =  require("../controllers/contact-controller")

//get and add all contacts
router.route("/").get(getContacts).post(createContact);

//get specific contact & update contact & delete contact
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);
router.route("/:userid").get(getContacts);

module.exports = router;
