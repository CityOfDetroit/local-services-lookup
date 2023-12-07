!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},r=(new Error).stack;r&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[r]="f663f3b4-cd9a-4498-b157-a824081f690b",e._sentryDebugIdIdentifier="sentry-dbid-f663f3b4-cd9a-4498-b157-a824081f690b")}catch(e){}}();var _global="undefined"!==typeof window?window:"undefined"!==typeof global?global:"undefined"!==typeof self?self:{};_global.SENTRY_RELEASE={id:"f0aa27dca208793f5cf6f59927017b43faf187fd"},(self.webpackChunklocal_services_lookup=self.webpackChunklocal_services_lookup||[]).push([[600],{55:function(e,r,t){!function(r,o){if("object"===typeof e.exports&&(e.exports=o(t(257))),"object"===typeof r.navigator){if(!r.Terraformer)throw new Error("Terraformer.ArcGIS requires the core Terraformer library. https://github.com/esri/Terraformer");r.Terraformer.ArcGIS=o(r.Terraformer)}}(this,(function(e){var r={};function t(e){var r,t,o,n,i=0,s=0,a=[];o=e.match(/((\+|\-)[^\+\-]+)/g),n=parseInt(o[0],32);for(var c=1;c<o.length;c+=2)i=r=parseInt(o[c],32)+i,s=t=parseInt(o[c+1],32)+s,a.push([r/n,t/n]);return a}function o(e){return function(e,r){for(var t=0;t<e.length;t++)if(e[t]!==r[t])return!1;return!0}(e[0],e[e.length-1])||e.push(e[0]),e}function n(e){var r={};for(var t in e)e.hasOwnProperty(t)&&(r[t]=e[t]);return r}function i(e){for(var r,t=0,o=0,n=e.length,i=e[o];o<n-1;o++)t+=((r=e[o+1])[0]-i[0])*(r[1]+i[1]),i=r;return t>=0}function s(e){var r=[],t=e.slice(0),n=o(t.shift().slice(0));if(n.length>=4){i(n)||n.reverse(),r.push(n);for(var s=0;s<t.length;s++){var a=o(t[s].slice(0));a.length>=4&&(i(a)&&a.reverse(),r.push(a))}}return r}function a(r,t){var o=e.Tools.arraysIntersectArrays(r,t),n=e.Tools.coordinatesContainPoint(r,t[0]);return!(o||!n)}function c(r,s){var f={};return(s=s||{}).idAttribute=s.idAttribute||void 0,!r.spatialReference||3857!==r.spatialReference.wkid&&102100!==r.spatialReference.wkid||(f.crs=e.MercatorCRS),"number"===typeof r.x&&"number"===typeof r.y&&(f.type="Point",f.coordinates=[r.x,r.y],(r.z||r.m)&&f.coordinates.push(r.z),r.m&&f.coordinates.push(r.m)),r.points&&(f.type="MultiPoint",f.coordinates=r.points.slice(0)),r.paths&&(1===r.paths.length?(f.type="LineString",f.coordinates=r.paths[0].slice(0)):(f.type="MultiLineString",f.coordinates=r.paths.slice(0))),r.rings&&(f=function(r){for(var t,n,s,c=[],f=[],u=0;u<r.length;u++){var l=o(r[u].slice(0));if(!(l.length<4))if(i(l)){var p=[l.slice().reverse()];c.push(p)}else f.push(l.slice().reverse())}for(var d=[];f.length;){s=f.pop();var y=!1;for(t=c.length-1;t>=0;t--)if(a(n=c[t][0],s)){c[t].push(s),y=!0;break}y||d.push(s)}for(;d.length;){s=d.pop();var g=!1;for(t=c.length-1;t>=0;t--)if(n=c[t][0],e.Tools.arraysIntersectArrays(n,s)){c[t].push(s),g=!0;break}g||c.push([s.reverse()])}return 1===c.length?{type:"Polygon",coordinates:c[0]}:{type:"MultiPolygon",coordinates:c}}(r.rings.slice(0))),"number"===typeof r.xmin&&"number"===typeof r.ymin&&"number"===typeof r.xmax&&"number"===typeof r.ymax&&(f.type="Polygon",f.coordinates=[[[r.xmax,r.ymax],[r.xmin,r.ymax],[r.xmin,r.ymin],[r.xmax,r.ymin],[r.xmax,r.ymax]]]),(r.compressedGeometry||r.geometry||r.attributes)&&(f.type="Feature",r.compressedGeometry&&(r.geometry={paths:[t(r.compressedGeometry)]}),f.geometry=r.geometry?c(r.geometry):null,f.properties=r.attributes?n(r.attributes):null,r.attributes&&(f.id=r.attributes[s.idAttribute]||r.attributes.OBJECTID||r.attributes.FID)),new e.Primitive(f)}function f(e,r){var t,o=(r=r||{}).idAttribute||"OBJECTID";t=r.sr?{wkid:r.sr}:e&&e.crs&&"urn:ogc:def:crs:OGC:1.3:CRS84"!=e.crs.properties.name?null:{wkid:4326};var i,a={};switch(e.type){case"Point":a.x=e.coordinates[0],a.y=e.coordinates[1],e.coordinates[2]&&(a.z=e.coordinates[2]),e.coordinates[3]&&(a.m=e.coordinates[3]),a.spatialReference=t;break;case"MultiPoint":a.points=e.coordinates.slice(0),a.spatialReference=t;break;case"LineString":a.paths=[e.coordinates.slice(0)],a.spatialReference=t;break;case"MultiLineString":a.paths=e.coordinates.slice(0),a.spatialReference=t;break;case"Polygon":a.rings=s(e.coordinates.slice(0)),a.spatialReference=t;break;case"MultiPolygon":a.rings=function(e){for(var r=[],t=0;t<e.length;t++)for(var o=s(e[t]),n=o.length-1;n>=0;n--){var i=o[n].slice(0);r.push(i)}return r}(e.coordinates.slice(0)),a.spatialReference=t;break;case"Feature":e.geometry&&(a.geometry=f(e.geometry,r)),a.attributes=e.properties?n(e.properties):{},e.id&&(a.attributes[o]=e.id);break;case"FeatureCollection":for(a=[],i=0;i<e.features.length;i++)a.push(f(e.features[i],r));break;case"GeometryCollection":for(a=[],i=0;i<e.geometries.length;i++)a.push(f(e.geometries[i],r))}return a}return r.parse=c,r.convert=f,r.toGeoJSON=c,r.fromGeoJSON=f,r.parseCompressedGeometry=function(r){return new e.LineString(t(r))},r}))}}]);
//# sourceMappingURL=vendors.terraformer-arcgis-parser.js.map