'use strict';
const moment = require('moment');
export default class Panel {
  constructor() {
  }

  creatPanel(data, controller){
    console.log(data);
    let markup = controller.panel.createMarkup(data.dataSets, controller);
    document.querySelector('.local-address').innerText = `INFO FOR: ${data.title}`;
    document.querySelector('#local-services-results .local-content').innerHTML = markup;
    document.getElementById('local-services-results').className = 'active';
  }
  createMarkup(values, controller){
    console.log(values);
    let siteURL = window.location.hostname;
    let tempHTML = `
    <article class="info-section">
      <span>GOVERNMENT</span>`;
    if(Object.keys(values[0].data).length != 0 && values[0].data.constructor === Object){
      tempHTML += `
        <div>
          <p><strong>COUNCIL:</strong> <a href="${values[0].data.districtURL}" target="_blank">${values[0].data.district}</a></p>
          <p><strong>COUNCIL MEMBER:</strong> <a href="http://${siteURL}${values[0].data.council.url}" target="_blank">${values[0].data.council.name}</a></p>
          <p><strong>DISTRICT MANAGER:</strong> <a href="${values[0].data.dmanager.url}" target="_blank">${values[0].data.dmanager.name}</a></p>
          <p><strong>DISTRICT MANAGER PHONE:</strong> ${values[0].data.dmanager.phone}</p>
          <p><strong>DEPUTY MANAGER:</strong> <a href="${values[0].data.ddmanager.url}" target="_blank">${values[0].data.ddmanager.name}</a></p>
          <p><strong>DEPUTY MANAGER PHONE:</strong> ${values[0].data.ddmanager.phone}</p>
        </div>
      </article>`;
    }else{
      tempHTML += `
        <div>
          <p>NO GOVERNMENT INFO</p>
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
          <p>NO NEIGHBORHOOD INFO</p>
        </div>
      </article>`;
    }
    if(Object.keys(values[2].data).length != 0 && values[2].data.constructor === Object){
      tempHTML += `
      <article class="info-section">
        <span>OWNER</span>
        <div>
          <p><strong>NAME:</strong> ${values[2].data.ownername1}</p>
          <p><strong>CITY:</strong> ${values[2].data.ownercity}</p>
          <p><strong>STATE:</strong> ${values[2].data.ownerstate}</p>
          <p><strong>ADDRESS:</strong> ${values[2].data.ownerstreetaddr}</p>
          <p><strong>ZIP:</strong> ${values[2].data.ownerzip}</p>
        </div>
      </article>
      <article class="info-section">
        <span>PROPERTY</span>
        <div>
          <p><strong>PARCEL NUMBER:</strong> ${values[2].data.pnum}</p>
          <p><strong>YEAR BUILD:</strong> ${values[2].data.resb_yearbuilt}</p>
          <p><strong>CALCULATED VALUE:</strong> $${values[2].data.resb_value.toLocaleString()}</p>
          <p><strong>FLOOR AREA:</strong> ${values[2].data.resb_floorarea} SQFT</p>
          <p><strong>BASEMENT AREA:</strong>  ${values[2].data.resb_basementarea} SQFT</p>
          <p><strong>BUILDING CLASS:</strong> ${values[2].data.resb_bldgclass}</p>
          <p><strong>EXTERIOR:</strong> ${values[2].data.resb_exterior}</p>
        </div>
      </article>
      <article class="info-section">
      <span>BLIGHT TICKETS</span>`;
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
          <p>NO PROPERTY INFO</p>
        </div>
      </article>
      <article class="info-section">
      <span>BLIGHT TICKETS</span>`;
    }
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
    }else{
      tempHTML += `
      <div>
        <p>NO BLIGHT TICKETS</p>
      </div>`;
    }
    tempHTML += `</article>
    <article class="info-section">
    <span>PROPERTY SALES HISTORY</span>`;
    if(values[5].data.length){
      values[5].data.forEach(function(value){
        tempHTML += `
        <div>
          <p><strong>SALE ID:</strong> ${value.id}</p>
          <p><strong>SALE DATE:</strong> ${moment(value.sale_date).format('MMM DD, YYYY')}</p>
          <p><strong>SALE PRICE:</strong> $${value.sale_price}</p>
          <p><strong>SALE NUMBER:</strong> ${value.sale_number}</p>
          <p><strong>INSTRUMENT:</strong> ${value.instrument}</p>
          <p><strong>TERMS:</strong> ${value.terms}</p>
        </div>
        `;
      });
    }else{
      tempHTML += `
      <div>
        <p>NO PROPERTY SALES HISTORY</p>
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
    }else{
      tempHTML += `
      <div>
        <p>NO BUILDING PERMITS</p>
      </div>`;
    }
    tempHTML += `</article>
    <article class="info-section">
    <span>DEMOLITIONS</span>`;
    if(values[6].data.length){
      values[6].data.forEach(function(value){
        tempHTML += `
        <div>
          <p><strong>ADDRESS:</strong> ${value.address}</p>
          <p><strong>COMMERCIAL:</strong> ${value.commercial}</p>
          <p><strong>PRICE:</strong> $${value.price}</p>
          <p><strong>PARCEL:</strong> ${value.parcel_id}</p>
          <p><strong>CONTRACTOR:</strong> ${value.contractor_name}</p>
          <p><strong>COUNCIL DISTRICT:</strong> ${value.council_district}</p>
          <p><strong>NEIGHBORHOOD:</strong> ${value.neighborhood}</p>
          <p><strong>DATE:</strong> ${moment(value.demolition_date).format('MMM DD, YYYY')}</p>
        </div>
        `;
      });
    }else{
      tempHTML += `
      <div>
        <p>NO DEMOLITIONS</p>
      </div>`;
    }
    tempHTML += `</article>`;
    return tempHTML;
  }
}
