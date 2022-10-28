const mysql = require("mysql");
const con = mysql.createConnection({
  host: "sql10.freesqldatabase.com",
  user: "sql10529814",
  password: "IwxkzAQ6ks",
  database: "sql10529814",
});
con.connect(function (err) {
  if (err) throw err;
  console.log("DB Connected!");
});

module.exports = { con };
