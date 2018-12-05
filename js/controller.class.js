'use strict';
import Map from './map.class.js';
import Panel from './panel.class.js';
import DataManager from './data-manager.class.js';
import Geocoder from './geocoder.class.js';
import mapboxgl from 'mapbox-gl';
const turf = require('@turf/turf');
const moment = require('moment');
export default class Controller {
  constructor(map, router) {
    this.defaultSettings = {department: 'All'};
    this.panel = new Panel();
    this.dataManager = new DataManager();
    this.map = new Map(map, this);
    this.geocoder = new Geocoder('geocoder', this);
    this.initialLoad(this);
  }
  initialLoad(controller){
    let url = "https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/City_of_Detroit_Boundaries/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&returnCentroid=false&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=4326&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=geojson&token=";
    fetch(url)
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) {
      controller.cityPolygon = data.features[0];
      controller.defaultSettings.startDate = moment().format('YYYY-MM-DD');
      controller.defaultSettings.endDate = moment().add(5,'months').format('YYYY-MM-DD');
    });
  }

  checkParcelValid(parcel){
    return /\d/.test(parcel);
  }

  closeAlert(ev){
    (ev.target.parentNode.parentNode.id === 'alert-overlay') ? document.getElementById('alert-overlay').className = '': document.getElementById('drill-down-overlay').className = '';
  }
}