// Testing to see if we are up and running!
console.log('working!');

// Creating a map object with a center and zoom level.
let map = L.map('mapid').setView([34.0522, -118.2437], 4);

// getting data from cities
let cityData = cities;

// Looping through City Array
cityData.forEach(function(city) {
    console.log(city)
    L.circleMarker(city.location, {
        radius: city.population/200000,
        color: 'orange',
        weight: 4
    })
    .bindPopup('<h2>' + city.city + ", " + city.state + '</h2> <hr> <h3>Population ' + city.population.toLocaleString() + '</h3>')
    .addTo(map)
});


// Adding tileLayer
// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: apiKey
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);
