const mysql = require("mysql2");
const connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "Robin@123",
    database : "preparation-db"
})

connection.connect((err) => {
    if (err) {
        console.log("Database connection failed!",err);
    }else{
        console.log("Database is connected");
    }
})

module.exports = connection;