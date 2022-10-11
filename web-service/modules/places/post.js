const { Client } = require("pg")
const { connectionSettings } = require("../../shared/configs")

const placesPOST = (objekRequest, objekResponse) => {

  const client = new Client(connectionSettings)

  const insertedData = {
    test: "yoi"
  }

  client.connect(err => {
    if(err) throw err
    console.log("Connected !") 
  })

  client.query(`
    INSERT INTO jabar.pariwisata(nama_tempat, kategori, koordinat)
    VALUES('Paris Van Java', 4, ST_GeomFromText('POINT(107.6191 6.9175)', 4326));
    `, (erornyaDatabase, hasilDariDatabase) => {

    objekResponse.json({
      data: insertedData,
    })  
  })

  
}

exports.placesPOST = placesPOST
