const express = require('express')
const app = express()
const localPort = 3000

const mysql = require('mysql');

const con = mysql.createConnection({
  host: "sql10.freesqldatabase.com",
  user: "sql10523545",
  password: "SRdFCcbepB",
  database: "sql10523545"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get('/', (req, res) => {
  con.query("SELECT * FROM Teste", function (err, result) {
    if (err) throw err;
    console.log("resultado: ", result);
  });
  res.header("Access-Control-Allow-Origin", "*");
  res.send('TEste!')
})

app.get('/tempoReal', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  con.query("SELECT * FROM Consumos LIMIT 1", function (err, result) {
    if (err) {
      res.status(500).send(err)
      throw err;
    } 
    console.log("resultado: ", result[0]);
    res.send(result[0])
  });
})

app.listen(process.env.PORT ? process.env.PORT : localPort, () => {
  console.log(`Example app listening on port ${process.env.PORT ? process.env.PORT : localPort}`)
})