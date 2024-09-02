//asyncHandler automatically catches the errors thrown by asynchronous route and passes to the express-async-handler 
//this is a middleware layer , this ensures that errors are properly handled and dont crash the application


const asyncHandler = require("express-async-handler");
const db = require("../config/dbconnection");


//get all contacts controller
// api/contacts     , get
const getContacts = asyncHandler(async (req , res ) => {
    const userid = req.userID;
   
    const sql = "SELECT * FROM contact where user_id = ?";

    //tags are fetched from the middleware
    console.log(req.tags);

    db.query(sql, [userid], (err, result) => {
        if(err) {
            res.status(400).json(
                {
                    message : "error in fetching contacts"
                }
            )
        }
        else {
            res.status(200).json(
                //to the result we add the tags fetched from the middleware , chech id and assign tags to respective conatct
                {
                    contacts : result.map(contact => {
                        const tags = req.tags.filter(tag => tag.contact_id === contact.id);
                        contact.tags = tags.map(tag => tag.tag);
                        return contact;
                    })
                }
            )
        }
    });
});


//get specific contact
//api/contacts/id:1  , get 
const getContact = asyncHandler(async (req,res) => {
    const id = req.params.id;
    console.log(id);
  
    
    db.query("SELECT * FROM contacts WHERE id = ?", [id], (err, result) => {
        if(err) {
            res.status(400).json(
                {
                    message : "error in fetching contact"


                }
            )
        }
        else{
            res.status(200).json(
                result
            )
        
        }
})
});


//create new contact
//api/contact   , post
const createContact = asyncHandler(async (req, res) => {

    //destructuring the body
    const contactArray = req.body.contacts;
    
    console.log(req.body);
    const userID = 1;
    //looping thorugh the array of contacts and add them to db
    contactArray.forEach(contact => {
        const {firstName, lastName, address, email} = contact;
        //this should be returning the id
        db.query("INSERT INTO contact (user_id ,first_name, last_name, address, email) VALUES (?, ?, ?, ?, ?)", [userID ,firstName, lastName, address, email], (err, result) => {
        
           
            if(err) {
                res.status(400).json(
                    {
                        message : err
                    }
                )
            }
            else {
                 //should add phone numbers to the phone table
                const phoneNumbers = contact.phoneNumbers;
                const contactID = result.insertId;
                phoneNumbers.forEach(phone => {
                    db.query("INSERT INTO phone (contact_id, phone_number) VALUES (?, ?)", [result.insertId, phone], (err, result) => {
                       
                        if(err) {
                            res.status(400).json(
                                {
                                    message : "error in adding phone number"
                                }
                            )
                        } else {
                            //should add tags to the tag table
                            const tags = contact.tags;
                            tags.forEach(tag => {
                                console.log(contactID);
                                db.query("INSERT INTO tag (contact_id, tag) VALUES (?, ?)", [contactID, tag], (err, result) => {
                                    console.log(tag);
                                    if(err) {
                                        res.status(400).json(
                                            {
                                                message : err
                                            }
                                        )
                                    } 
                                    res.status(201).json(
                                        {
                                            message : "Contacts are added",
                                            body : result
                                        }
                                    )
                                   
                                });
                            })
                        }
                    })
                });
               
            }
        });
    
        
        
    });
   

  
});




//update contact
//api/contact/id:1  , put
const updateContact =  asyncHandler(async (req, res) => {
    const id  = req.params.id;
    const {name, tpno} = req.body;

    db.query("UPDATE contacts SET name = ?, tpno = ? WHERE id = ?", [name, tpno, id], (err, result) => {
        if(err) {
            res.status(400).json(
                {
                    message : "error in updating contact"
                }
            )
        }
        else {
            res.status(201).json(
                result
            )
        }
    });




    
});


//delete contact
//api/contact/id:1  , delete
const deleteContact = asyncHandler( async (req, res) => {
    const id  = req.params.contactID ;
    db.query("DELETE FROM contact WHERE id = ?", [id], (err, result) => {
        if(err) {
            res.status(400).json(
                {
                    message : "error in deleting contact"
                }
            )
        }
        else {
            res.status(201).json(
                {
                    message : "contact is deleted",
                    body : result,
                    id : id
                }
            )

        }
    });
});


module.exports = {getContacts , getContact, createContact, updateContact , deleteContact} ;
