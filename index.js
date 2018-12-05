'use strict';
import Controller from './js/controller.class';
(function(){
  let controller = new Controller({
    styleURL: 'mapbox://styles/mapbox',
    mapContainer: 'map',
    geocoder: false,
    controls: false,
    draw: false,
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
  });
  document.getElementById('close-services-btn').addEventListener('click', function(){
    document.getElementById('local-services-results').className = '';
  });
})(window);
