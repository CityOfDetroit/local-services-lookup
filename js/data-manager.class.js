'use strict';
const moment = require('moment');
const turf = require('@turf/turf');
const arcGIS = require('terraformer-arcgis-parser');
export default class DataManager {
  constructor() {}
  
  buildData(location, controller){
    // -------------------------------------------------------------------------
    // NOTE: Fetching all the data sets.
    // -------------------------------------------------------------------------
    let council = new Promise((resolve, reject) => {

      let url = "https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/CouncilDistricts/FeatureServer/0/query?where=&objectIds=&time=&geometry=" + location.location.x + "%2C" + location.location.y + "&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=name&returnGeometry=false&returnCentroid=false&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=json&token=";
      // console.log(url);
      return fetch(url)
      .then((resp) => resp.json()) // Transform the data into json
      .then(function(data) {
        let councilInfo = {"id": "council", "data": null};
        // console.log(data);
        switch (data.features[0].attributes.Name) {
          case "District 1":
            councilInfo.data = 1;
            break;
          case "District 2":
            councilInfo.data = 2;
            break;
          case "District 3":
            councilInfo.data = 3;
            break;
          case "District 4":
            councilInfo.data = 4;
            break;
          case "District 5":
            councilInfo.data = 5;
            break;
          case "District 6":
            councilInfo.data = 6;
            break;
          case "District 7":
            councilInfo.data = 7;
            break;
          default:

        }
        resolve(councilInfo);
      }).catch( err => {
        // console.log(err);
      });
    });
    let districtManagers = new Promise((resolve, reject) => {
      let url = "/rest/district-managers?_format=json";
      return fetch(url)
      .then((resp) => resp.json()) // Transform the data into json
      .then(function(data) {
        resolve({"id": "districtManagers", "data": data});
      }).catch( err => {
        // console.log(err);
      });
    });
    let districtInspectors = new Promise((resolve, reject) => {
      let url = "/rest/district-inspectors?_format=json";
      return fetch(url)
      .then((resp) => resp.json()) // Transform the data into json
      .then(function(data) {
        resolve({"id": "districtInspectors", "data": data});
      }).catch( err => {
        // console.log(err);
      });
    });
    let councilMembers = new Promise((resolve, reject) => {
      let url = "/rest/council-members?_format=json";
      return fetch(url)
      .then((resp) => resp.json()) // Transform the data into json
      .then(function(data) {
        resolve({"id": "councilMembers", "data": data});
      }).catch( err => {
        // console.log(err);
      });
    });
    let neighborhoods = new Promise((resolve, reject) => {
      let url = "https://gis.detroitmi.gov/arcgis/rest/services/DoIT/Neighborhoods17/MapServer/1/query?where=&text=&objectIds=&time=&geometry=+" + location.location.x + "%2C" + location.location.y + "+&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=json";
      return fetch(url)
      .then((resp) => resp.json()) // Transform the data into json
      .then(function(data) {
        resolve({"id": "neighborhood", "data": data});
      }).catch( err => {
        // console.log(err);
      });
    });
    let assessorsData = new Promise((resolve, reject) => {
      let url = "https://apis.detroitmi.gov/assessments/parcel/" + location.attributes.User_fld + "/";
      return fetch(url)
      .then((resp) => resp.json()) // Transform the data into json
      .then(function(data) {
        resolve({"id": "assessors-data", "data": data});
      }).catch( err => {
        // console.log(err);
      });
    });
    let permitData = new Promise((resolve, reject) => {
      let url = `https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/building_permits_dev/FeatureServer/0/query?where=parcel_number%3D%27${location.attributes.User_fld}%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=4326&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=permit_issue_date&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=2&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=json&token=`;
      return fetch(url)
      .then((resp) => resp.json()) // Transform the data into json
      .then(function(data) {
        resolve({"id": "permit-data", "data": data});
      }).catch( err => {
        // console.log(err);
      });
    });
    let rentalData = new Promise((resolve, reject) => {
      let url = `https://gis.detroitmi.gov/arcgis/rest/services/OpenData/RentalStatuses/FeatureServer/0/query?where=parcel_id+%3D+%27${location.attributes.User_fld}%27+and+date+<>+null&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=json&token=`;
      return fetch(url)
      .then((resp) => resp.json()) // Transform the data into json
      .then(function(data) {
        resolve({"id": "rental-data", "data": data});
      }).catch( err => {
        // console.log(err);
      });
    });
    let rentalCertData = new Promise((resolve, reject) => {
      let url = `https://gis.detroitmi.gov/arcgis/rest/services/OpenData/ResidentialInspections/FeatureServer/0/query?where=parcel_id+%3D+%27${location.attributes.User_fld}%27+and+date+<>+null+and+result+%3D+%27OK%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=json&token=`;
      return fetch(url)
      .then((resp) => resp.json()) // Transform the data into json
      .then(function(data) {
        resolve({"id": "rental-cert-data", "data": data});
      }).catch( err => {
        // console.log(err);
      });
    });
    let blightData = new Promise((resolve, reject) => {
      let url = `https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/Blight_Violations_(DAH)/FeatureServer/0/query?where=parcelno%3D%27${location.attributes.User_fld}%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=violation_date&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=2&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=json&token=`;
      return fetch(url)
      .then((resp) => resp.json()) // Transform the data into json
      .then(function(data) {
        resolve({"id": "blight-data", "data": data});
      }).catch( err => {
        // console.log(err);
      });
    });
    let salesHistoryData = new Promise((resolve, reject) => {
      let url = `https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/Property_Sales/FeatureServer/0/query?where=PARCEL_NO%3D%27${location.attributes.User_fld}%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=4326&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=SALE_DATE&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=2&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=json&token=`;
      return fetch(url)
      .then((resp) => resp.json()) // Transform the data into json
      .then(function(data) {
        resolve({"id": "sales-data", "data": data});
      }).catch( err => {
        // console.log(err);
      });
    });
    let demosData = new Promise((resolve, reject) => {
      let point = turf.point([location.location.x, location.location.y]);
      let buffer = turf.buffer(point, 1, {units: 'miles'});
      let simplePolygon = turf.simplify(buffer.geometry, {tolerance: 0.005, highQuality: false});
      let arcsimplePolygon = arcGIS.convert(simplePolygon);
      let url = `https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/Demolitions_under_Contract/FeatureServer/0/query?where=demolish_by_date+%3E%3D+%27${controller.defaultSettings.startDate}%27+and+demolish_by_date+%3C+%27${controller.defaultSettings.endDate}%27+and+parcel_id+%3C%3E+%27${location.attributes.User_fld}%27&objectIds=&time=&geometry=${encodeURI(JSON.stringify(arcsimplePolygon))}&geometryType=esriGeometryPolygon&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=3&f=json`;
      return fetch(url)
      .then((resp) => resp.json()) // Transform the data into json
      .then(function(data) {
        resolve({"id": "demos-data", "data": data});
      }).catch( err => {
        // console.log(err);
      });
    });
    let demoStatus = new Promise((resolve, reject) => {
      let url = `https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/Demolitions_under_Contract/FeatureServer/0/query?where=parcel_id+%3D+%27${location.attributes.User_fld}%27&objectIds=&time=&geometry=&geometryType=esriGeometryPolygon&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=4326&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=demolish_by_date&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=1&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=json&token=`;
      return fetch(url)
      .then((resp) => resp.json()) // Transform the data into json
      .then(function(data) {
        resolve({"id": "demo-status", "data": data});
      }).catch( err => {
        // console.log(err);
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
      }).catch( err => {
        // console.log(err);
      });
    });
    let npo = new Promise((resolve, reject) => {
      let url = `https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/npo_ago/FeatureServer/0/query?where=&objectIds=&time=&geometry=${location.location.x}%2C${location.location.y}&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&returnCentroid=false&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=4326&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=json&token=`;
      return fetch(url)
      .then((resp) => resp.json()) // Transform the data into json
      .then(function(data) {
        resolve({"id" : "npo", "data": data});
      }).catch( err => {
        // console.log(err);
      });
    });
    let improveDet = new Promise((resolve, reject) => {
      let point = turf.point([location.location.x, location.location.y]);
      let buffer = turf.buffer(point, 300, {units: 'meters'});
      let simplePolygon = turf.simplify(buffer.geometry, {tolerance: 0.005, highQuality: false});
      let arcsimplePolygon = arcGIS.convert(simplePolygon);
      let url = `https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/improve_detroit_issues/FeatureServer/0/query?where=status+%3C%3E+%27Closed%27+and+status+%3C%3E+%27Archived%27&objectIds=&time=&geometry=${encodeURI(JSON.stringify(arcsimplePolygon))}&geometryType=esriGeometryPolygon&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=3&f=json`;
      return fetch(url)
      .then((resp) => resp.json()) // Transform the data into json
      .then(function(data) {
        resolve({"id": "improve-det", "data": data});
      }).catch( err => {
        // console.log(err);
      });
    });
    let recycling = new Promise((resolve, reject) => {
      let url = "https://gis.detroitmi.gov/arcgis/rest/services/DPW/2019Services/MapServer/0/query?where=&text=&objectIds=&time=&geometry=" + location.location.x + "%2C+" + location.location.y + "&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelWithin&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=json";
      fetch(url)
      .then((resp) => resp.json()) // Transform the data into json
      .then(function(data) {
        let todaysMonth =  moment().month() + 1;
        let todaysYear = moment().year();
        let url = `https://apis.detroitmi.gov/waste_schedule/details/${data.features[0].attributes.FID}/year/${todaysYear}/month/${todaysMonth}/`;
        return fetch(url)
        .then((resp) => resp.json()) // Transform the data into json
        .then(function(data) {
          resolve({"id": "recycling", "data": data});
        });
      }).catch( err => {
        // console.log(err);
      });
    });
    let historicDistrict = new Promise((resolve, reject) => {
      let url = "https://services2.arcgis.com/qvkbeam7Wirps6zC/ArcGIS/rest/services/Detroit_Local_Historic_Districts/FeatureServer/0/query?where=&text=&objectIds=&time=&geometry=" + location.location.x + "%2C+" + location.location.y + "&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelWithin&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=json";
      fetch(url)
      .then((resp) => resp.json()) // Transform the data into json
      .then(function(data) {
        resolve({"id" : "historicDistrict", "data": data});
      }).catch( err => {
        // console.log(err);
      });
    });
    // ,districtManagers,districtInspectors,councilMembers
    let filters = controller.defaultSettings.filters.split(',');
    let callList = [];
    filters.forEach(f => {
      console.log(f);
      switch (f) {
        case 'council':
          callList.push(council);
          break;

        case 'neighborhoods':
          callList.push(neighborhoods);
          break;

        case 'assessorsData':
          if(location.attributes.User_fld != null && location.attributes.User_fld != ''){
            callList.push(assessorsData);
          }
          break;

        case 'permitData':
          if(location.attributes.User_fld != null && location.attributes.User_fld != ''){
            callList.push(permitData);
          }
          break;

        case 'blightData':
          if(location.attributes.User_fld != null && location.attributes.User_fld != ''){
            callList.push(blightData);
          }
          break;

        case 'salesHistoryData':
          if(location.attributes.User_fld != null && location.attributes.User_fld != ''){
            callList.push(salesHistoryData);
          }
          break;

        case 'demosData':
          callList.push(demosData);
          break;

        case 'npo':
          callList.push(npo);
          break;

        case 'improveDet':
          callList.push(improveDet);
          break;

        case 'recycling':
          callList.push(recycling);
          break;

        case 'rentalData':
          if(location.attributes.User_fld != null && location.attributes.User_fld != ''){
            callList.push(rentalData);
          }
          break;

        case 'rentalCertData':
          callList.push(rentalCertData);
          break;

        case 'demoStatus':
          if(location.attributes.User_fld != null && location.attributes.User_fld != ''){
            callList.push(demoStatus);
          }
          break;

        case 'historicDistrict':
          callList.push(historicDistrict);
          break;

        case 'districtManagers':
          callList.push(districtManagers);
          break;

        case 'districtInspectors':
          callList.push(districtInspectors);
          break;

        case 'councilMembers':
          callList.push(councilMembers);
          break;
      
        default:
          break;
      }
    });
    console.log(callList);
    Promise.all(callList).then(values => {
      let dataSets = {};
      console.log(values);
      for (let key in values) {
        if(values[key] != null) {
          dataSets[values[key].id] = values[key];
        }else{
          initialLoadChecker = false;
        }
      }
      dataSets['title'] = location.address;
      console.log(dataSets);
      if(filters.includes('council')){
        dataSets = controller.buildCouncilData(dataSets, controller);
      }
      controller.panel.creatPanel(dataSets, controller);
    }).catch(reason => {
      // console.log(reason);
    });
    // if(location.attributes.User_fld != null && location.attributes.User_fld != ''){
    //   Promise.all([council,neighborhoods,assessorsData,permitData,blightData,salesHistoryData,demosData,npo,improveDet,recycling,rentalData,rentalCertData,demoStatus,historicDistrict,districtManagers,districtInspectors,councilMembers]).then(values => {
    //     let dataSets = {};
    //     for (let key in values) {
    //       if(values[key] != null) {
    //         dataSets[values[key].id] = values[key];
    //       }else{
    //         initialLoadChecker = false;
    //       }
    //     }
    //     dataSets['title'] = location.address;
    //     controller.buildCouncilData(dataSets, controller);
    //   }).catch(reason => {
    //     // console.log(reason);
    //   });
    // }else{
    //   Promise.all([council,neighborhoods,demosData,npo,improveDet,recycling,historicDistrict,districtManagers,districtInspectors,councilMembers]).then(values => {
    //     let dataSets = {};
    //     for (let key in values) {
    //       if(values[key] != null) {
    //         dataSets[values[key].id] = values[key];
    //       }else{
    //         initialLoadChecker = false;
    //       }
    //     }
    //     dataSets['title'] = location.address;
    //     controller.buildCouncilData(dataSets, controller);
    //   }).catch(reason => {
    //     // console.log(reason);
    //   });
    // }
    
  }
}
