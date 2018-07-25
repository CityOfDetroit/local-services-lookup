'use strict';
import "babel-polyfill";
import "isomorphic-fetch";
import firebase from "firebase";
// const moment = require('moment');
// const turf = require('@turf/turf');
// const arcGIS = require('terraformer-arcgis-parser');
// const WKT = require('terraformer-wkt-parser');
export default class Geocoder {
  constructor(container, controller) {
    this.form = null;
    this.controller = controller;
    this.config = {
        apiKey: "AIzaSyCbDRSJy9owEb-dbWlSJo6HkkeG4Y1LHRQ",
        authDomain: "local-services-loopkup.firebaseapp.com",
        databaseURL: "https://local-services-loopkup.firebaseio.com",
        projectId: "local-services-loopkup",
        storageBucket: "local-services-loopkup.appspot.com",
        messagingSenderId: "836263253195"
    };
    this.init(document.getElementById(container), this);
  }

  init(container, geocoder){
    let form = document.createElement('form');
    let label = document.createElement('label');
    let input = document.createElement('input');
    let suggestions = document.createElement('ul');
    let icon = document.createElement('i');
    form.addEventListener('submit', (ev) => {
        this.submit(ev, geocoder);
    });
    icon.className = 'fas fa-map-marker-alt';
    label.innerText = "My Home Info:";
    label.setAttribute("for", "geocoder-input"); 
    input.type = 'text';
    input.placeholder = 'Enter address';
    input.setAttribute('id', 'geocoder-input');
    input.setAttribute('autocomplete', 'off');
    input.addEventListener('keyup', (ev)=>{
        this.inputChange(ev, geocoder);
    });
    form.appendChild(label);
    form.appendChild(input);
    form.appendChild(icon);
    form.appendChild(suggestions);
    container.appendChild(form);
    this.form = form;
  }

  supplementGeocoder(address, geocoder, type){
    // if(type !== 'suggestions')geocoder.controller.panel.loaderToggle(true);
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
    
    try {
        fetch(url)
        .then((resp) => resp.json()) // Transform the data into json
        .then(function(data) {
            // console.log(data);
            if(type === 'suggestions'){
                data.candidates.forEach((item)=>{
                    let sugg = document.createElement('li');
                    if(item.attributes.User_fld === ''){
                        sugg.innerHTML = item.address;
                        sugg.setAttribute('data-parsel', 'no-parcel');
                    }else{
                        sugg.innerHTML = `${item.address} <span class="geo-recomended">RECOMMENDED</span>`;
                        sugg.setAttribute('data-parsel', item.attributes.User_fld);
                    }
                    
                    sugg.onclick = (ev) => {
                        geocoder.selectSuggestion(ev, geocoder);
                    }
                    geocoder.form.childNodes[3].appendChild(sugg);
                });
            }else{
                geocoder.controller.panel.createErrorPanel(address, false);
                let parcel = null;
                data.candidates.forEach((item) => {
                    (item.attributes.User_fld === '') ? 0 : parcel = item;
                });
                if(parcel === null){
                    geocoder.needGeocode(address, geocoder);
                    // geocoder.controller.panel.loaderToggle(false);
                    geocoder.clearSuggestions(geocoder);
                }else{
                    // geocoder.controller.panel.loaderToggle(false);
                    geocoder.clearSuggestions(geocoder);
                    geocoder.controller.dataManager.buildData(parcel, geocoder.controller);
                }
            }
        });
    } catch (error) {
        geocoder.controller.panel.createErrorPanel(address, true);
    }
  }

  selectSuggestion(ev, geocoder){
    let selection = null;
    if(ev.target.tagName === 'SPAN'){
        selection = ev.target.parentNode;
    }else{
        selection = ev.target;
    }
    if(selection.attributes[0].value === 'no-parcel'){
        geocoder.clearSuggestions(geocoder);
        geocoder.needGeocode(selection.innerText, geocoder);
    }else{
        geocoder.supplementGeocoder(selection.innerText, geocoder, 'submit');
    }
  }

  inputChange (ev, geocoder){
    switch (ev.key) {
        case 'Enter':
            
            break;
    
        case 'ArrowDown':

            break;

        case 'ArrowUp':

            break;

        case 'ArrowRight':

            break;

        case 'ArrowLeft':

            break;

        default:
            geocoder.clearSuggestions(geocoder);
            geocoder.supplementGeocoder(ev.target.value, geocoder, 'suggestions');
            break;
    }
  }

  clearSuggestions(geocoder){
    while (geocoder.form.childNodes[3].firstChild) {
        geocoder.form.childNodes[3].removeChild(geocoder.form.childNodes[3].firstChild);
    }
  }

  needGeocode(address, geocoder){
      geocoder.controller.panel.clearPanel();
      geocoder.controller.panel.createErrorPanel(address, true);
      firebase.initializeApp(geocoder.config);
      firebase.auth().signInAnonymously().catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          console.log(uid);
          
          // ...
        } else {
          // User is signed out.
          // ...
        }
        // ...
      });
  }

  submit(ev, geocoder){
      ev.preventDefault();
      geocoder.supplementGeocoder(ev.target['0'].value, geocoder, 'submit');
  }
}
