'use strict';
import "babel-polyfill";
import "isomorphic-fetch";
const moment = require('moment');
const turf = require('@turf/turf');
const arcGIS = require('terraformer-arcgis-parser');
const WKT = require('terraformer-wkt-parser');
export default class Geocoder {
  constructor(container, controller) {
    this.form = null;
    this.controller = controller;
    this.init(document.getElementById(container), this);
  }

  init(container, geocoder){
    let form = document.createElement('form');
    let label = document.createElement('label');
    let input = document.createElement('input');
    let suggestions = document.createElement('ul');
    form.addEventListener('submit', (ev) => {
        this.submit(ev, geocoder);
    });
    label.innerText = "My Home Info:";
    label.setAttribute("for", "geocoder-input"); 
    input.type = 'text';
    input.placeholder = 'Enter address';
    input.setAttribute('id', 'geocoder-input');
    input.addEventListener('keyup', (ev)=>{
        this.inputChange(ev, geocoder);
    });
    label.appendChild(input);
    form.appendChild(label);
    form.appendChild(suggestions);
    container.appendChild(form);
    this.form = form;
  }

  supplementGeocoder(address, geocoder, type){
    console.log(address);
    let tempAddr = address.split(",");
    tempAddr = tempAddr[0];
    tempAddr = tempAddr.split(" ");
    let newTempAddr = '';
    let size = tempAddr.length;
    tempAddr.forEach(function(item, index) {
      newTempAddr += item;
      ((index < size) && (index + 1) !== size) ? newTempAddr += '+': 0;
    });
    // console.log(newTempAddr);
    let url = `https://gis.detroitmi.gov/arcgis/rest/services/DoIT/CompositeGeocoder/GeocodeServer/findAddressCandidates?Street=&City=&ZIP=&SingleLine=${newTempAddr}&category=&outFields=User_fld&maxLocations=4&outSR=4326&searchExtent=&location=&distance=&magicKey=&f=json`;
    
    fetch(url)
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) {
        console.log(data);
        if(type === 'suggestions'){
            data.candidates.forEach((item)=>{
                console.log(item);
                let sugg = document.createElement('li');
                sugg.innerText = item.address;
                sugg.setAttribute('data-parsel', (item.attributes.User_fld === '') ? 'no-parcel' : item.attributes.User_fld);
                sugg.onclick = (ev) => {
                    geocoder.selectSuggestion(ev, geocoder);
                }
                geocoder.form.childNodes[1].appendChild(sugg);
            });
        }else{
            let parcel = null;
            console.log('submiting');
            data.candidates.forEach((item) => {
                (item.attributes.User_fld === '') ? 0 : parcel = item;
            });
            if(parcel !== null){
                geocoder.clearSuggestions(geocoder);
                geocoder.controller.dataManager.buildData(parcel, geocoder.controller);
            }else{
                geocoder.needGeocode(parcel.address, geocoder);
            }
        }
    });
  }

  selectSuggestion(ev, geocoder){
    console.log(ev.target);
    if(ev.target.attributes[0].value === 'no-parcel'){
        geocoder.clearSuggestions(geocoder);
        geocoder.needGeocode(ev.target.innerText, geocoder);
    }else{
        geocoder.supplementGeocoder(ev.target.innerText, geocoder, 'submit');
    }
  }

  inputChange (ev, geocoder){
    if(ev.key != 'Enter'){
        geocoder.clearSuggestions(geocoder);
        geocoder.supplementGeocoder(ev.target.value, geocoder, 'suggestions');
    }
  }

  clearSuggestions(geocoder){
    while (geocoder.form.childNodes[1].firstChild) {
        geocoder.form.childNodes[1].removeChild(geocoder.form.childNodes[1].firstChild);
    }
  }

  needGeocode(address, geocoder){
      console.log(address);
      geocoder.controller.panel.createErrorPanel(address);
  }

  submit(ev, geocoder){
      ev.preventDefault();
      console.log('submit');
      console.log(ev);
      geocoder.supplementGeocoder(ev.target['0'].value, geocoder, 'submit');
  }
}
