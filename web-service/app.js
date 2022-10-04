const express = require('express')
const { Client } = require("pg")
const app = express()
const port = 3100

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'uinsgd',
  port: 5444,
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/places', (objekRequest, objekResponse) => {

  client.connect(err => {
    if(err) throw err
    console.log("Connected !") 
  })

  client.query(`SELECT
    id_tempat,
    nama_tempat,
    kategori,
    ST_AsText(koordinat) as koordinat,
    ST_AsText(lahan) as lahan 
  FROM 
    jabar.pariwisata
    `, (erornyaDatabase, hasilDariDatabase) => {

    objekResponse.json({
      data: hasilDariDatabase.rows,
    })  
  })
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
