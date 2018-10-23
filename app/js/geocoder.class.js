'use strict';
import "babel-polyfill";
import "isomorphic-fetch";
// import firebase from "firebase";
// require("firebase/functions");
export default class Geocoder {
  constructor(container, controller) {
    this.form = null;
    this.controller = controller;
    
    this.user = null;
    this.init(document.getElementById(container), this);
  }

  init(container, geocoder){
    // firebase.initializeApp(geocoder.config);
    // firebase.auth().onAuthStateChanged(function(user) {
    //     if (user) {
    //       geocoder.user = user;
    //       // ...
    //     } else {
    //       // User is signed out.
    //       // ...
    //     }
    //     // ...
    // });
    
    let form = document.createElement('form');
    let label = document.createElement('label');
    let input = document.createElement('input');
    let suggestions = document.createElement('ul');
    let list = document.createElement('datalist');
    let icon = document.createElement('i');
    form.addEventListener('submit', (ev) => {
        this.submit(ev, geocoder);
    });
    icon.className = 'fas fa-map-marker-alt';
    label.innerText = "My Home Info:";
    label.setAttribute("for", "geocoder-input"); 
    input.type = 'text';
    input.setAttribute('list','addresses');
    input.placeholder = 'Enter address';
    input.setAttribute('id', 'geocoder-input');
    input.setAttribute('autocomplete', 'off');
    input.addEventListener('keyup', (ev)=>{
        this.inputChange(ev, geocoder);
    });
    list.setAttribute('id','addresses');
    

    form.appendChild(label);
    form.appendChild(input);
    form.appendChild(icon);
    form.appendChild(suggestions);
    form.appendChild(list);
    container.appendChild(form);
    this.form = form;
  }

  writeUserData(userId, name, pass) {
    firebase.database().ref('users/' + userId).set({
      username: name,
      password: pass
    });
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
    // let getSuggestions = firebase.functions().httpsCallable('getSuggestions');
    // getSuggestions(address).then(function(result) {
    //     // Read result of the Cloud Function.
    //     console.log(result);
    // });
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
    fetch('https://us-central1-detroit-iet.cloudfunctions.net/getToken')
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) {
        // console.log(data);
        let params = [
            {
              "attributes" : {
                "user_input" : address
              },
              "geometry" : {
                "x" : 0,
                "y" : 0
              }
            }
        ];
        let request = new Request(`https://services2.arcgis.com/qvkbeam7Wirps6zC/ArcGIS/rest/services/addressvalidator/FeatureServer/0/addFeatures?token=${data.access_token}&features=${encodeURIComponent(JSON.stringify(params))}&f=json`, {
            method: 'POST',
            body: '',
            headers: new Headers(),
            mode: 'cors',
            cache: 'default'
        });
        fetch(request)
        .then((res) => {
            console.log(res);
        });
    });
  }

  submit(ev, geocoder){
      ev.preventDefault();
      geocoder.supplementGeocoder(ev.target['0'].value, geocoder, 'submit');
  }
}
