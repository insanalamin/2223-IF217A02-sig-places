const { Client } = require("pg")
const { connectionSettings } = require("../../shared/configs")

const placesPOST = (objekRequest, objekResponse) => {

  // Ambil objek body dari POST nya
  const requestBody = objekRequest.body
  console.log("requestBody", requestBody)

  const client = new Client(connectionSettings)

  client.connect(err => {
    if(err) throw err
    console.log("Connected !") 
  })

  client.query(
    `
      INSERT INTO jabar.pariwisata(nama_tempat, kategori, koordinat, lahan, jalur)
      VALUES($1, $2, ST_GeomFromText($3, 4326), ST_GeomFromText($4, 4326), ST_GeomFromText($5, 4326));
    `, 
    [
      requestBody['nama_tempat'],
      requestBody['kategori'],
      requestBody['koordinat'],
      requestBody['lahan'],
      requestBody['jalur'],
    ],
    (erornyaDatabase, hasilDariDatabase) => {
      objekResponse.json(objekRequest.body)  
    },
  )

  
}

exports.placesPOST = placesPOST
