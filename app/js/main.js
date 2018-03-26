'use strict';
import Controller from './controller.class.js';
(function(){
  const dataURL = 'js/layers.json';
  let controller = null;
  fetch(dataURL).then(function(response) {
    var contentType = response.headers.get("content-type");
    if(contentType && contentType.includes("application/json")) {
      return response.json();
    }
    throw new TypeError("Oops, we haven't got JSON!");
  })
  .then(function(json) {
    console.log(json);
    controller = new Controller({
      styleURL: 'mapbox://styles/mapbox',
      mapContainer: 'map',
      geocoder: true,
      controls: true,
      draw: true,
      baseLayers: {
        street: 'streets-v10',
        satellite: 'cj774gftq3bwr2so2y6nqzvz4'
      },
      center: [-83.10, 42.36],
      zoom: 10.75,
      boundaries: {
        sw: [-83.3437,42.2102],
        ne: [-82.8754,42.5197]
      },
      sources: [],
      layers: []
    },{
      lat: 0,
      lng: 0,
      zoom: 0,
      boundary: '',
      dataSets: '',
      polygon: ''
    },
    json,
    ["#feebe2","#fbb4b9","#f768a1","#c51b8a","#7a0177"]);
  })
  .catch(function(error) { console.log(error); });
})(window);
