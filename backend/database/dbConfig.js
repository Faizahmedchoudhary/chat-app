const mysql = require("mysql")

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"chatexpress"
})

conn.connect((err) => {
    if (err) {
        console.log("error")
    }
    else{
        console.log("connection done successfully")
    }
})

module.exports = conn