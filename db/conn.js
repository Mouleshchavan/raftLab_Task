// // const mysql = require("mysql2")
// const mysql = require('mssql')

// var conn = ({
//     user :'interview',
//     password :'interview@123',
//     server:'LAPTOP-RQHPPRO2',
//     database:'interview',
//     options:{
//         trustedconnection: true,
//         enableArithAbort : true, 
//         instancename :'mssql.esmsys.in'
//     },
//     port : 14251


// });

// module.exports = conn
const sql = require('mssql')
const conn2 = {
    user: 'interview',
    password: 'interview@123',
    server: 'mssql.esmsys.in', 
    database: 'interview',
    port: 14251,
    options: {
        encrypt: false // Use this if you're on Windows Azure
    }
}


const conn = new sql.ConnectionPool(conn2)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL')
    return pool
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err))

  module.exports = conn
