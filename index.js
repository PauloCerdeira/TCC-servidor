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

setInterval(() => {
  con.query( `INSERT INTO Consumos (voltagem, corrente, potencia, dataHora) VALUES (${randomInteger(110, 440)} , ${randomInteger(10, 150)} , ${randomInteger(200, 500)}, "${dateDb(new Date)}")`)
}, 2500);

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
  con.query("SELECT * FROM Consumos ORDER BY id DESC LIMIT 1", function (err, result) {
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


function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function dateDb(date) {
  date.setHours(date.getHours() - 3)
  return date.getUTCFullYear() + '-' +
    ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
    ('00' + date.getUTCDate()).slice(-2) + ' ' + 
    ('00' + date.getUTCHours()).slice(-2) + ':' + 
    ('00' + date.getUTCMinutes()).slice(-2) + ':' + 
    ('00' + date.getUTCSeconds()).slice(-2);
}