// Testing to see if we are up and running!
console.log('working!');

// Creating a map object with a center and zoom level.
let map = L.map('mapid').setView([37.6213, -122.3790], 5);

let line = [
  [37.615223, -122.389977],
  [30.193489, -97.665010],
  [43.6777, -79.6248],
  [40.641766, -73.780968]
];

L.polyline(line, {
    color: "blue",
    weight: 4,
    dashArray: "5, 10",
    dashOffset: "0"
    
}).addTo(map);
// Adding tileLayer
// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: apiKey
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);
