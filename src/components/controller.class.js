'use strict';
import Panel from './panel.class.js';
import DataManager from './data-manager.class.js';
import Geocoder from './geocoder.class.js';
const moment = require('moment');
export default class Controller {
  constructor() {
    this.defaultSettings = {};
    this.panel = new Panel();
    this.dataManager = new DataManager();
    this.geocoder = new Geocoder('geocoder', this);
    this.initialLoad(this);
  }
  initialLoad(controller){
    controller.defaultSettings.startDate = moment().format('YYYY-MM-DD');
    controller.defaultSettings.endDate = moment().add(5,'months').format('YYYY-MM-DD');
    controller.defaultSettings.filters = document.getElementById('local-services-filters').value;
  }

  checkParcelValid(parcel){
    return /\d/.test(parcel);
  }

  closeAlert(ev){
    (ev.target.parentNode.parentNode.id === 'alert-overlay') ? document.getElementById('alert-overlay').className = '': document.getElementById('drill-down-overlay').className = '';
  }

  buildCouncilData(data, _controller){
    let councilData = {
      district: `District ${data.council.data}`,
      districtURL: null,
      council:{
        name: null,
        url: null,
        phone: null
      },
      dmanager:{
        name: null,
        url: `/departments/department-of-neighborhoods/district-${data.council.data}#block-views-block-contacts-special-block-1`,
        phone: null
      },
      ddmanager: {
        name: null,
        url: `/departments/department-of-neighborhoods/district-${data.council.data}#block-views-block-contacts-special-block-1`,
        phone: null
      },
      bliaision:{
        name: null,
        email: null
      },
      enforcement: {
        name: null,
        phone: null
      }
    };
    switch (data.council.data) {
      case 1:
        councilData.districtURL = `/taxonomy/term/1276`;
        data.councilMembers.data.forEach((item)=>{
          if(item.tid == '1276'){
            councilData.council.name = item.field_organization_head_name;
            councilData.council.url = `/taxonomy/term/1276`;
            councilData.council.phone = item.field_phone;
          }
        });
        data.districtManagers.data.forEach((item)=>{
          if(item.field_contact_position.includes('District 1 Manager')){
            councilData.dmanager.name = item.title;
            councilData.dmanager.phone = item.field_telephone;
          }
          if(item.field_contact_position.includes('District 1 Deputy Manager')){
            councilData.ddmanager.name = item.title;
            councilData.ddmanager.phone = item.field_telephone;
          }
          if(item.field_contact_position.includes('District 1 Business Liaison')){
            councilData.bliaision.name = item.title;
            councilData.bliaision.email = item.field_email_address;
          }
        });
        data.districtInspectors.data.forEach((item)=>{
          if(item.field_responsibilities.includes('District 1')){
            councilData.enforcement.name = item.title;
            councilData.enforcement.phone = item.field_telephone;
          }
        });
        break;
        
      case 2:
        councilData.districtURL = `/taxonomy/term/1476`;
        data.councilMembers.data.forEach((item)=>{
          if(item.tid == '1476'){
            councilData.council.name = item.field_organization_head_name;
            councilData.council.url = `/taxonomy/term/1476`;
            councilData.council.phone = item.field_phone;
          }
        });
        data.districtManagers.data.forEach((item)=>{
          if(item.field_contact_position.includes('District 2 Manager')){
            councilData.dmanager.name = item.title;
            councilData.dmanager.phone = item.field_telephone;
          }
          if(item.field_contact_position.includes('District 2 Deputy Manager')){
            councilData.ddmanager.name = item.title;
            councilData.ddmanager.phone = item.field_telephone;
          }
          if(item.field_contact_position.includes('District 2 Business Liaison')){
            councilData.bliaision.name = item.title;
            councilData.bliaision.email = item.field_email_address;
          }
        });
        data.districtInspectors.data.forEach((item)=>{
          if(item.field_responsibilities.includes('District 2')){
            councilData.enforcement.name = item.title;
            councilData.enforcement.phone = item.field_telephone;
          }
        });
        break;
        
      case 3:
        councilData.districtURL = `/taxonomy/term/1481`;
        data.councilMembers.data.forEach((item)=>{
          if(item.tid == '1481'){
            councilData.council.name = item.field_organization_head_name;
            councilData.council.url = `/taxonomy/term/1481`;
            councilData.council.phone = item.field_phone;
          }
        });
        data.districtManagers.data.forEach((item)=>{
          if(item.field_contact_position.includes('District 3 Manager')){
            councilData.dmanager.name = item.title;
            councilData.dmanager.phone = item.field_telephone;
          }
          if(item.field_contact_position.includes('District 3 Deputy Manager')){
            councilData.ddmanager.name = item.title;
            councilData.ddmanager.phone = item.field_telephone;
          }
          if(item.field_contact_position.includes('District 3 Business Liaison')){
            councilData.bliaision.name = item.title;
            councilData.bliaision.email = item.field_email_address;
          }
        });
        data.districtInspectors.data.forEach((item)=>{
          if(item.field_responsibilities.includes('District 3')){
            councilData.enforcement.name = item.title;
            councilData.enforcement.phone = item.field_telephone;
          }
        });
        break;
        
      case 4:
        councilData.districtURL = `/taxonomy/term/1486`;
        data.councilMembers.data.forEach((item)=>{
          if(item.tid == '1486'){
            councilData.council.name = item.field_organization_head_name;
            councilData.council.url = `/taxonomy/term/1486`;
            councilData.council.phone = item.field_phone;
          }
        });
        data.districtManagers.data.forEach((item)=>{
          if(item.field_contact_position.includes('District 4 Manager')){
            councilData.dmanager.name = item.title;
            councilData.dmanager.phone = item.field_telephone;
          }
          if(item.field_contact_position.includes('District 4 Deputy Manager')){
            councilData.ddmanager.name = item.title;
            councilData.ddmanager.phone = item.field_telephone;
          }
          if(item.field_contact_position.includes('District 4 Business Liaison')){
            councilData.bliaision.name = item.title;
            councilData.bliaision.email = item.field_email_address;
          }
        });
        data.districtInspectors.data.forEach((item)=>{
          if(item.field_responsibilities.includes('District 4')){
            councilData.enforcement.name = item.title;
            councilData.enforcement.phone = item.field_telephone;
          }
        });
        break;
        
      case 5:
          councilData.districtURL = `/taxonomy/term/1346`;
          data.councilMembers.data.forEach((item)=>{
            if(item.tid == '1346'){
              councilData.council.name = item.field_organization_head_name;
              councilData.council.url = `/taxonomy/term/1346`;
              councilData.council.phone = item.field_phone;
            }
          });
          data.districtManagers.data.forEach((item)=>{
            if(item.field_contact_position.includes('District 5 Manager')){
              councilData.dmanager.name = item.title;
              councilData.dmanager.phone = item.field_telephone;
            }
            if(item.field_contact_position.includes('District 5 Deputy Manager')){
              councilData.ddmanager.name = item.title;
              councilData.ddmanager.phone = item.field_telephone;
            }
            if(item.field_contact_position.includes('District 5 Business Liaison')){
              councilData.bliaision.name = item.title;
              councilData.bliaision.email = item.field_email_address;
            }
          });
          data.districtInspectors.data.forEach((item)=>{
            if(item.field_responsibilities.includes('District 5')){
              councilData.enforcement.name = item.title;
              councilData.enforcement.phone = item.field_telephone;
            }
        });
        break;
        
      case 6:
        councilData.districtURL = `/taxonomy/term/1491`;
        data.councilMembers.data.forEach((item)=>{
          if(item.tid == '1491'){
            let cleanPhone = item.field_phone.replace('Office: ','');
            cleanPhone = cleanPhone.replace(/ /g,'-');
            cleanPhone = cleanPhone.replace(/[()]/g,'');
            councilData.council.name = item.field_organization_head_name;
            councilData.council.url = `/taxonomy/term/1491`;
            councilData.council.phone = `<a href="tel:${cleanPhone}">${item.field_phone}</a>`;
          }
        });
        data.districtManagers.data.forEach((item)=>{
          if(item.field_contact_position.includes('District 6 Manager')){
            let cleanPhone = item.field_telephone.replace(/ /g,'-');
            cleanPhone = cleanPhone.replace(/[()]/g,'');
            councilData.dmanager.name = item.title;
            councilData.dmanager.phone = `<a href="tel:${cleanPhone}">${item.field_telephone}</a>`;
          }
          if(item.field_contact_position.includes('District 6 Deputy Manager')){
            let cleanPhone = item.field_telephone.replace(/ /g,'-');
            cleanPhone = cleanPhone.replace(/[()]/g,'');
            councilData.ddmanager.name = item.title;
            councilData.ddmanager.phone = `<a href="tel:${cleanPhone}">${item.field_telephone}</a>`;
          }
          if(item.field_contact_position.includes('District 6 Business Liaison')){
            councilData.bliaision.name = item.title;
            councilData.bliaision.email = item.field_email_address;
          }
        });
        data.districtInspectors.data.forEach((item)=>{
          if(item.field_responsibilities.includes('District 6')){
            let cleanPhone = item.field_telephone.replace(/ /g,'-');
            cleanPhone = cleanPhone.replace(/[()]/g,'');
            councilData.enforcement.name = item.title;
            councilData.enforcement.phone = `<a href="tel:${cleanPhone}">${item.field_telephone}</a>`;
          }
        });
        break;

      case 7:
        councilData.districtURL = `/taxonomy/term/1511`;
        data.councilMembers.data.forEach((item)=>{
          if(item.tid == '1511'){
            councilData.council.name = item.field_organization_head_name;
            councilData.council.url = `/taxonomy/term/1511`;
            councilData.council.phone = item.field_phone;
          }
        });
        data.districtManagers.data.forEach((item)=>{
          if(item.field_contact_position.includes('District 7 Manager')){
            councilData.dmanager.name = item.title;
            councilData.dmanager.phone = item.field_telephone;
          }
          if(item.field_contact_position.includes('District 7 Deputy Manager')){
            councilData.ddmanager.name = item.title;
            councilData.ddmanager.phone = item.field_telephone;
          }
          if(item.field_contact_position.includes('District 7 Business Liaison')){
            councilData.bliaision.name = item.title;
            councilData.bliaision.email = item.field_email_address;
          }
        });
        data.districtInspectors.data.forEach((item)=>{
          if(item.field_responsibilities.includes('District 7')){
            councilData.enforcement.name = item.title;
            councilData.enforcement.phone = item.field_telephone;
          }
        });
        break;
    
      default:
        console.log('not inside city');
        break;
    }
    return councilData;
  }
}