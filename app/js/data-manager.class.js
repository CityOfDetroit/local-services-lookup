'use strict';
import "babel-polyfill";
import "isomorphic-fetch";
const moment = require('moment');
const turf = require('@turf/turf');
const arcGIS = require('terraformer-arcgis-parser');
const WKT = require('terraformer-wkt-parser');
export default class DataManager {
  constructor() {
    // -------------------------------------------------------------------------
    // NOTE: Current government officials and contact information.
    // -------------------------------------------------------------------------
    this.currentGovOfficials = {
      d1: {
        district: "District 1",
        districtURL: "http://theneighborhoods.org/districts/district-1",
        council:{
          name: 'James Tate',
          url: '/government/city-council/city-council-district-1',
          phone: '(313)224-1027'
        },
        dmanager:{
          name: 'Stephanie Young',
          url: '/departments/department-of-neighborhoods/district-1#block-views-block-contacts-special-block-1',
          phone: '(313)236-3473'
        },
        ddmanager: {
          name: 'Reggie Reg Davis',
          url: '/departments/department-of-neighborhoods/district-1#block-views-block-contacts-special-block-1',
          phone: '(313)236-3484'
        },
        enforcement: [{
          name: 'Edna Keys',
          email: 'KeysE@detroitmi.gov',
          phone: '(313)588-2137'
        }]
      },
      d2: {
        district: "District 2",
        districtURL: "http://theneighborhoods.org/districts/district-2",
        council:{
          name: 'Roy McCalister Jr.',
          url: '/government/city-council/city-council-district-2',
          phone: '(313)224-4535'
        },
        dmanager:{
          name: 'Kim Tandy',
          url: '/departments/department-of-neighborhoods/district-2#block-views-block-contacts-special-block-1',
          phone: '(313)236-3494'
        },
        ddmanager: {
          name: 'Sean Davis',
          url: '/departments/department-of-neighborhoods/district-2#block-views-block-contacts-special-block-1',
          phone: '(313)236-3489'
        },
        enforcement: [{
          name: 'Trish Williams',
          email: 'williamstr@detroitmi.gov',
          phone: '(313)938-1824'
        }]
      },
      d3: {
        district: "District 3",
        districtURL: "http://theneighborhoods.org/districts/district-3",
        council:{
          name: 'Scott Benson',
          url: '/government/city-council/city-council-district-3',
          phone: '(313)224-1198'
        },
        dmanager:{
          name: 'Erinn Harris',
          url: '/departments/department-of-neighborhoods/district-3#block-views-block-contacts-special-block-1',
          phone: '(313)236-3504'
        },
        ddmanager: {
          name: 'Ernest Johnson',
          url: '/departments/department-of-neighborhoods/district-3#block-views-block-contacts-special-block-1',
          phone: '(313)348-8464'
        },
        enforcement: [{
          name: 'Moncy Chacko',
          email: 'ChackoM@detroitmi.gov',
          phone: '(313)269-4145'
        }]
      },
      d4: {
        district: "District 4",
        districtURL: "http://theneighborhoods.org/districts/district-4",
        council:{
          name: 'André L. Spivey',
          url: '/government/city-council/city-council-district-4',
          phone: '(313)224-4841'
        },
        dmanager:{
          name: 'Letty Azar',
          url: '/departments/department-of-neighborhoods/district-4#block-views-block-contacts-special-block-1',
          phone: '(313)236-3518'
        },
        ddmanager: {
          name: 'Toson Knight',
          url: '/departments/department-of-neighborhoods/district-4#block-views-block-contacts-special-block-1',
          phone: '(313)236-3520'
        },
        enforcement: [{
          name: 'Donnie Wright',
          email: 'WrightDo@detroitmi.gov',
          phone: '(313)815-5542'
        },
        {
          name: 'Wesley Bush',
          email: 'BushW@detroitmi.gov',
          phone: '(313)820-0871'
        }
        ]
      },
      d5: {
        district: "District 5",
        districtURL: "http://theneighborhoods.org/districts/district-5",
        council:{
          name: 'Mary Sheffield',
          url: '/government/city-council/city-council-district-5',
          phone: '(313)224-4505'
        },
        dmanager:{
          name: 'Marshall Bullock',
          url: '/departments/department-of-neighborhoods/district-5#block-views-block-contacts-special-block-1',
          phone: '(313)236-3523'
        },
        ddmanager: {
          name: 'Kya Robertson',
          url: '/departments/department-of-neighborhoods/district-5#block-views-block-contacts-special-block-1',
          phone: '(313)236-3528'
        },
        enforcement: [
          {
            name: 'Michael Madrigal',
            email: 'MADRIGALM261@detroitmi.gov',
            phone: '(313)949-6468'
          }
        ]
      },
      d6: {
        district: "District 6",
        districtURL: "http://theneighborhoods.org/districts/district-6",
        council:{
          name: 'Raquel Castañeda-López',
          url: '/government/city-council/city-council-district-6',
          phone: '(313)224-2450'
        },
        dmanager:{
          name: 'Ninfa Cancel',
          url: '/departments/department-of-neighborhoods/district-6#block-views-block-contacts-special-block-1',
          phone: '(313)236-3530'
        },
        ddmanager: {
          name: 'Ammie Woodruff',
          url: '/departments/department-of-neighborhoods/district-6#block-views-block-contacts-special-block-1',
          phone: '(313)236-3529'
        },
        enforcement: [
          {
            name: 'Michael Addison',
            email: 'AddisonM@detroitmi.gov',
            phone: '(313)799-9225'
          },
          {
            name: 'Dorjan Samuel',
            email: 'samueld@detroitmi.gov',
            phone: '(313)319-1654'
          }
        ]
      },
      d7: {
        district: "District 7",
        districtURL: "http://theneighborhoods.org/districts/district-7",
        council:{
          name: 'Gabe Leland',
          url: '/government/city-council/city-council-district-7',
          phone: '(313)224-2151'
        },
        dmanager:{
          name: 'Ray Solomon II',
          url: '/departments/department-of-neighborhoods/district-7#block-views-block-contacts-special-block-1',
          phone: '(313)236-3516'
        },
        ddmanager: {
          name: 'Ammie Woodruff',
          url: '/departments/department-of-neighborhoods/district-7#block-views-block-contacts-special-block-1',
          phone: '(313)236-3540'
        },
        enforcement: [
          {
            name: 'Ernest Thompson',
            email: 'ThompsonEr@detroitmi.gov',
            phone: '(313)498-0796'
          },
          {
            name: 'Louis Smith',
            email: 'SmithL@detroitmi.gov',
            phone: '(313)948-5141'
          }
        ]
      }
    }
  }
  buildData(location, controller){
    let dataObj = {title: location.address};
    let simplePolygon = null;
    // -------------------------------------------------------------------------
    // NOTE: Fetching all the data sets.
    // -------------------------------------------------------------------------
    let council = new Promise((resolve, reject) => {
      let url = "https://services2.arcgis.com/qvkbeam7Wirps6zC/ArcGIS/rest/services/Council_Districts/FeatureServer/0/query?where=&objectIds=&time=&geometry=" + location.location.x + "%2C" + location.location.y + "&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=name&returnGeometry=false&returnCentroid=false&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=json&token=";
      return fetch(url)
      .then((resp) => resp.json()) // Transform the data into json
      .then(function(data) {
        let councilInfo = {"id": "council", "data": null};
        switch (data.features[0].attributes.Name) {
          case "District 1":
            councilInfo.data = controller.dataManager.currentGovOfficials.d1;
            break;
          case "District 2":
            councilInfo.data = controller.dataManager.currentGovOfficials.d2;
            break;
          case "District 3":
            councilInfo.data = controller.dataManager.currentGovOfficials.d3;
            break;
          case "District 4":
            councilInfo.data = controller.dataManager.currentGovOfficials.d4;
            break;
          case "District 5":
            councilInfo.data = controller.dataManager.currentGovOfficials.d5;
            break;
          case "District 6":
            councilInfo.data = controller.dataManager.currentGovOfficials.d6;
            break;
          case "District 7":
            councilInfo.data = controller.dataManager.currentGovOfficials.d7;
            break;
          default:

        }
        resolve(councilInfo);
      });
    });
    let neighborhoods = new Promise((resolve, reject) => {
      let url = "https://gis.detroitmi.gov/arcgis/rest/services/DoIT/Neighborhoods17/MapServer/1/query?where=&text=&objectIds=&time=&geometry=+" + location.location.x + "%2C" + location.location.y + "+&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=json";
      return fetch(url)
      .then((resp) => resp.json()) // Transform the data into json
      .then(function(data) {
        resolve({"id": "neighborhood", "data": data});
      });
    });
    let assessorsData = new Promise((resolve, reject) => {
      let url = "https://apis.detroitmi.gov/assessments/parcel/" + location.attributes.User_fld + "/";
      return fetch(url)
      .then((resp) => resp.json()) // Transform the data into json
      .then(function(data) {
        resolve({"id": "assessors-data", "data": data});
      });
    });
    let permitData = new Promise((resolve, reject) => {
      let url = "https://data.detroitmi.gov/resource/but4-ky7y.json?$query=SELECT * WHERE parcel_no='" + location.attributes.User_fld + "' ORDER BY permit_issued DESC LIMIT 2";
      return fetch(url)
      .then((resp) => resp.json()) // Transform the data into json
      .then(function(data) {
        resolve({"id": "permit-data", "data": data});
      });
    });
    let rentalData = new Promise((resolve, reject) => {
      let url = `https://data.detroitmi.gov/resource/vphr-kg52.geojson?$query=SELECT * WHERE parcelnum='${location.attributes.User_fld}'`;
      return fetch(url)
      .then((resp) => resp.json()) // Transform the data into json
      .then(function(data) {
        resolve({"id": "rental-data", "data": data});
      });
    });
    let rentalCertData = new Promise((resolve, reject) => {
      let url = `https://data.detroitmi.gov/resource/baxk-dxw9.geojson?$query=SELECT * WHERE parcelnum='${location.attributes.User_fld}'`;
      return fetch(url)
      .then((resp) => resp.json()) // Transform the data into json
      .then(function(data) {
        resolve({"id": "rental-cert-data", "data": data});
      });
    });
    let blightData = new Promise((resolve, reject) => {
      let url = "https://data.detroitmi.gov/resource/s7hj-n86v.json?$query=SELECT * WHERE parcelno='" + location.attributes.User_fld + "' ORDER BY violation_date DESC LIMIT 2";
      return fetch(url)
      .then((resp) => resp.json()) // Transform the data into json
      .then(function(data) {
        resolve({"id": "blight-data", "data": data});
      });
    });
    let salesHistoryData = new Promise((resolve, reject) => {
      let url = "https://data.detroitmi.gov/resource/9xku-658c.json?$query=SELECT * WHERE parcel_no='" + location.attributes.User_fld + "' ORDER BY sale_date DESC LIMIT 1";
      return fetch(url)
      .then((resp) => resp.json()) // Transform the data into json
      .then(function(data) {
        resolve({"id": "sales-data", "data": data});
      });
    });
    let demosData = new Promise((resolve, reject) => {
      let point = turf.point([location.location.x, location.location.y]);
      let buffer = turf.buffer(point, 1, {units: 'miles'});
      let simplePolygon = turf.simplify(buffer.geometry, {tolerance: 0.005, highQuality: false});
      let socrataPolygon = WKT.convert(simplePolygon);
      let url = `https://data.detroitmi.gov/resource/nfx3-ihbp.json?$query=SELECT * WHERE demolish_by_date between '${controller.defaultSettings.startDate}' AND '${controller.defaultSettings.endDate}' AND parcel_id <> '${location.attributes.User_fld}' AND within_polygon(location,${JSON.stringify(socrataPolygon)}) ORDER BY demolish_by_date ASC LIMIT 3`;
      return fetch(url)
      .then((resp) => resp.json()) // Transform the data into json
      .then(function(data) {
        resolve({"id": "demos-data", "data": data});
      });
    });
    let demoStatus = new Promise((resolve, reject) => {
      let url = "https://data.detroitmi.gov/resource/nfx3-ihbp.json?$query=SELECT * WHERE parcel_id='" + location.attributes.User_fld + "' ORDER BY demolish_by_date DESC LIMIT 1";
      return fetch(url)
      .then((resp) => resp.json()) // Transform the data into json
      .then(function(data) {
        resolve({"id": "demo-status", "data": data});
      });
    });
    let pSchools = new Promise((resolve, reject) => {
      let point = turf.point([location.location.x, location.location.y]);
      let buffer = turf.buffer(point, 1, {units: 'miles'});
      let simplePolygon = turf.simplify(buffer.geometry, {tolerance: 0.005, highQuality: false});
      let arcsimplePolygon = arcGIS.convert(simplePolygon);
      let url = "https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/Schools2017/FeatureServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry="+ encodeURI(JSON.stringify(arcsimplePolygon))+"&geometryType=esriGeometryPolygon&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=json";
      return fetch(url)
      .then((resp) => resp.json()) // Transform the data into json
      .then(function(data) {
        resolve({"id" : "schools", "data": data});
      });
    });
    let npo = new Promise((resolve, reject) => {
      let url = "https://services2.arcgis.com/qvkbeam7Wirps6zC/ArcGIS/rest/services/Neighborhood_Police_Officers/FeatureServer/0/query?where=&objectIds=&time=&geometry=" + location.location.x + "%2C" + location.location.y + "&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&returnCentroid=false&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=4326&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=json&token=";
      return fetch(url)
      .then((resp) => resp.json()) // Transform the data into json
      .then(function(data) {
        resolve({"id" : "npo", "data": data});
      });
    });
    let improveDet = new Promise((resolve, reject) => {
      let point = turf.point([location.location.x, location.location.y]);
      let buffer = turf.buffer(point, 300, {units: 'meters'});
      let simplePolygon = turf.simplify(buffer.geometry, {tolerance: 0.005, highQuality: false});
      let socrataPolygon = WKT.convert(simplePolygon);
      let url = "https://data.detroitmi.gov/resource/a9kb-mhiu.json?$query=SELECT * WHERE status NOT IN ('Closed','Archived')  AND within_polygon(location,"+ JSON.stringify(socrataPolygon) + ") LIMIT 3";
      return fetch(url)
      .then((resp) => resp.json()) // Transform the data into json
      .then(function(data) {
        resolve({"id": "improve-det", "data": data});
      });
    });
    let recycling = new Promise((resolve, reject) => {
      let url = "https://gis.detroitmi.gov/arcgis/rest/services/DPW/All_Services/MapServer/0/query?where=&text=&objectIds=&time=&geometry=" + location.location.x + "%2C+" + location.location.y + "&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelWithin&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=json";
      fetch(url)
      .then((resp) => resp.json()) // Transform the data into json
      .then(function(data) {
        let todaysMonth =  moment().month() + 1;
        let todaysYear = moment().year();
        let url = null;
        (data.features.length > 1) ? url = 'https://apis.detroitmi.gov/waste_schedule/details/' + data.features[0].attributes.FID + ',' + data.features[1].attributes.FID + ',' + data.features[2].attributes.FID + '/year/' + todaysYear + '/month/' + todaysMonth + '/' : url = 'https://apis.detroitmi.gov/waste_schedule/details/' + data.features[0].attributes.FID  + '/year/' + todaysYear + '/month/' + todaysMonth + '/';
        return fetch(url)
        .then((resp) => resp.json()) // Transform the data into json
        .then(function(data) {
          resolve({"id": "recycling", "data": data});
        });
      });
    });

    Promise.all([council,neighborhoods,assessorsData,permitData,blightData,salesHistoryData,demosData,npo,improveDet,recycling,rentalData,rentalCertData,demoStatus]).then(values => {
        let dataSets = [];
        let initalLoadInfo = {};
        let initialLoadChecker = true;
        values.forEach(function(value) {
          if(value != null) {
            dataSets.push(value);
            initalLoadInfo[value.id] = value.data;
          }else{
            initialLoadChecker = false;
          }
        });
        dataObj.dataSets = dataSets;
        controller.panel.creatPanel(dataObj, controller);
    }).catch(reason => {
      console.log(reason);
    });
  }
}
