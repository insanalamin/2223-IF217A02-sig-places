import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import GeoJSON from 'ol/format/GeoJSON';

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

fetch("http://localhost:3100/places").then(
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

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new XYZ({
        url: `https://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}`
      })
    }),
    new TileLayer({
      source: new OSM(),
    }),
    placesLayer,
  ],
  view: new View({
    projection: `EPSG:4326`,
    center: [107.7177, -6.9254],
    zoom: 13, 
  })
});
