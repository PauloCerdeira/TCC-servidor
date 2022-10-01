const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send('TEste!')
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})