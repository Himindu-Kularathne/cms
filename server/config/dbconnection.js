const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_ROOT_PASSWORD || 'password',
    database: process.env. MYSQL_DATABASE || 'cmsystem',
    port: 3306
});

db.connect((err) => {
    if (err) {
        throw err;
        console.log(err);
    }
    console.log('Connected to database');
});


module.exports = db;