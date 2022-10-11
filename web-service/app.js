const express = require('express')
const { placesGET } = require("./modules/places/get")
const { placesPOST } = require("./modules/places/post")
const cors = require('cors');
const app = express()
const port = 3100

app.use(cors({
  origin: `*`,
}))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/places', placesGET)

app.post('/places', placesPOST)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
