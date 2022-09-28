const mysql = require("mysql2")

const conn = mysql.createConnection({
user:"root",
host:"localhost",
password:"1234",
database:"crudnode"


});

conn.connect((err)=>{
    if(err)throw err;
    console.log("DB connnected")
})
module.exports = conn