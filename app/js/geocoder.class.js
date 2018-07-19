'use strict';
import "babel-polyfill";
import "isomorphic-fetch";
const moment = require('moment');
const turf = require('@turf/turf');
const arcGIS = require('terraformer-arcgis-parser');
const WKT = require('terraformer-wkt-parser');
export default class Geocoder {
  constructor(container) {
    this.input = null;
    this.init(document.getElementById(container));
  }

  init(container){
    let label = document.createElement('label');
    let input = document.createElement('input');
    label.innerText = "My Home Info:";
    label.setAttribute("for", "geocoder-input"); 
    input.type = 'text';
    input.placeholder = 'Enter address';
    input.setAttribute('id', 'geocoder-input');
    input.addEventListener('keyup', this.inputChange);
    input.bind()
    label.appendChild(input);
    container.appendChild(label);
    this.input = input;
  }

  inputChange (ev){
    if(ev.key == 'Enter'){
        console.log('submiting');
        this.submit();
    }
  }

  submit(ev){
      console.log('submit');
  }

  getSuggestions(ev){
      console.log('suggestions');
  }
}
