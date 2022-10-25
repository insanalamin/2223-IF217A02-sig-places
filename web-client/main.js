import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';

const kecKV = {
  '3204120': {
    pendidikan: 12.4,
    kesehatan: 30.4,
    kemiskinan: 8.4
  },
}

const placesGeoJSON = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [107.7177, -6.9254]
      },
      "properties": {
        "name": "UIN Sunan Gunung Djati",
        "address": "Jalan AH Nasution"
      },
    },
{
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [107.7277, -6.9254]
      },
      "properties": {
        "name": "Apotik",
        "address": "Jalan AH Nasution"
      },
    }
  ] 
}

let placesLayer = new VectorLayer({
  source: new VectorSource({
    features: new GeoJSON().readFeatures(placesGeoJSON),
  })
});

fetch("http://localhost:3100/places?format=geojson").then(
  (response) => {
    return response.json()
  }
).then(
  (jsonResponse) => {

    console.log("jsonResponse nya", jsonResponse)
    placesLayer.setSource(
      new VectorSource({
        features: new GeoJSON().readFeatures(jsonResponse),
      })
    )
  }
)

const thematicLayerStyle = (feature) => {
  const idKec = feature.get('IDKEC')

  console.log(idKec.toString().substring(4, 6))

  const color = idKec.toString().substring(4, 6) == '12' ? `#00ff0099` : `#ff000099`

  const style1 = new Style({
    fill: new Fill({
      color: color,
    }),
    stroke: new Stroke({
      color: `#ffffffdd`,
      width: 2,
    }),
  })

  return style1
}

const thematicLayer = new VectorLayer({
  source: new VectorSource({
  style: thematicLayerStyle,
    // features: new GeoJSON().readFeatures(placesGeoJSON),
  })
})

fetch("http://localhost:5173/bataskecjabar.geojson").then(
  (response) => {
    return response.json()
  }
).then(
  (jsonResponse) => {

    thematicLayer.setSource(
      new VectorSource({
        features: new GeoJSON().readFeatures(jsonResponse),
      })
    )

    thematicLayer.setStyle(thematicLayerStyle)

  }
)

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new XYZ({
        url: `https://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}`
      })
    }),
    // new TileLayer({
    //   source: new OSM(),
    // }),
    thematicLayer,
    placesLayer,
  ],
  view: new View({
    projection: `EPSG:4326`,
    center: [107.7177, -6.9254],
    zoom: 13, 
  })
});
