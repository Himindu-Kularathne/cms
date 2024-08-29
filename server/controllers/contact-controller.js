//asyncHandler automatically catches the errors thrown by asynchronous route and passes to the express-async-handler 
//this is a middleware layer , this ensures that errors are properly handled and dont crash the application


const asyncHandler = require("express-async-handler");
const db = require("../config/dbconnection");


//get all contacts controller
// api/contacts     , get
const getContacts = asyncHandler(async (req , res ) => {
    const userid = req.query.userid;
    console.log(userid);
    const sql = "SELECT * FROM contacts where userid = ?";

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
                result
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
    const {name, tpno, userid} = req.body;
    console.log(req.body);
    if(!name ||  !tpno ) {
        res.status(400).json(
            {
                message : "all fields are mandetory"
            }
        );
        throw new Error("All fields are mandetory")

    }
    else {
        db.query("INSERT INTO contacts (name, tpno, userid) VALUES (?, ?, ?)", [name, tpno, userid], (err, result) => {
            if(err) {
                res.status(400).json(
                    {
                        message : "error in adding new contact"
                    }
                )
            }
            else {
                res.status(201).json(
                    {
                        message : "new contact is added",
                        contact : {name, tpno, userid}
                    }
                )
            }
        });
    }
    

  
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
    const id  = req.params.id ;
    db.query("DELETE FROM contacts WHERE id = ?", [id], (err, result) => {
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
