const mysql = require("mysql");
const con = mysql.createConnection({
  host: "sql10.freesqldatabase.com",
  user: "sql10523545",
  password: "SRdFCcbepB",
  database: "sql10523545",
});
con.connect(function (err) {
  if (err) throw err;
  console.log("DB Connected!");
});

module.exports = { con };
