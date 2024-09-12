const mysql = require('mysql2');

const db = mysql.createConnection({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'password',
    database: process.env.MYSQL_DATABASE || 'cmsystem',
    port: 3307,
    // insecureAuth : true
});

db.connect((err) => {
    if (err) {
        console.log("error connecting db" , err);
        throw err;
       
    }
    console.log('Connected to database');
});


module.exports = db;