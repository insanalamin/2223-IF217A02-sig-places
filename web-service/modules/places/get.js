const { Client } = require("pg")
const { connectionSettings } = require("../../shared/configs")

const placesGET = (objekRequest, objekResponse) => {

  const type = objekRequest.query['format']

  const client = new Client(connectionSettings)

  client.connect(err => {
    if(err) throw err
    console.log("Connected !") 
  })

  if(type !== 'geojson') {

    client.query(`SELECT
      id_tempat,
      nama_tempat,
      kategori
    FROM 
      jabar.pariwisata
      `, (erornyaDatabase, hasilDariDatabase) => {

      objekResponse.json({
        data: hasilDariDatabase.rows,
      })  
    })

  } else {

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

      objekResponse.json(hasilDariDatabase.rows[0]['jsonb_build_object'])  
    })
  }

  
}

exports.placesGET = placesGET
