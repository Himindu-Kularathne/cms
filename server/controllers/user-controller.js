const db = require('../config/dbconnection');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');


const getAllUsers = asyncHandler(async (req, res) => {
    const sql = "SELECT * FROM user";
    db.query(sql, (err, result) => {
        if (err) {
            res.status(400).json({
                message: "error in fetching users"
            })
        } else {
            res.status(200).json(
                result
            )
        }
    });
}
);


const getUser = asyncHandler(async (req, res) => {
    const userid = req.userID;
    db.query("SELECT * FROM user WHERE id = ?", [userid], (err, result) => {
        if (err) {
            res.status(400).json({
                message: "error in fetching user"
            })
        } else {
            res.status(200).json(
                result[0]
            )
        }
    })
});


const createUser = asyncHandler(async (req, res) => {
    const { name, email, phone, password } = req.body;
    //check if user already exists
    db.query("SELECT * FROM user WHERE email = ?", [email], async (err, result) => {
        if (err) {
            res.status(400).json({
                message: "error in fetching user. Please try again"
            })
        }
        if (result.length > 0) {
            res.status(400).json({
                message: "user already exists"
            })
        }
    });



    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    if(!name || !password || !phone || !email) {
        res.status(400).json({
            message: "Please provide all the fields"
        })
    } else {
    db.query("INSERT INTO user (name , email, phone, hashed_password) VALUES (?, ?, ?,?)", [name, email, phone, hashedPassword], (err, result) => {
        if (err) {
            res.status(400).json({
                message: "error in creating user"
            })
        } else {
            res.status(200).json({
                message: "user created successfully",
                body : result
            })
        }
    })
    }      
});

const updateUser = asyncHandler(async (req, res) => {
    const userid = req.params.id;
    const { username, password, tpno } = req.body;
    db.query("UPDATE users SET username = ?, password = ?, tpno = ? WHERE userid = ?", [username, password, tpno, userid], (err, result) => {
        if (err) {
            res.status(400).json({
                message: "error in updating user"
            })
        } else {
            res.status(200).json({
                message: "user updated successfully",
                userid : userid
            })
        }
    })
});

const deleteUser = asyncHandler(async (req, res) => {  
    const userid = req.params.id;
    console.log(userid);
    db.query("DELETE FROM users WHERE userid = ? ", [userid,userid], (err, result) => {
        if (err) {
            res.status(400).json({
                message: "error in deleting user"
            })
        } else {
            res.status(200).json({
                message: "user deleted successfully",
                body : result
            })
        }
    })
});

module.exports = { getAllUsers, getUser, createUser, updateUser, deleteUser };







