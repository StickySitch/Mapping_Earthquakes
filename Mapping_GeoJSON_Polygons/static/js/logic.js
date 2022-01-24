// Testing to see if we are up and running!
console.log('working!');

// Creating a map object with a center and zoom level.
//let map = L.map('mapid').setView([30, 30], 2);


// Add GeoJSON data.
let torontoHoods = 'https://raw.githubusercontent.com/StickySitch/Mapping_Earthquakes/main/torontoNeighborhoods.json';



// Adding tileLayer
// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: apiKey
});

// We create the dark view tile layer that will be an option for our map.
let satStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: apiKey
});

//Creating a base layer that holds both map types
let baseMaps = {
  'Street Navigation': streets,
  'Satellite Streets Navigation': satStreets
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [43.7, -79.3],
  zoom: 11,
  layers: [streets]
})

let myStyle = {
  color: 'blue',
  fillColor: 'yellow',
  weight: 1
}

// Grabbing our GeoJSON data and adding it to the map.
d3.json(torontoHoods).then(function(data) {

  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
    style: myStyle,
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<h3>" + "Neighborhood: " + feature.properties.AREA_NAME + "</h3>");
    }
  }).addTo(map);
});

L.control.layers(baseMaps).addTo(map);


