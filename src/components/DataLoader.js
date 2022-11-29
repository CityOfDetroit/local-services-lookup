'use strict';

export default class DataLoader extends HTMLElement {
    static get observedAttributes() {
        return ['data-loader-state', 'data-parcel-id'];
    }

    constructor() {
        // Always call super first in constructor
        super();
        this.callList = [];
    
        // Create a shadow root
        const shadow = this.attachShadow({mode: 'open'});

        // Create result section
        const loaderWrapper = document.createElement('section');
        loaderWrapper.id = 'loader-wrapper';
        shadow.appendChild(loaderWrapper);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        const shadow = this.shadowRoot;
        console.log(`Loader - attribute: ${name}, old: ${oldValue}, new: ${newValue}`);
        switch (name) {
            case 'data-loader-state':
                this.clearLoader(this);
                this.loadLoader(this);
                break;

            default:
                break;
        }
    }

    getDataSets(loader){
        const app = document.getElementsByTagName('my-home-info');
        const dataSets = app[0].getAttribute('data-active-sets').split(',');
        const parcelData = JSON.parse(app[0].getAttribute('data-parcel-id'));

        let assessorsData = new Promise((resolve, reject) => {
            console.log(parcelData);
            if(parcelData.attributes.parcel_id == 'CONDO BUILDING'){
              resolve({"id": "assessors-data", "data": null});
            }else{
              let url = "https://apis.detroitmi.gov/assessments/parcel/" + parcelData.attributes.parcel_id + "/";
              return fetch(url)
              .then((resp) => resp.json()) // Transform the data into json
              .then(function(data) {
                resolve({"id": "assessors-data", "data": data});
              }).catch( err => {
                // console.log(err);
              });
            }
        });

        let neighborhoods = new Promise((resolve, reject) => {
            let url = `https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/Current_City_of_Detroit_Neighborhoods/FeatureServer/0/query?where=&objectIds=&time=&geometry=${parcelData.location.x}%2C${parcelData.location.y}&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&returnCentroid=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=json&token=`
            return fetch(url)
            .then((resp) => resp.json()) // Transform the data into json
            .then(function(data) {
              resolve({"id": "neighborhood", "data": data});
            }).catch( err => {
              // console.log(err);
            });
        });

        let council = new Promise((resolve, reject) => {
            return resolve({"id": "council", "data": null});
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
          let DWSDBackupProtection = new Promise((resolve, reject) => {
            let url = `https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/Current_City_of_Detroit_Neighborhoods/FeatureServer/0/query?where=&objectIds=&time=&geometry=${parcelData.location.x}%2C${parcelData.location.y}&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&returnCentroid=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=json&token=`
            return fetch(url)
            .then((resp) => resp.json()) // Transform the data into json
            .then(function(data) {
              resolve({"id": "DWSDBackupProtection", "data": data});
            }).catch( err => {
              // console.log(err);
            });
          });
          let nrsa = new Promise((resolve, reject) => {
            let url = `https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/NRSA_2020/FeatureServer/0/query?where=&objectIds=&time=&geometry=${parcelData.location.x}%2C${parcelData.location.y}&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&returnCentroid=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=json&token=`
            return fetch(url)
            .then((resp) => resp.json()) // Transform the data into json
            .then(function(data) {
              resolve({"id": "nrsa", "data": data});
            }).catch( err => {
              // console.log(err);
            });
          });
          let nezHomestead = new Promise((resolve, reject) => {
            let url = `https://services2.arcgis.com/qvkbeam7Wirps6zC/ArcGIS/rest/services/NEZHOMESTEAD2021/FeatureServer/0/query?where=&objectIds=&time=&geometry=${parcelData.location.x}%2C${parcelData.location.y}&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&returnCentroid=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=json&token=`
            return fetch(url)
            .then((resp) => resp.json()) // Transform the data into json
            .then(function(data) {
              resolve({"id": "nez", "data": data});
            }).catch( err => {
              // console.log(err);
            });
          });
          let nezHomesteadOld = new Promise((resolve, reject) => {
            let url = `https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/NEZ_H_Districts/FeatureServer/0/query?where=&objectIds=&time=&geometry=${parcelData.location.x}%2C${parcelData.location.y}&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&returnCentroid=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=json&token=`
            return fetch(url)
            .then((resp) => resp.json()) // Transform the data into json
            .then(function(data) {
              resolve({"id": "nezOld", "data": data});
            }).catch( err => {
              // console.log(err);
            });
          });
          let permitData = new Promise((resolve, reject) => {
            let url = `https://services2.arcgis.com/qvkbeam7Wirps6zC/ArcGIS/rest/services/BuildingPermits/FeatureServer/0/query?where=parcel_id+%3D+%27${parcelData.attributes.parcel_id}%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=3&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=json`;
            return fetch(url)
            .then((resp) => resp.json()) // Transform the data into json
            .then(function(data) {
              resolve({"id": "permit-data", "data": data});
            }).catch( err => {
              // console.log(err);
            });
          });
          let rentalData = new Promise((resolve, reject) => {
            let url;
            if(parcelData.attributes.parcel_id != 'CONDO BUILDING'){
              url = `https://services2.arcgis.com/qvkbeam7Wirps6zC/ArcGIS/rest/services/RentalStatuses/FeatureServer/0/query?where=parcel_id+%3D+%27${parcelData.attributes.parcel_id}%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=json`;
            }else{
              url = `https://services2.arcgis.com/qvkbeam7Wirps6zC/ArcGIS/rest/services/RentalStatuses/FeatureServer/0/query?where=&objectIds=&time=&geometry=${parcelData.location.x}%2C+${parcelData.location.y}&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIndexIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=*&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=&gdbVersion=&returnDistinctValues=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&multipatchOption=&resultOffset=&resultRecordCount=&f=json`;
            }
            return fetch(url)
            .then((resp) => resp.json()) // Transform the data into json
            .then(function(data) {
              resolve({"id": "rental-data", "data": data});
            }).catch( err => {
              // console.log(err);
            });
          });
          let rentalCertData = new Promise((resolve, reject) => {
            let url;
            if(parcelData.attributes.parcel_id != 'CONDO BUILDING'){
              url = `https://services2.arcgis.com/qvkbeam7Wirps6zC/ArcGIS/rest/services/active_cofc/FeatureServer/0/query?where=parcel_id%3D%27${parcelData.attributes.parcel_id}%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=1&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=json`;
            }else{
              url = `https://services2.arcgis.com/qvkbeam7Wirps6zC/ArcGIS/rest/services/active_cofc/FeatureServer/0/query?where=&objectIds=&time=&geometry=${parcelData.location.x}%2C+${parcelData.location.y}&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIndexIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=*&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=&gdbVersion=&returnDistinctValues=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&multipatchOption=&resultOffset=&resultRecordCount=&f=json`;
            }
            return fetch(url)
            .then((resp) => resp.json()) // Transform the data into json
            .then(function(data) {
              resolve({"id": "rental-cert-data", "data": data});
            }).catch( err => {
              // console.log(err);
            });
          });
          let blightData = new Promise((resolve, reject) => {
            let url = `https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/Blight_Violations_(DAH)/FeatureServer/0/query?where=parcelno%3D%27${parcelData.attributes.parcel_id}%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=violation_date&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=2&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=json&token=`;
            return fetch(url)
            .then((resp) => resp.json()) // Transform the data into json
            .then(function(data) {
              resolve({"id": "blight-data", "data": data});
            }).catch( err => {
              // console.log(err);
            });
          });
          let salesHistoryData = new Promise((resolve, reject) => {
            let url = `https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/Property_Sales/FeatureServer/0/query?where=PARCEL_NO%3D%27${parcelData.attributes.parcel_id}%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=4326&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=SALE_DATE&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=2&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=json&token=`;
            return fetch(url)
            .then((resp) => resp.json()) // Transform the data into json
            .then(function(data) {
              resolve({"id": "sales-data", "data": data});
            }).catch( err => {
              // console.log(err);
            });
          });
          let demosData = new Promise((resolve, reject) => {
            let point = turf.point([parcelData.location.x, parcelData.location.y]);
            let buffer = turf.buffer(point, 1, {units: 'miles'});
            let simplePolygon = turf.simplify(buffer.geometry, {tolerance: 0.005, highQuality: false});
            let arcsimplePolygon = arcGIS.convert(simplePolygon);
            let url = `https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/Demolitions_under_Contract/FeatureServer/0/query?where=demolish_by_date+%3E%3D+%27${controller.defaultSettings.startDate}%27+and+demolish_by_date+%3C+%27${controller.defaultSettings.endDate}%27+and+parcel_id+%3C%3E+%27${parcelData.attributes.parcel_id}%27&objectIds=&time=&geometry=${encodeURI(JSON.stringify(arcsimplePolygon))}&geometryType=esriGeometryPolygon&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=3&f=json`;
            return fetch(url)
            .then((resp) => resp.json()) // Transform the data into json
            .then(function(data) {
              resolve({"id": "demos-data", "data": data});
            }).catch( err => {
              // console.log(err);
            });
          });
          let demoStatus = new Promise((resolve, reject) => {
            let url = `https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/Demolitions_under_Contract/FeatureServer/0/query?where=parcel_id+%3D+%27${parcelData.attributes.parcel_id}%27&objectIds=&time=&geometry=&geometryType=esriGeometryPolygon&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=4326&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=demolish_by_date&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=1&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=json&token=`;
            return fetch(url)
            .then((resp) => resp.json()) // Transform the data into json
            .then(function(data) {
              resolve({"id": "demo-status", "data": data});
            }).catch( err => {
              // console.log(err);
            });
          });
          let pSchools = new Promise((resolve, reject) => {
            let point = turf.point([parcelData.location.x, parcelData.location.y]);
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
            let url = `https://opengis.detroitmi.gov/opengis/rest/services/PublicSafety/NeighborhoodPoliceOfficers/FeatureServer/0/query?where=&objectIds=&time=&geometry=${parcelData.location.x}%2C${parcelData.location.y}&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&resultType=none&distance=1&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&returnCentroid=false&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=4326&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=json&token=`;
            return fetch(url)
            .then((resp) => resp.json()) // Transform the data into json
            .then(function(data) {
              resolve({"id" : "npo", "data": data});
            }).catch( err => {
              // console.log(err);
            });
          });
          let improveDet = new Promise((resolve, reject) => {
            let point = turf.point([parcelData.location.x, parcelData.location.y]);
            let buffer = turf.buffer(point, 300, {units: 'meters'});
            let simplePolygon = turf.simplify(buffer.geometry, {tolerance: 0.005, highQuality: false});
            let arcsimplePolygon = arcGIS.convert(simplePolygon);
            let url = `https://opengis.detroitmi.gov/opengis/rest/services/DoIT/ImproveDetroitIssues/FeatureServer/0/query?where=status+%3C%3E+%27Closed%27+and+status+%3C%3E+%27Archived%27&objectIds=&time=&geometry=${encodeURI(JSON.stringify(arcsimplePolygon))}&geometryType=esriGeometryPolygon&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=3&f=json`;
            return fetch(url)
            .then((resp) => resp.json()) // Transform the data into json
            .then(function(data) {
              resolve({"id": "improve-det", "data": data});
            }).catch( err => {
              // console.log(err);
            });
          });
          let recycling = new Promise((resolve, reject) => {
            let url = "https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/WasteCollectionAreas/FeatureServer/0/query?where=&text=&objectIds=&time=&geometry=" + parcelData.location.x + "%2C+" + parcelData.location.y + "&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelWithin&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=json";
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
            let url = "https://services2.arcgis.com/qvkbeam7Wirps6zC/ArcGIS/rest/services/Detroit_Local_Historic_Districts/FeatureServer/0/query?where=&text=&objectIds=&time=&geometry=" + parcelData.location.x + "%2C+" + parcelData.location.y + "&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelWithin&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=json";
            fetch(url)
            .then((resp) => resp.json()) // Transform the data into json
            .then(function(data) {
              resolve({"id" : "historicDistrict", "data": data});
            }).catch( err => {
              // console.log(err);
            });
          });
          let fireEscrow = new Promise((resolve, reject) => {
            let url = `https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/fie_properties_final/FeatureServer/0/query?where=parcel_id%3D%27${parcelData.attributes.parcel_id}%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnHiddenFields=false&returnGeometry=true&returnCentroid=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=json&token=`;
            return fetch(url)
            .then((resp) => resp.json()) // Transform the data into json
            .then(function(data) {
              resolve({"id": "fireEscrow", "data": data});
            }).catch( err => {
              // console.log(err);
            });
          });
        
        dataSets.forEach(f => {
        switch (f) {
            case 'council':
            loader.callList.push(council);
            break;

            case 'neighborhood':
            loader.callList.push(neighborhoods);
            break;

            case 'assessors-data':
            if(parcelData.attributes.parcel_id != null && parcelData.attributes.parcel_id != ''){
                if(parcelData.attributes.parcel_id == 'CONDO BUILDING'){
                }else{
                loader.callList.push(assessorsData);
                }
            }
            break;

            case 'permit-data':
            if(parcelData.attributes.parcel_id != null && parcelData.attributes.parcel_id != ''){
                loader.callList.push(permitData);
            }
            break;

            case 'blight-data':
            if(parcelData.attributes.parcel_id != null && parcelData.attributes.parcel_id != ''){
                loader.callList.push(blightData);
            }
            break;

            case 'salesHistoryData':
            if(parcelData.attributes.parcel_id != null && parcelData.attributes.parcel_id != ''){
                loader.callList.push(salesHistoryData);
            }
            break;

            case 'fireEscrow':
            if(parcelData.attributes.parcel_id != null && parcelData.attributes.parcel_id != ''){
                loader.callList.push(fireEscrow);
            }
            break;

            case 'nez':
            loader.callList.push(nezHomesteadOld);
            loader.callList.push(nezHomestead);
            break;
            
            case 'nrsa':
            loader.callList.push(nrsa);
            loader.callList.push(nrsa);
            break;

            case 'demosData':
            loader.callList.push(demosData);
            break;

            case 'npo':
            loader.callList.push(npo);
            break;

            case 'improve-det':
            loader.callList.push(improveDet);
            break;

            case 'recycling':
            loader.callList.push(recycling);
            break;

            case 'rental-data':
            if(parcelData.attributes.parcel_id != null && parcelData.attributes.parcel_id != ''){
                loader.callList.push(rentalData);
            }
            break;

            case 'rental-cert':
            loader.callList.push(rentalCertData);
            break;

            case 'demoStatus':
            if(parcelData.attributes.parcel_id != null && parcelData.attributes.parcel_id != ''){
                loader.callList.push(demoStatus);
            }
            break;

            case 'historicDistrict':
            loader.callList.push(historicDistrict);
            break;

            case 'districtManagers':
            loader.callList.push(districtManagers);
            break;

            case 'districtInspectors':
            loader.callList.push(districtInspectors);
            break;

            case 'councilMembers':
            loader.callList.push(councilMembers);
            break;
            
            case 'DWSDBackupProtection':
            if(!filters.includes('neighborhood')){
                loader.callList.push(DWSDBackupProtection);
            }
            break;
        
            default:
            break;
        }
        });
    }

    getData(loader) {
        const app = document.getElementsByTagName('my-home-info');
        const activeDataSets = app[0].getAttribute('data-active-sets').split(',');
        const parcelData = JSON.parse(app[0].getAttribute('data-parcel-id'));
        loader.getDataSets(loader)
        
        Promise.all(loader.callList).then(values => {
            let dataSets = {};
            for (let key in values) {
              if(values[key] != null) {
                dataSets[values[key].id] = values[key];
              }else{
                initialLoadChecker = false;
              }
            }
            dataSets['title'] = location.address;
            if(activeDataSets.includes('council')){
              dataSets.council.data = parcelData.attributes.council_district;
              let councilData = controller.buildCouncilData(dataSets, controller);
              dataSets.councilData = {id: 'councilData', data: councilData};
            }
            if(activeDataSets.includes('DWSDBackupProtection')){
              try {
                if(!dataSets.DWSDBackupProtection){
                  dataSets.DWSDBackupProtection = {id: 'DWSDBackupProtection', data: dataSets['neighborhood'].data};
                }
              } catch (error) {
                // console.log(error);
              }
            }
            console.log(dataSets);
            app[0].setAttribute('data-api-datasets', JSON.stringify(dataSets));
          }).catch(reason => {
            // console.log(reason);
          });
    }

    clearLoader(loader) {
        console.log('clearing loader');
        const shadow = loader.shadowRoot;
        while (shadow.firstChild) {
            shadow.removeChild(shadow.firstChild);
        }
    }

    loadLoader(loader) {
        const shadow = loader.shadowRoot;
        const loaderWrapper = document.createElement('section');
        loaderWrapper.id = 'loader-wrapper';
        switch (loader.getAttribute('data-loader-state')) {
            case 'active':
                loader.getData(loader);
                const textWelcome = document.createElement('p');
                textWelcome.innerText = 'Loading DATA';
                loaderWrapper.appendChild(textWelcome);
                shadow.appendChild(loaderWrapper);
                break;

            case 'finished':
                const text = document.createElement('p');
                text.innerText = 'Data loaded';
                loaderWrapper.appendChild(text);
                shadow.appendChild(loaderWrapper);
                break;
        
            default:
                
                break;
        }
    }
}
