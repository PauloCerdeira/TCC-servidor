const { randomInteger, dateDb } = require("./utils/utils.js");
const { con } = require("./db/db.js");
const express = require("express");
const app = express();
const localPort = 3000;
//URL SERVIDOR: https://tcc-servidor.rj.r.appspot.com/

// SIMULAR PROTOTIPO ENVIANDO INFO
// setInterval(() => {
//   con.query(
//     `INSERT INTO Consumos (voltagem, corrente, potencia, dataHora) VALUES (${randomInteger(
//       110,
//       440
//     )} , ${randomInteger(10, 150)} , ${randomInteger(200, 500)}, "${dateDb(
//       new Date()
//     )}")`
//   );
//   console.log("Simulador inseriu Registro");
// }, 15000);
// SIMULAR PROTOTIPO ENVIANDO INFO

app.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send("Servidor Online!");
});

app.get("/consumo", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  let dataHora = dateDb(new Date());
  console.log("\nPOTENCIA: ", req.query.potencia);
  console.log("VOLTAGEM: ", req.query.voltagem);
  console.log("CORRENTE: ", req.query.corrente);
  console.log("DATAHORA: ", dataHora);
  con.query(
    `INSERT INTO Consumos (voltagem, corrente, potencia, dataHora) VALUES (${req.query.voltagem} , ${req.query.corrente} , ${req.query.potencia}, "${dataHora}")`
  );
  res.send("Registro inserido!");
});

app.get("/tempoReal", (req, res) => {
  //Envia o ultimo registro de consumo recente
  res.header("Access-Control-Allow-Origin", "*");
  con.query(
    "SELECT * FROM Consumos ORDER BY id DESC LIMIT 1",
    function (err, result) {
      if (err) {
        res.status(500).send(err);
        throw err;
      }
      if (new Date().getTime() - result[0].dataHora.getTime() > 20000) {
        console.log("Nenhum valor atualizado presente");
        res.send({
          voltagem: 0,
          corrente: 0,
          potencia: 0,
          desatualizado: true
        });
      } else {
        result[0].dataHora = dateDb(result[0].dataHora);
        console.log(result[0]);
        res.send(result[0]);
      }
    }
  );
});

app.get("/periodo", (req, res) => {
  //Envia o consumo por periodo
  res.header("Access-Control-Allow-Origin", "*");
  res.send("periodo");
});

app.listen(process.env.PORT ? process.env.PORT : localPort, () => {
  console.log(
    `Example app listening on port ${
      process.env.PORT ? process.env.PORT : localPort
    }`
  );
});
