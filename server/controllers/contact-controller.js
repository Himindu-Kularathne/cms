//asyncHandler automatically catches the errors thrown by asynchronous route and passes to the express-async-handler
//this is a middleware layer , this ensures that errors are properly handled and dont crash the application

const asyncHandler = require("express-async-handler");
const db = require("../config/dbconnection");
const util = require("util");
const dbQuery = util.promisify(db.query).bind(db);
//get all contacts controller
// api/contacts     , get
const getContacts = asyncHandler(async (req, res) => {
  const userid = req.userID;

  const sql = "SELECT * FROM contact where user_id = ?";

  //tags are fetched from the middleware
  console.log(req.tags);

  db.query(sql, [userid], (err, result) => {
    if (err) {
      res.status(400).json({
        message: "error in fetching contacts",
      });
    } else {
      res.status(200).json(
        //to the result we add the tags fetched from the middleware , chech id and assign tags to respective conatct
        {
          contacts: result.map((contact) => {
            const tags = req.tags.filter(
              (tag) => tag.contact_id === contact.id
            );
            contact.tags = tags.map((tag) => tag.tag);
            return contact;
          }),
        }
      );
    }
  });
});

//get specific contact
//api/contacts/id:1  , get
const getContact = asyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log(id);

  db.query("SELECT * FROM contacts WHERE id = ?", [id], (err, result) => {
    if (err) {
      res.status(400).json({
        message: "error in fetching contact",
      });
    } else {
      res.status(200).json(result);
    }
  });
});

//create new contact
//api/contact   , post


const createContact = asyncHandler(async (req, res) => {
  try {
    const contactArray = req.body.contacts;
    const userID = req.userID ;

    for (const contact of contactArray) {
      const { firstName, lastName, address, email, phoneNumbers, tags } = contact;

      // Insert the contact and get the contact ID
      const result = await dbQuery(
        "INSERT INTO contact (first_name, last_name, address, email, user_id) VALUES (?, ?, ?, ?, ?)",
        [firstName, lastName, address, email, userID]
      );

      const contactID = result.insertId;
      if (!contactID) {
        throw new Error("Failed to retrieve contact ID");
      }

      // Insert phone numbers
      for (const phone of phoneNumbers) {
        await dbQuery(
          "INSERT INTO phone (contact_id, phone_number) VALUES (?, ?)",
          [contactID, phone.phoneNumber]
        );
      }

      // Insert tags
      for (const tag of tags) {
        await dbQuery(
          "INSERT INTO tag (contact_id, tag) VALUES (?, ?)",
          [contactID, tag]
        );
      }
    }

    // Only send the response once all contacts are processed
    res.status(201).json({
      message: "Contacts are added successfully",
    });

  } catch (err) {
    console.error("Error:", err.message);
    res.status(400).json({
      message: err.message || "An error occurred while adding contacts",
    });
  }
});



//update contact
//api/contact/id:1  , put
const updateContact = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { name, tpno } = req.body;

  db.query(
    "UPDATE contacts SET name = ?, tpno = ? WHERE id = ?",
    [name, tpno, id],
    (err, result) => {
      if (err) {
        res.status(400).json({
          message: "error in updating contact",
        });
      } else {
        res.status(201).json(result);
      }
    }
  );
});

//delete contact
//api/contact/id:1  , delete
const deleteContact = asyncHandler(async (req, res) => {
  const id = req.params.contactID;
  db.query("DELETE FROM contact WHERE id = ?", [id], (err, result) => {
    if (err) {
      res.status(400).json({
        message: "error in deleting contact",
      });
    } else {
      res.status(201).json({
        message: "contact is deleted",
        body: result,
        id: id,
      });
    }
  });
});

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
