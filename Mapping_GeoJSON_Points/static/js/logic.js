// Testing to see if we are up and running!
console.log('working!');

// Creating a map object with a center and zoom level.
//let map = L.map('mapid').setView([30, 30], 2);


// Add GeoJSON data.
let airportData = 'https://raw.githubusercontent.com/StickySitch/Mapping_Earthquakes/main/majorAirports.json';





// Adding tileLayer
// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: apiKey
});

// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: apiKey
});

//Creating a base layer that holds both map types
let baseMaps = {
  Street: streets,
  Dark: dark
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [30, 30],
  zoom: 2,
  layers: [streets]
})

// Grabbing our GeoJSON data and adding it to the map.
d3.json(airportData).then(function(data) {

  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<h3>" + "Airport Code: " + feature.properties.faa + "</h3>" + '<hr class="solid">' + "<strong>" + "Airport Name: " + feature.properties.name + "</strong>");
    }
  }).addTo(map);
  

  
  
});

L.control.layers(baseMaps).addTo(map);


