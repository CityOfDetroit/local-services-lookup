'use strict';
import Map from './map.class.js';
import JSUtilities from './utilities.class.js';
import Panel from './panel.class.js';
import DataManager from './data-manager.class.js';
import mapboxgl from 'mapbox-gl';
const turf = require('@turf/turf');
const moment = require('moment');
const GeoJSON = require('geojson');
export default class Controller {
  constructor(map, router) {
    this.defaultSettings = {department: 'All'};
    this.panel = new Panel();
    this.dataManager = new DataManager();
    this.map = new Map(map, this);
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
      // console.log(controller.defaultSettings);
      let boundaries = 'city';
      let dataList = '';
      let polygon = '';
      controller.map.currentState.layers.forEach(function(layer){
        (JSUtilities.inArray(controller.dataSouresInfo.boundaries, layer.id)) ? boundaries += layer.id : 0;
        (JSUtilities.inArray(controller.dataSouresInfo.dataSets, layer.id)) ? dataList += layer.id + ',' : 0;
      });
    });
  }
  createPanelData(view, controller){
    console.log(view);
    // console.log(controller);
    switch (view) {
      case 'DASH':
        document.getElementById('initial-loader-overlay').className = 'active';
        // console.log('creating stats data');
        controller.activeLayers.forEach(function(layer){
          if(layer != 'parcel-fill'){
            controller.layerAddRemove(layer, "remove", controller);
            let tempCheckbox = document.getElementById(layer);
            if(tempCheckbox != null){
              tempCheckbox.checked = false;
              tempCheckbox.parentElement.className = "";
            }
          }
        });
        let tempCheckboxList = document.querySelectorAll('input[name="datasets"]');
        tempCheckboxList.forEach(function(box){
          box.disabled = false;
        });
        document.getElementById('map-data-panel').className = "";
        document.getElementById('map-side-panel').className = "";
        document.getElementById('map-side-panel-small').className = "";
        controller.dataManager.createViewData(controller.router.getQueryVariable('boundary'), controller.router.getQueryVariable('dataSets'), controller.router.getQueryVariable('polygon'), controller, view);
        document.getElementById('menu').checked = true;
        break;
      case 'MAP':
        (document.getElementById('menu').checked) ? document.getElementById('menu').checked = false : document.getElementById('menu').checked = true;
        break;
      case 'PROPERTY':
        document.getElementById('initial-loader-overlay').className = 'active';
        // console.log('creating stats data');
        controller.activeLayers.forEach(function(layer){
          if(layer != 'parcel-fill'){
            controller.layerAddRemove(layer, "remove", controller);
            let tempCheckbox = document.getElementById(layer);
            if(tempCheckbox != null){
              tempCheckbox.checked = false;
              tempCheckbox.parentElement.className = "";
            }
          }
        });
        document.getElementById('map-data-panel').className = "";
        document.getElementById('map-side-panel').className = "";
        document.getElementById('map-side-panel-small').className = "";
        controller.dashboard.loadPropertyView(controller);
        document.getElementById('menu').checked = true;
        break;
      case 'FILTERS':
        // console.log('creating layers data');
        const layerURL = 'js/layers.json';
        fetch(layerURL)
        .then((resp) => resp.json()) // Transform the data into json
        .then(function(data) {
          // console.log(data);
          let dataObj = {title: "FILTERS", data: data};
          controller.dashboard.createView(view, dataObj, controller);
        })
        break;
      case 'TOOLS':
        // console.log('creating tools data');
        let dataObj = {title: "TOOLS", boarded: null, needBoarding: null};
        controller.dashboard.createView(view, dataObj, controller);
        break;
      case 'SET':
        // console.log('creating settings data');
        dataObj = {title: "SETTINGS", boarded: null, needBoarding: null};
        controller.dashboard.createView(view, dataObj, controller);
        break;
      case 'FORM':
        dataObj = {title: "FORM", boarded: null, needBoarding: null};
        // console.log('creating forms data');
        controller.dashboard.createView(view, dataObj, controller);
        break;
      default:
        console.log('invalid view reverting back');
    }
  }
  geocoderResults(e, controller){
    let tempAddr = e.result.place_name.split(",");
    tempAddr = tempAddr[0];
    tempAddr = tempAddr.split(" ");
    let newTempAddr = '';
    let size = tempAddr.length;
    tempAddr.forEach(function(item, index) {
      newTempAddr += item;
      ((index < size) && (index + 1) !== size) ? newTempAddr += '+': 0;
    });
    // console.log(newTempAddr);
    let url = "https://gis.detroitmi.gov/arcgis/rest/services/DoIT/CompositeGeocoder/GeocodeServer/findAddressCandidates?Street=&City=&ZIP=&SingleLine=" + newTempAddr + "&category=&outFields=User_fld&maxLocations=&outSR=4326&searchExtent=&location=&distance=&magicKey=&f=json";
    fetch(url)
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) {
      // console.log(data);
      if(data.candidates.length){
        if(data.candidates[0].attributes.User_fld != ""){
          // console.log('parcel found');
          controller.dataManager.buildData(data.candidates[0], controller);
          // controller.panel.creatPanel("parcel", data.candidates[0].attributes.User_fld, controller);
        }else{
          // console.log("no parcel found");
        }
      }else{
        // console.log("no parcel found");
      }
    });
  }
  closeAlert(ev){
    (ev.target.parentNode.parentNode.id === 'alert-overlay') ? document.getElementById('alert-overlay').className = '': document.getElementById('drill-down-overlay').className = '';
  }
}
