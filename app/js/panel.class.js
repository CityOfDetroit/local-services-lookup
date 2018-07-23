'use strict';
const moment = require('moment');
export default class Panel {
  constructor() {
  }

  createLoader(){
    document.querySelector('.local-address').innerHTML = ``;
  }

  creatPanel(data, controller){
    console.log(data);
    
    let markup = controller.panel.createMarkup(data.dataSets, controller);
    document.querySelector('#geocoder input').value = ``;
    document.querySelector('.local-address').innerHTML = `INFO FOR: ${data.title}`;
    document.querySelector('#local-services-results .local-content').innerHTML = markup;
    document.getElementById('local-services-results').className = 'active';
  }

  createErrorPanel(address){
    document.querySelector('.local-address').innerHTML = `INFO FOR: ${address}`;
    document.querySelector('#local-services-results .local-content').innerHTML = `
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
    <p>Your address has been reported. Thank you for your patience.</p>
    `;
    document.getElementById('local-services-results').className = 'active';
  }

  createMarkup(values, controller){
    let siteURL = window.location.hostname;
    let tempHTML = `
    <article class="info-section">
      <span>GOVERNMENT</span>`;
    if(Object.keys(values[0].data).length != 0 && values[0].data.constructor === Object){
      tempHTML += `
        <div>
          <p><strong>COUNCIL:</strong> <a href="${values[0].data.districtURL}" target="_blank">${values[0].data.district}</a></p>
          <p><strong>COUNCIL MEMBER:</strong> <a href="http://${siteURL}${values[0].data.council.url}" target="_blank">${values[0].data.council.name}</a></p>
          <p><strong>COUNCIL MEMBER PHONE:</strong> ${values[0].data.council.phone}</p>
          <p><strong>DISTRICT MANAGER:</strong> <a href="${values[0].data.dmanager.url}" target="_blank">${values[0].data.dmanager.name}</a></p>
          <p><strong>DISTRICT MANAGER PHONE:</strong> ${values[0].data.dmanager.phone}</p>
          <p><strong>DEPUTY MANAGER:</strong> <a href="${values[0].data.ddmanager.url}" target="_blank">${values[0].data.ddmanager.name}</a></p>
          <p><strong>DEPUTY MANAGER PHONE:</strong> ${values[0].data.ddmanager.phone}</p>
          ${values[0].data.enforcement.map(inspector =>
            `
            <p><strong>ENFORCEMENT INSPECTOR:</strong> ${inspector.name}</p>
            <p><strong>ENFORCEMENT INSPECTOR EMAIL:</strong> <a href="mailto:${inspector.email}">${inspector.email}</a></p>
            <p><strong>ENFORCEMENT INSPECTOR PHONE:</strong> ${inspector.phone}</p>
            `
          ).join('')}
        </div>
      </article>`;
    }else{
      tempHTML += `
        <div>
          <p>NO GOVERNMENT INFO FOUND</p>
        </div>
      </article>`;
    }
    if(Object.keys(values[1].data).length != 0 && values[1].data.constructor === Object){
      tempHTML += `
      <article class="info-section">
        <span>NEIGHBORHOOD</span>
        <div>
          <p><strong>NAME:</strong> ${values[1].data.features[0].attributes.NHood_Name}</p>
        </div>
      </article>`;
    }else{
      tempHTML += `
      <article class="info-section">
        <span>NEIGHBORHOOD</span>
        <div>
          <p>NO NEIGHBORHOOD FOUND</p>
        </div>
      </article>`;
    }
    if(Object.keys(values[7].data).length != 0 && values[7].data.constructor === Object){
      tempHTML += `
      <article class="info-section">
        <span>POLICE</span>
        <div>
          <h5>NEIGHBORHOOD POLICE OFFICER (NPO)</h5>
          <p><strong>NAME:</strong> ${values[7].data.features[0].attributes.NPO_Office}</p>
          <p><strong>PHONE:</strong> ${values[7].data.features[0].attributes.Phone}</p>
          <p><strong>Email:</strong> ${values[7].data.features[0].attributes.Email}</p>
        </div>`;
      if(values[7].data.features[0].attributes.Sgt_Phone != "0"){
        tempHTML += `
        <div>
          <h5>SERGEANT</h5>
          <p><strong>NAME:</strong> ${values[7].data.features[0].attributes.Sergeant}</p>
          <p><strong>PHONE:</strong> ${values[7].data.features[0].attributes.Sgt_Phone}</p>
        </div>`;
      }
      tempHTML += `</article>`;
    }else{
      tempHTML += `
      <article class="info-section">
        <span>POLICE</span>
        <div>
          <p>NO POLICE INFO FOUND</p>
        </div>
      </article>`;
    }
    if(Object.keys(values[9].data).length != 0 && values[9].data.constructor === Object){
      let contractorInfo = {
        name: null,
        url: null,
        phone: null
      };
      if(values[9].data.next_pickups.trash.contractor === 'gfl'){
        contractorInfo.name = 'GFL';
        contractorInfo.url =  'http://gflusa.com/residential/detroit/';
        contractorInfo.phone = '(844) 464-3587';
      }else{
        contractorInfo.name = 'ADVANCED';
        contractorInfo.url =  'http://www.advanceddisposal.com/mi/detroit/detroit-residential-collection';
        contractorInfo.phone = ' (844) 233-8764';
      }
      tempHTML += `
      <article class="info-section">
        <span>TRASH & RECYCLING</span>
        <div>
          <p><strong>PROVIDER:</strong> <a href="${contractorInfo.url}" target="_blank">${contractorInfo.name}</a> ${contractorInfo.phone}</p>
          <p><strong>NEXT TRASH:</strong> ${moment(values[9].data.next_pickups.trash.next_pickup).format('MMM DD, YYYY')}</p>
          <p><strong>NEXT RECYCLING:</strong> ${moment(values[9].data.next_pickups.recycling.next_pickup).format('MMM DD, YYYY')}</p>
          <p><strong>NEXT BULK:</strong> ${moment(values[9].data.next_pickups.bulk.next_pickup).format('MMM DD, YYYY')}</p>`;
      if('yard waste' in values[9].data.next_pickups){
        tempHTML += `<p><strong>NEXT YARD:</strong> ${moment(values[9].data.next_pickups['yard waste'].next_pickup).format('MMM DD, YYYY')}</p>`;
      }
      tempHTML += `</div>
      <h4><a href="/webapp/waste-pickup-map" target="_blank">MORE INFO</a></h4>
      </article>`;
    }else{
      tempHTML += `
      <article class="info-section">
        <span>TRASH & RECYCLING</span>
        <div>
          <p>NO TRASH & RECYCLING INFO FOUND</p>
        </div>
      </article>`;
    }
    if(Object.keys(values[2].data).length != 0 && values[2].data.constructor === Object){
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
          <p><strong>CITY:</strong> ${values[2].data.ownercity}</p>
          <p><strong>STATE:</strong> ${values[2].data.ownerstate}</p>
          <p><strong>ADDRESS:</strong> ${values[2].data.ownerstreetaddr}</p>
          <p><strong>ZIP:</strong> ${values[2].data.ownerzip}</p>
        </div>
      </article>`;
      if(values[2].data.resb_bldgclass === 0){
        property.year = values[2].data.cib_yearbuilt;
        property.value = values[2].data.cib_value;
        property.floor = values[2].data.cib_yearbuilt;
        property.buildingClass = values[2].data.cib_yearbuilt;
      }else{
        property.year = values[2].data.resb_yearbuilt;
        property.value = values[2].data.resb_value;
        property.floor = values[2].data.resb_floorarea;
        property.buildingClass = values[2].data.resb_bldgclass;
      }
      tempHTML += `
      <article class="info-section">
        <span>PROPERTY</span>
        <div>
          <p><strong>PARCEL NUMBER:</strong> ${values[2].data.pnum}</p>
          <p><strong>YEAR BUILD:</strong> ${property.year}</p>
          <p><strong>CALCULATED VALUE:</strong> $${property.value.toLocaleString()}</p>
          <p><strong>FLOOR AREA:</strong> ${property.floor.toLocaleString()} SQFT</p>
          <p><strong>BUILDING CLASS:</strong> ${property.buildingClass}</p>
        </div>
      </article>
      <article class="info-section">
      <span>RENTAL ENFORCEMENT STATUS</span>`;
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
      </article>
      <article class="info-section">
      <span>RENTAL ENFORCEMENT STATUS</span>`;
    }
    if(values[10].data.features.length){
      values[10].data.features.forEach(function(value){
        tempHTML += `
        <div>
          <p><strong>REGISTER:</strong> ${moment(value.properties.csa_date3).format('MMM DD, YYYY')}</p>
          <p><strong>CERTIFIED:</strong> ${values[11].data.features.length ? `${moment(values[11].data.features[0].properties.csa_date3).format('MMM DD, YYYY')}` : `Not certified`}</p>
        </div>
        `;
      });
      tempHTML += `<h4><a href="/departments/buildings-safety-engineering-and-environmental-department/property-maintenance-division/rental-property" target="_blank">MORE INFO</a></h4>`;
    }else{
      tempHTML += `
      <div>
        <p><strong>REGISTER:</strong> Not registered</p>
        <p><strong>CERTIFIED:</strong> Not certified</p>
      </div>`;
    }
    tempHTML += `</article>
    <article class="info-section">
    <span>BLIGHT TICKETS</span>`;
    if(values[4].data.length){
      values[4].data.forEach(function(value){
        tempHTML += `
        <div>
          <p><strong>TICKET ID:</strong> ${value.ticket_id}</p>
          <p><strong>FINE AMOUNT:</strong> $${value.fine_amount}</p>
          <p><strong>AGENCY NAME:</strong> ${value.agency_name}</p>
          <p><strong>DISPOSITION:</strong> ${value.disposition}</p>
          <p><strong>DESCRIPTION:</strong> ${value.violation_description}</p>
          <p><strong>HEARING DATE:</strong> ${moment(value.hearing_date).format('MMM DD, YYYY')}</p>
          <p><strong>HEARING TIME:</strong> ${value.hearing_time}</p>
        </div>
        `;
      });
      tempHTML += `<h4><a href="https://data.detroitmi.gov/resource/s7hj-n86v" target="_blank">MORE INFO</a></h4>`;
    }else{
      tempHTML += `
      <div>
        <p>NO BLIGHT TICKETS FOUND</p>
      </div>`;
    }
    tempHTML += `</article>
    <article class="info-section">
    <span>PROPERTY SALES HISTORY</span>`;
    if(values[5].data.length){
      values[5].data.forEach(function(value){
        tempHTML += `
        <div>
          <p><strong>SALE DATE:</strong> ${moment(value.sale_date).format('MMM DD, YYYY')}</p>
          <p><strong>SALE PRICE:</strong> $${parseInt(value.sale_price).toLocaleString()}</p>
        </div>
        `;
      });
      tempHTML += `<h4><a href="https://data.detroitmi.gov/resource/9xku-658c" target="_blank">MORE INFO</a></h4>`;
    }else{
      tempHTML += `
      <div>
        <p>NO PROPERTY SALES HISTORY FOUND</p>
      </div>`;
    }
    tempHTML += `</article>
    <article class="info-section">
    <span>BUILDING PERMITS</span>`;
    if(values[3].data.length){
      values[3].data.forEach(function(value){
        tempHTML += `
        <div>
          <p><strong>PERMIT NUMBER:</strong> ${value.permit_no}</p>
          <p><strong>PERMIT TYPE:</strong> ${value.bld_permit_type}</p>
          <p><strong>PERMIT BUILDING TYPE:</strong> ${value.residential}</p>
          <p><strong>PERMIT STATUS:</strong> ${value.permit_status}</p>
          <p><strong>PERMIT ISSUED:</strong> ${moment(value.permit_issued).format('MMM DD, YYYY')}</p>
          <p><strong>PERMIT EXPIRED:</strong> ${moment(value.permit_expire).format('MMM DD, YYYY')}</p>
          <p><strong>PERMIT DESCRIPTION:</strong> ${value.bld_permit_desc}</p>
        </div>
        `;
      });
      tempHTML += `<h4><a href="https://data.detroitmi.gov/resource/but4-ky7y" target="_blank">MORE INFO</a></h4>`;
    }else{
      tempHTML += `
      <div>
        <p>NO BUILDING PERMITS FOUND</p>
      </div>`;
    }
    tempHTML += `</article>`;
    if(values[12].data.length){
      tempHTML += `<article class="info-section">
      <span>DEMOLITION STATUS</span>`;
      values[12].data.forEach(function(value){
        console.log(value);
        
        tempHTML += `
          <div>
            <p><STRONG>WARNING!</STRONG></p>
            <p>SQUEDULED FOR DEMOLITION ON</p> 
            <p><strong>${moment(value.demolish_by_date).format('MMM DD, YYYY')}</stron></p>
          </div>
        `;
      });
      tempHTML += `
      <h4><a href="https://data.detroitmi.gov/resource/nfx3-ihbp" target="_blank">MORE INFO</a></h4>
      </article>`;
    }
    tempHTML += `
    <article class="info-section">
    <span>DEMOLITIONS NEAR YOU</span>`;
    if(values[6].data.length){
      values[6].data.forEach(function(value){
        tempHTML += `
        <div>
          <p><strong>ADDRESS:</strong> ${value.address}</p>
          <p><strong>COMMERCIAL:</strong> ${value.commercial}</p>
          <p><strong>PRICE:</strong> $${parseInt(value.price).toLocaleString()}</p>
          <p><strong>PARCEL:</strong> ${value.parcel_id}</p>
          <p><strong>CONTRACTOR:</strong> ${value.contractor_name}</p>
          <p><strong>COUNCIL DISTRICT:</strong> ${value.council_district}</p>
          <p><strong>NEIGHBORHOOD:</strong> ${value.neighborhood}</p>
          <p><strong>EXPECTED DATE:</strong> ${moment(value.demolish_by_date).format('MMM DD, YYYY')}</p>
        </div>`;
      });
      tempHTML += `
      <h4><a href="https://data.detroitmi.gov/resource/nfx3-ihbp" target="_blank">MORE INFO</a></h4>
      </article>`;
    }else{
      tempHTML += `
      <div>
        <p>NO DEMOLITIONS FOUND</p>
      </div>
      </article>`;
    }
    if(values[8].data.length){
      tempHTML += `
      <article class="info-section">
      <span>IMPROVE DETROIT ISSUES NEAR YOU</span>`;
      values[8].data.forEach(function(value){
        tempHTML += `
        <div>
          <p><strong>ID:</strong> <a href="${value.web_url}" target="_blank">${value.id}</a></p>
          <p><strong>TYPE:</strong> ${value.request_type_title}</p>
          <p><strong>STATUS:</strong> ${value.status}</p>
          <p><strong>REPORTED ON:</strong> ${moment(value.created_at).format('MMM DD, YYYY')}</p>
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
}
