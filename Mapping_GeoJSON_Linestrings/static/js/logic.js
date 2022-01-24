// Testing to see if we are up and running!
console.log('working!');

// Creating a map object with a center and zoom level.
//let map = L.map('mapid').setView([30, 30], 2);


// Add GeoJSON data.
let torontoData = 'https://raw.githubusercontent.com/StickySitch/Mapping_Earthquakes/main/torontoRoutes.json';



// Adding tileLayer
// We create the tile layer that will be the background of our map.
let day = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-guidance-day-v4/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: apiKey
});

// We create the dark view tile layer that will be an option for our map.
let night = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-guidance-night-v4/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: apiKey
});

//Creating a base layer that holds both map types
let baseMaps = {
  'Day Navigation': day,
  'Night Navigation': night
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [44.0, -80.0],
  zoom: 2,
  layers: [night]
})

let myStyle = {
  color: 'yellow',
  weight: 2
}

// Grabbing our GeoJSON data and adding it to the map.
d3.json(torontoData).then(function(data) {

  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
    style: myStyle,
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<h3>" + "Airline: " + feature.properties.airline + "</h3>" + '<hr class="solid">' + "<strong>" + "Destination: " + feature.properties.dst + "</strong>");
    }
  }).addTo(map);
});

L.control.layers(baseMaps).addTo(map);


