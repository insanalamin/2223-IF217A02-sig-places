const express = require('express')
const { Client } = require("pg")
const app = express()
const port = 3100

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/places', (objekRequest, objekResponse) => {

  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'uinsgd',
    port: 5444,
  })

  client.connect(err => {
    if(err) throw err
    console.log("Connected !") 
  })

  // client.query(`SELECT
  //   id_tempat,
  //   nama_tempat,
  //   kategori,
  //   ST_AsText(koordinat) as koordinat,
  //   ST_AsText(lahan) as lahan 
  // FROM 
  //   jabar.pariwisata
  //   `, (erornyaDatabase, hasilDariDatabase) => {

  //   objekResponse.json({
  //     data: hasilDariDatabase.rows,
  //   })  
  // })

  client.query(`
    SELECT JSONB_BUILD_OBJECT(
      'type', 'FeatureCollection',
      'features', JSON_AGG(features.feature)
    ) 
    FROM (
      SELECT row_to_json(inputs) As feature 
         FROM (SELECT 'Feature' As type 
         , ST_AsGeoJSON(l.lahan)::json As geometry 
         , row_to_json((SELECT l FROM (SELECT id_tempat, nama_tempat, kategori) As l)) As properties 
         FROM jabar.pariwisata As l WHERE l.lahan is not NULL) As inputs
    ) features
    `, (erornyaDatabase, hasilDariDatabase) => {

    objekResponse.json({
      data: hasilDariDatabase.rows[0],
    })  
  })
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
