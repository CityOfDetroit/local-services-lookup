'use strict';
const moment = require('moment');
export default class Panel {
  constructor() {
  }

  loaderToggle(state){
    if(state){
      document.querySelector('.local-address').innerHTML = ``;
      document.querySelector('.loader-container').innerHTML = `
      <article>
      <div class="loader">
        <div class="loader__bar"></div>
        <div class="loader__bar"></div>
        <div class="loader__bar"></div>
        <div class="loader__bar"></div>
        <div class="loader__bar"></div>
        <div class="loader__ball"></div>
      </div>
      <p>LOADING</p>
      </article>`;
      document.getElementById('local-services-results').className = 'active';
    }else{
      document.querySelector('.loader-container').innerHTML = '';
    }
  }

  creatPanel(data, controller){
    let markup = controller.panel.createMarkup(data, controller);
    document.querySelector('#geocoder input').value = ``;
    document.querySelector('.local-address').innerHTML = `INFO FOR: ${data.title}`;
    document.querySelector('#local-services-results .local-content').innerHTML = markup;
    controller.panel.loaderToggle(false);
    document.querySelector('#local-services-results .data-form').innerHTML = `<a href="https://app.smartsheet.com/b/form/5d291f237bbe41c88d44bfcd56e5b620" target="_blank"><button>REPORT DATA ISSUES</button></a>`;
    document.getElementById('local-services-results').className = 'active';
  }

  clearPanel(){
    document.querySelector('.local-address').innerHTML = `INFO FOR:`;
    document.querySelector('#local-services-results .local-content').innerHTML = '';
  }

  createErrorPanel(address, toggle){
    document.querySelector('.local-address').innerHTML = `INFO FOR: ${address}`;
    document.querySelector('#local-services-results .local-content').innerHTML = '';
    document.querySelector('#local-services-results .error-container').innerHTML = `${(toggle) ? `
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="70" viewBox="0 0 100 68">
      <g id="large">
        <path fill="none" stroke="#F44" d="M55.8 38.5l6.2-1.2c0-1.8-.1-3.5-.4-5.3l-6.3-.2c-.5-2-1.2-4-2.1-6l4.8-4c-.9-1.6-1.9-3-3-4.4l-5.6 3c-1.3-1.6-3-3-4.7-4.1l2-6A30 30 0 0 0 42 8l-3.3 5.4c-2-.7-4.2-1-6.2-1.2L31.3 6c-1.8 0-3.5.1-5.3.4l-.2 6.3c-2 .5-4 1.2-6 2.1l-4-4.8c-1.6.9-3 1.9-4.4 3l3 5.6c-1.6 1.3-3 3-4.1 4.7l-6-2A32.5 32.5 0 0 0 2 26l5.4 3.3c-.7 2-1 4.2-1.2 6.2L0 36.7c0 1.8.1 3.5.4 5.3l6.3.2c.5 2 1.2 4 2.1 6l-4.8 4c.9 1.6 1.9 3 3 4.4l5.6-3c1.4 1.6 3 3 4.7 4.1l-2 6A30.5 30.5 0 0 0 20 66l3.4-5.4c2 .7 4 1 6.1 1.2l1.2 6.2c1.8 0 3.5-.1 5.3-.4l.2-6.3c2-.5 4-1.2 6-2.1l4 4.8c1.6-.9 3-1.9 4.4-3l-3-5.6c1.6-1.3 3-3 4.1-4.7l6 2A32 32 0 0 0 60 48l-5.4-3.3c.7-2 1-4.2 1.2-6.2zm-13.5 4a12.5 12.5 0 1 1-22.6-11 12.5 12.5 0 0 1 22.6 11z"/>
        <animateTransform attributeName="transform" begin="0s" dur="3s" from="0 31 37" repeatCount="indefinite" to="360 31 37" type="rotate"/>
      </g>
      <g id="small">
        <path fill="none" stroke="#F44" d="M93 19.3l6-3c-.4-1.6-1-3.2-1.7-4.8L90.8 13c-.9-1.4-2-2.7-3.4-3.8l2.1-6.3A21.8 21.8 0 0 0 85 .7l-3.6 5.5c-1.7-.4-3.4-.5-5.1-.3l-3-5.9c-1.6.4-3.2 1-4.7 1.7L70 8c-1.5 1-2.8 2-3.9 3.5L60 9.4a20.6 20.6 0 0 0-2.2 4.6l5.5 3.6a15 15 0 0 0-.3 5.1l-5.9 3c.4 1.6 1 3.2 1.7 4.7L65 29c1 1.5 2.1 2.8 3.5 3.9l-2.1 6.3a21 21 0 0 0 4.5 2.2l3.6-5.6c1.7.4 3.5.5 5.2.3l2.9 5.9c1.6-.4 3.2-1 4.8-1.7L86 34c1.4-1 2.7-2.1 3.8-3.5l6.3 2.1a21.5 21.5 0 0 0 2.2-4.5l-5.6-3.6c.4-1.7.5-3.5.3-5.1zM84.5 24a7 7 0 1 1-12.8-6.2 7 7 0 0 1 12.8 6.2z"/>
        <animateTransform attributeName="transform" begin="0s" dur="2s" from="0 78 21" repeatCount="indefinite" to="-360 78 21" type="rotate"/>
      </g>
    </svg>
    <h3>No Information found.</h3>
    ` : ``}
    `;
    document.querySelector('#local-services-results .data-form').innerHTML = '';
    document.getElementById('local-services-results').className = 'active';
  }

  buildCouncil(value){
    let siteURL = window.location.hostname;
    let tempHTML = `
      <article class="info-section">
      <span>GOVERNMENT</span>
      <div>
        <p><strong>COUNCIL:</strong> <a href="${value.data.districtURL}" target="_blank">${value.data.district}</a></p>
        <p><strong>COUNCIL MEMBER:</strong> <a href="http://${siteURL}${value.data.council.url}" target="_blank">${value.data.council.name}</a></p>
        <p><strong>COUNCIL MEMBER PHONE:</strong> ${value.data.council.phone}</p>
        <p><strong>DISTRICT MANAGER:</strong> <a href="${value.data.dmanager.url}" target="_blank">${value.data.dmanager.name}</a></p>
        <p><strong>DISTRICT MANAGER PHONE:</strong> ${value.data.dmanager.phone}</p>
        <p><strong>DEPUTY MANAGER:</strong> <a href="${value.data.ddmanager.url}" target="_blank">${value.data.ddmanager.name}</a></p>
        <p><strong>DEPUTY MANAGER PHONE:</strong> ${value.data.ddmanager.phone}</p>
        <p><strong>BUSINESS LIAISON:</strong> ${value.data.bliaision.name}</p>
        <p><strong>BUSINESS LIAISON PHONE:</strong> ${value.data.bliaision.email}</p>
        <p><strong>ENFORCEMENT INSPECTOR:</strong> ${value.data.enforcement.name}</p>
        <p><strong>ENFORCEMENT INSPECTOR PHONE:</strong> ${value.data.enforcement.phone}</p>
      </div>
    </article>`;
    return tempHTML;
  }

  buildNeighborhood(value){
    let tempHTML = '';
    if(Object.keys(value.data).length != 0 && value.data.constructor === Object){
      tempHTML = `
      <article class="info-section">
        <span>NEIGHBORHOOD</span>
        <div>
          <p><strong>NAME:</strong> ${value.data.features[0].attributes.nhood_name}</p>
        </div>
      </article>`;
    }else{
      tempHTML = `
      <article class="info-section">
        <span>NEIGHBORHOOD</span>
        <div>
          <p>NO NEIGHBORHOOD FOUND</p>
        </div>
      </article>`;
    }
    return tempHTML;
  }

  buildHistoricDistrict(value){
    let tempHTML = '';
    if(Object.keys(value.data).length != 0 && value.data.constructor === Object && value.data.features.length > 0){
      tempHTML = `
      <article class="info-section">
        <span>LOCAL HISTORIC DISTRICT</span>
        <div>
          <p><strong>NAME:</strong> ${value.data.features[0].attributes.Name}</p>
          <p><strong>DESIGNATED ON:</strong> ${moment(value.data.features[0].attributes.Year_Enacted).format('MMM DD, YYYY')}</p>
        </div>
      </article>`;
    }else{
      tempHTML = `
      <article class="info-section">
        <span>HISTORIC DISTRICT</span>
        <div>
          <p>NO HISTORIC DISTRICT FOUND</p>
        </div>
      </article>`;
    }
    return tempHTML;
  }

  buildNPO(value){
    let tempHTML = '';
    if(Object.keys(value.data).length != 0 && value.data.constructor === Object){
      tempHTML = `
      <article class="info-section">
        <span>POLICE</span>
        <div>
          <h5>PRECINCT</h5>
          <p><strong>NUMBER:</strong> ${value.data.features[0].attributes.precinct}</p>
          <p><strong>ADDRESS</strong> ${value.data.features[0].attributes.precinct_location}</p>
        </div>
        <div>
          <h5>NEIGHBORHOOD POLICE OFFICER (NPO)</h5>
          <p><strong>NAME:</strong> ${value.data.features[0].attributes.police_officer}</p>
          <p><strong>PHONE:</strong> ${value.data.features[0].attributes.phone_number}</p>
          <p><strong>EMAIL:</strong> ${value.data.features[0].attributes.email}</p>
        </div>
      </article>`;
    }else{
      tempHTML = `
      <article class="info-section">
        <span>POLICE</span>
        <div>
          <p>NO POLICE INFO FOUND</p>
        </div>
      </article>`;
    }
    return tempHTML;
  }

  buildRecycling(value){
    let tempHTML = '';
    if(Object.keys(value.data).length != 0 && value.data.constructor === Object){
      let contractorInfo = {
        name: null,
        url: null,
        phone: null
      };
      if(value.data.next_pickups.trash.contractor === 'gfl'){
        contractorInfo.name = 'GFL';
        contractorInfo.url =  'http://gflusa.com/residential/detroit/';
        contractorInfo.phone = '(844) 464-3587';
      }else{
        contractorInfo.name = 'ADVANCED';
        contractorInfo.url =  'http://www.advanceddisposal.com/mi/detroit/detroit-residential-collection';
        contractorInfo.phone = ' (844) 233-8764';
      }
      tempHTML = `
      <article class="info-section">
        <span>TRASH & RECYCLING</span>
        <div>
          <p><strong>PROVIDER:</strong> <a href="${contractorInfo.url}" target="_blank">${contractorInfo.name}</a> ${contractorInfo.phone}</p>
          <p><strong>NEXT TRASH:</strong> ${moment(value.data.next_pickups.trash.next_pickup).format('MMM DD, YYYY')}</p>
          <p><strong>NEXT RECYCLING:</strong> ${moment(value.data.next_pickups.recycling.next_pickup).format('MMM DD, YYYY')}</p>
          <p><strong>NEXT BULK:</strong> ${moment(value.data.next_pickups.bulk.next_pickup).format('MMM DD, YYYY')}</p>
          ${('yard waste' in value.data.next_pickups) ?
          tempHTML += `<p><strong>NEXT YARD:</strong> ${moment(value.data.next_pickups['yard waste'].next_pickup).format('MMM DD, YYYY')}</p>` : ``}
        </div>
      <h4><a href="/webapp/waste-pickup-map" target="_blank">MORE INFO</a></h4>
      </article>`;
    }else{
      tempHTML = `
      <article class="info-section">
        <span>TRASH & RECYCLING</span>
        <div>
          <p>NO TRASH & RECYCLING INFO FOUND</p>
        </div>
      </article>`;
    }
    return tempHTML;
  }

  buildAssessors(value){
    let tempHTML = '';
    if(value && Object.keys(value.data).length != 0 && value.data.constructor === Object && value.data.detail !== "Not found."){
      let property = {
        year: null,
        value: null,
        floor: null,
        buildingClass: null
      }
      tempHTML += `
      <article class="info-section">
        <span>OWNER'S ADDRESS</span>
        <div>
          <p><strong>CITY:</strong> ${value.data.ownercity}</p>
          <p><strong>STATE:</strong> ${value.data.ownerstate}</p>
          <p><strong>ADDRESS:</strong> ${value.data.ownerstreetaddr}</p>
          <p><strong>ZIP:</strong> ${value.data.ownerzip}</p>
        </div>
      </article>`;
      if(value.data.resb_bldgclass === 0){
        property.year = value.data.cib_yearbuilt;
        property.value = value.data.cib_value;
        property.floor = value.data.cib_yearbuilt;
        property.buildingClass = value.data.cib_yearbuilt;
      }else{
        property.year = value.data.resb_yearbuilt;
        property.value = value.data.resb_value;
        property.floor = value.data.resb_floorarea;
        property.buildingClass = value.data.resb_bldgclass;
      }
      tempHTML += `
      <article class="info-section">
        <span>PROPERTY</span>
        <div>
          <p><strong>PARCEL NUMBER:</strong> ${value.data.pnum}</p>
          <p><strong>YEAR BUILD:</strong> ${property.year}</p>
          <p><strong>CALCULATED VALUE:</strong> $${property.value.toLocaleString()}</p>
          <p><strong>FLOOR AREA:</strong> ${property.floor.toLocaleString()} SQFT</p>
          <p><strong>BUILDING CLASS:</strong> ${property.buildingClass}</p>
        </div>
      </article>`;
    }else{
      tempHTML += `
      <article class="info-section">
        <span>OWNER</span>
        <div>
          <p>NO OWNER INFO</p>
        </div>
      </article>
      <article class="info-section">
        <span>PROPERTY</span>
        <div>
          <p>NO PROPERTY INFO FOUND</p>
        </div>
      </article>`;
    }
    return tempHTML;
  }

  buildRental(value, values){
    let tempHTML = '';
    if(value && value.data.features.length){
      tempHTML += `
        <article class="info-section">
        <span>RENTAL ENFORCEMENT STATUS</span>
        <div>
          <p><strong>REGISTER:</strong> ${moment(value.data.features[0].attributes.date_status).format('MMM DD, YYYY')}</p>
          <p><strong>CERTIFIED:</strong> ${values['rental-cert-data'].data.features.length ? `${moment(values['rental-cert-data'].data.features[0].attributes.date_status).format('MMM DD, YYYY')}` : `Not certified`}</p>
        </div>
        `;
      tempHTML += `<h4><a href="/departments/buildings-safety-engineering-and-environmental-department/property-maintenance-division/rental-property" target="_blank">MORE INFO</a></h4>
      </article>`;
    }else{
      tempHTML += `
      <article class="info-section">
        <span>RENTAL ENFORCEMENT STATUS</span>
      <div>
        <p><strong>REGISTER:</strong> Not registered</p>
        <p><strong>CERTIFIED:</strong> Not certified</p>
      </div>
      </article>`;
    }
    return tempHTML;
  }

  buildBlight(value){
    let tempHTML = '';
    if(value && value.data.features.length){
      tempHTML += `
      <article class="info-section">
      <span>BLIGHT TICKETS</span>`;
      value.data.features.forEach(function(value){
        tempHTML += `
        <div>
          <p><strong>TICKET ID:</strong> ${value.attributes.ticket_number}</p>
          <p><strong>FINE AMOUNT:</strong> $${value.attributes.fine_amount}</p>
          <p><strong>AGENCY NAME:</strong> ${value.attributes.agency_name}</p>
          <p><strong>DISPOSITION:</strong> ${value.attributes.disposition}</p>
          <p><strong>DESCRIPTION:</strong> ${value.attributes.violation_description}</p>
          <p><strong>HEARING DATE:</strong> ${moment(value.attributes.hearing_date).format('MMM DD, YYYY')}</p>
          <p><strong>HEARING TIME:</strong> ${value.attributes.hearing_time}</p>
        </div>
        `;
      });
      tempHTML += `<h4><a href="https://data.detroitmi.gov/datasets/blight-violations" target="_blank">MORE INFO</a></h4></article>`;
    }else{
      tempHTML += `
      <article class="info-section">
      <span>BLIGHT TICKETS</span>
      <div>
        <p>NO BLIGHT TICKETS FOUND</p>
      </div>
      </article>`;
    }
    return tempHTML;
  }

  buildPermit(value){
    let tempHTML = '';
    if(value && value.data.features.length){
      tempHTML += `
        <article class="info-section">
        <span>BUILDING PERMITS</span>`;
      value.data.features.forEach(function(value){
        tempHTML += `
        <div>
          <p><strong>PERMIT NUMBER:</strong> ${value.attributes.record_id}</p>
          <p><strong>PERMIT TYPE:</strong> ${value.attributes.permit_type}</p>
          <p><strong>PERMIT BUILDING TYPE:</strong> ${value.attributes.type_of_construction}</p>
          <p><strong>PERMIT STATUS:</strong> ${value.attributes.status}</p>
          <p><strong>PERMIT ISSUED:</strong> ${moment(value.attributes.permit_issue_date).format('MMM DD, YYYY')}</p>
          <p><strong>PERMIT EXPIRED:</strong> ${moment(value.attributes.date_expiration).format('MMM DD, YYYY')}</p>
          <p><strong>PERMIT DESCRIPTION:</strong> ${value.attributes.description_of_work}</p>
        </div>
        `;
      });
      tempHTML += `<h4><a href="https://data.detroitmi.gov/datasets/building-permits" target="_blank">MORE INFO</a></h4>
      </article>`;
    }else{
      tempHTML += `
      <article class="info-section">
        <span>BUILDING PERMITS</span>
      <div>
        <p>NO BUILDING PERMITS FOUND</p>
      </div>
      </article>`;
    }
    return tempHTML;
  }

  buildDemoStatus(value){
    let tempHTML = '';
    if(value.data.features.length){
      tempHTML = `<article class="info-section">
    <span>DEMOLITION STATUS</span>`;
    value.data.features.forEach(function(value){
      tempHTML += `
        <div>
          <p><STRONG>WARNING!</STRONG></p>
          <p>THIS PROPERTY IS SCHEDULED FOR DEMOLITION</p> 
          ${(value.attributes.demolish_by_date == null) ? `Date to be determined`:`<p><strong>${moment(value.attributes.demolish_by_date).format('MMM DD, YYYY')}</stron></p>`}
        </div>
      `;
    });
    tempHTML += `
    <h4><a href="https://data.detroitmi.gov/datasets/demolitions-under-contract" target="_blank">MORE INFO</a></h4>
    </article>`;
    }

    return tempHTML;
  }

  buildDemosNear(value){
    let tempHTML = '';
    if(value.data.features.length){
      value.data.features.forEach(function(value){
        tempHTML += `
        <article class="info-section">
        <span>DEMOLITIONS NEAR YOU</span>
        <div>
          <p><strong>ADDRESS:</strong> ${value.attributes.address}</p>
          <p><strong>COMMERCIAL:</strong> ${value.attributes.commercial_building}</p>
          <p><strong>PRICE:</strong> $${parseInt(value.attributes.price).toLocaleString()}</p>
          <p><strong>PARCEL:</strong> ${value.attributes.parcel_id}</p>
          <p><strong>CONTRACTOR:</strong> ${value.attributes.contractor_name}</p>
          <p><strong>COUNCIL DISTRICT:</strong> ${value.attributes.council_district}</p>
          <p><strong>NEIGHBORHOOD:</strong> ${value.attributes.neighborhood}</p>
          <p><strong>EXPECTED DATE:</strong> ${moment(value.attributes.demolish_by_date).format('MMM DD, YYYY')}</p>
        </div>`;
      });
      tempHTML += `
      <h4><a href="https://data.detroitmi.gov/datasets/demolitions-under-contract" target="_blank">MORE INFO</a></h4>
      </article>`;
    }else{
      tempHTML += `
      <article class="info-section">
      <span>DEMOLITIONS NEAR YOU</span>
      <div>
        <p>NO DEMOLITIONS FOUND</p>
      </div>
      </article>`;
    }
    return tempHTML;
  }

  buildImproveDet(value){
    let tempHTML = '';
    if(value.data.features.length){
      tempHTML += `
      <article class="info-section">
      <span>IMPROVE DETROIT ISSUES NEAR YOU</span>`;
      value.data.features.forEach(function(value){
        tempHTML += `
        <div>
          <p><strong>ID:</strong> <a href="${value.attributes.web_url}" target="_blank">${value.attributes.id}</a></p>
          <p><strong>TYPE:</strong> ${value.attributes.request_type_title}</p>
          <p><strong>STATUS:</strong> ${value.attributes.status}</p>
          <p><strong>REPORTED ON:</strong> ${moment(value.attributes.created_at).format('MMM DD, YYYY')}</p>
        </div>`;
      });
      tempHTML += `
      <h4>
      <a href="https://seeclickfix.com/enhanced_watch_areas/674" target="_blank">MORE INFO</a>
      <a href="/webapp/improve-detroit-report-issue-online" target="_blank">REPORT ISSUE</a>
      </h4>
      </article>`;
    }else{
      tempHTML += `
      <article class="info-section">
      <span>IMPROVE DETROIT</span>
      <div>
        <p>NO IMPROVE DETROIT ISSUES</p>
      </div>
      </article>`;
    }
    return tempHTML;
  }

  createMarkup(values, controller){
    let tempHTML = '';
    for (const [key, value] of Object.entries(values)) {
      switch (key) {
        case 'council':
          tempHTML += controller.panel.buildCouncil(values.councilData);
          break;

        case 'neighborhood':
          tempHTML += controller.panel.buildNeighborhood(value);
          break;

        case 'assessors-data':
          tempHTML += controller.panel.buildAssessors(value);
          break;

        case 'permit-data':
          tempHTML += controller.panel.buildPermit(value);
          break;

        case 'rental-data':
          tempHTML += controller.panel.buildRental(value, values);
          break;

        case 'blight-data':
          tempHTML += controller.panel.buildBlight(value);
          break;

        case 'demos-data':
          tempHTML += controller.panel.buildDemosNear(value);
          break;

        case 'demo-status':
          tempHTML += controller.panel.buildDemoStatus(value);
          break;

        case 'npo':
          tempHTML += controller.panel.buildNPO(value);
          break;

        case 'improve-det':
          tempHTML += controller.panel.buildImproveDet(value);
          break;

        case 'recycling':
          tempHTML += controller.panel.buildRecycling(value);
          break;

        case 'historicDistrict':
          tempHTML += controller.panel.buildHistoricDistrict(value);
          break;
      
        default:
          break;
      }
    }
    return tempHTML;
  }
}