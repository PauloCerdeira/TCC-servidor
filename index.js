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
  if (
    req.query.potencia == undefined ||
    req.query.voltagem == undefined ||
    req.query.corrente == undefined
  ) {
    console.log("parametros indefinidos");
    res.status(200).send("Registro não inserido, parametros ausentes");
  } else {
    con.query(
      `INSERT INTO Consumos (voltagem, corrente, potencia, dataHora) VALUES (${req.query.voltagem} , ${req.query.corrente} , ${req.query.potencia}, "${dataHora}")`
    );
    res.status(200).send("Registro inserido!");
  }
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
      console.log("new date com datedb:  ", dateDb(new Date()));
      console.log("data hora:  ", result[0].dataHora);
      if (new Date(dateDb(new Date())).getTime() - result[0].dataHora.getTime() > 20000) {
        console.log("Nenhum valor atualizado presente");
        res.send({
          voltagem: 0,
          corrente: 0,
          potencia: 0,
          desatualizado: true,
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
  console.log("dataInicial: ", req.query.dataInicial);
  console.log("datafinal: ", req.query.dataFinal);
  if (!req.query.dataInicial || !req.query.dataFinal) {
    res.send("Parametros invalidos");
  } else {
    con.query(
      `SELECT * FROM Consumos WHERE dataHora BETWEEN "${req.query.dataInicial}" AND "${req.query.dataFinal}"`,
      function (err, result) {
        if (err) {
          res.status(500).send(err);
          throw err;
        }
        if (result.length == 0) {
          res.send([{ vazio: true }]);
        } else {
          let potenciaSeries = { name: "Potencia", data: [] };
          let voltagemSeries = { name: "Voltagem", data: [] };
          let correnteSeries = { name: "Corrente", data: [] };

          for (let registro of result) {
            //local apenas
            // registro.dataHora.setHours(registro.dataHora.getHours() - 3)
            //local apenas
            let registroTime =  registro.dataHora.getTime()
            potenciaSeries.data.push([ registroTime, registro.potencia])
            voltagemSeries.data.push([ registroTime, registro.voltagem])
            correnteSeries.data.push([ registroTime, registro.corrente])
          }

          res.send([potenciaSeries, voltagemSeries, correnteSeries]);
        }
      }
    );
  }
});

app.listen(process.env.PORT ? process.env.PORT : localPort, () => {
  console.log(
    `Example app listening on port ${
      process.env.PORT ? process.env.PORT : localPort
    }`
  );
});
