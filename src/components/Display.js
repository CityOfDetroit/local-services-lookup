'use strict';
import neighborhoodImage from '../images/neighborhood.png';
export default class Display extends HTMLElement {
    static get observedAttributes() {
        return ['data-display-type'];
    }

    constructor() {
        // Always call super first in constructor
        super();
    
        // Create a shadow root
        const shadow = this.attachShadow({mode: 'open'});

        // Creating images
        this.neighborhoodImage = document.createElement('img');
        this.neighborhoodImage.src = neighborhoodImage;
        this.neighborhoodImage.setAttribute('alt', '');

        // Creating display styles
        this.welcomeStyle = document.createElement('style');
        this.welcomeStyle.textContent = `
            #display-wrapper { display: flex; padding: 1em; flex-wrap: wrap;}
            #display-wrapper > img { max-width: 100%; }
            #display-wrapper p { text-align: center; }
            #display-wrapper button { padding: 1em 2em;  background-color: #004445; color: #fff; border: none; cursor: pointer }
            p.display-title { font-weight: bold; font-size: 1.25em; }
            #data-results{ width: 100%}
        `;

        this.loadingStyle = document.createElement('style');
        this.loadingStyle.textContent = `
        .loader-box{
            display: flex;
            width: 100%;
            height: 100%;
            background-color: rgba(255, 255, 255, .75);
            position: absolute;
            left: -0.2em;
            top: -0.2em;
        }
        .loader-container{
            margin: auto;
        }
        .loader {
            position: relative;
            width: 75px;
            height: 100px;
       }
        .loader__bar {
            position: absolute;
            bottom: 0;
            width: 10px;
            height: 50%;
            background: #ea4961;
            transform-origin: center bottom;
            box-shadow: 1px 1px 0 rgba(0, 0, 0, .2);
       }
        .loader__bar:nth-child(1) {
            left: 0px;
            transform: scale(1, 0.2);
            animation: barUp1 4s infinite;
       }
        .loader__bar:nth-child(2) {
            left: 20px;
            transform: scale(1, 0.4);
            animation: barUp2 4s infinite;
       }
        .loader__bar:nth-child(3) {
            left: 40px;
            transform: scale(1, 0.6);
            animation: barUp3 4s infinite;
       }
        .loader__bar:nth-child(4) {
            left: 60px;
            transform: scale(1, 0.8);
            animation: barUp4 4s infinite;
       }
        .loader__bar:nth-child(5) {
            left: 80px;
            transform: scale(1, 1);
            animation: barUp5 4s infinite;
       }
        .loader__ball {
            position: absolute;
            bottom: 10px;
            left: 0;
            width: 10px;
            height: 10px;
            background: #ea4961;
            border-radius: 50%;
            animation: ball 4s infinite;
       }
        @keyframes ball {
            0% {
                transform: translate(0, 0);
           }
            5% {
                transform: translate(10px, -14px);
           }
            10% {
                transform: translate(20px, -10px);
           }
            17% {
                transform: translate(30px, -24px);
           }
            20% {
                transform: translate(40px, -20px);
           }
            27% {
                transform: translate(50px, -34px);
           }
            30% {
                transform: translate(60px, -30px);
           }
            37% {
                transform: translate(70px, -44px);
           }
            40% {
                transform: translate(80px, -40px);
           }
            50% {
                transform: translate(80px, 0);
           }
            57% {
                transform: translate(70px, -14px);
           }
            60% {
                transform: translate(60px, -10px);
           }
            67% {
                transform: translate(50px, -24px);
           }
            70% {
                transform: translate(40px, -20px);
           }
            77% {
                transform: translate(30px, -34px);
           }
            80% {
                transform: translate(20px, -30px);
           }
            87% {
                transform: translate(10px, -44px);
           }
            90% {
                transform: translate(0, -40px);
           }
            100% {
                transform: translate(0, 0);
           }
       }
        @keyframes barUp1 {
            0% {
                transform: scale(1, 0.2);
           }
            40% {
                transform: scale(1, 0.2);
           }
            50% {
                transform: scale(1, 1);
           }
            90% {
                transform: scale(1, 1);
           }
            100% {
                transform: scale(1, 0.2);
           }
       }
        @keyframes barUp2 {
            0% {
                transform: scale(1, 0.4);
           }
            40% {
                transform: scale(1, 0.4);
           }
            50% {
                transform: scale(1, 0.8);
           }
            90% {
                transform: scale(1, 0.8);
           }
            100% {
                transform: scale(1, 0.4);
           }
       }
        @keyframes barUp3 {
            0% {
                transform: scale(1, 0.6);
           }
            100% {
                transform: scale(1, 0.6);
           }
       }
        @keyframes barUp4 {
            0% {
                transform: scale(1, 0.8);
           }
            40% {
                transform: scale(1, 0.8);
           }
            50% {
                transform: scale(1, 0.4);
           }
            90% {
                transform: scale(1, 0.4);
           }
            100% {
                transform: scale(1, 0.8);
           }
       }
        @keyframes barUp5 {
            0% {
                transform: scale(1, 1);
           }
            40% {
                transform: scale(1, 1);
           }
            50% {
                transform: scale(1, 0.2);
           }
            90% {
                transform: scale(1, 0.2);
           }
            100% {
                transform: scale(1, 1);
           }
       }       
        `;

        this.resultsStyle = document.createElement('style');
        this.resultsStyle.textContent = `
          #data-results { background-color: #e6e6e6 }
          .data-title { font-weight: bold; border-left: solid .2em #FEB70D; padding: .25em; margin: 0 }
          .result-address {background-color: #fff; border: solid 0.1em; padding: 0.5em;}
          .data-block-title { padding: .25em; background-color: #FEB70D; }
          .data-block-content { padding: .25em; margin-bottom: .5em; background-color: #fff}
        `;

        // Start loading display content
        this.loadDisplay(this);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Display - attribute: ${name}, old: ${oldValue}, new: ${newValue}`);
        if(newValue == 'results'){
            this.clearDisplay(this);
        }
        this.loadDisplay(this);
    }

    clearDisplay(display) {
        console.log('clearing display');
        const shadow = display.shadowRoot;
        while (shadow.firstChild) {
            shadow.removeChild(shadow.firstChild);
        }
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
    
      buildDWSDBackupProtection(values){
        let tempHTML = '';
        let validNeighborhoods = ['Aviation Sub', 'Barton-McFarland', 'Chadsey Condon', 'Cornerstone Village', 'East English Village', 'Morningside', 'Jefferson Chalmers', 'Warrendale', 'Victoria Park', 'Moross-Morang', 'Garden View'];
        if(values['neighborhood'] && values['neighborhood'].data.features.length){
          if (validNeighborhoods.includes(values['neighborhood'].data.features[0].attributes.nhood_name)){
            tempHTML = `
            <article class="info-section">
              <span>DWSD Basement Backup Protection Program</span>
              <div>
                <p>You qualify for the DWSD Basement Backup Protection Program.</p>
                <a href="https://app.smartsheet.com/b/form/509cb1e905a74948bce7b0135da53277?Property%20Street%20Address=${values.title}&Property%20City=Detroit&Property%20Zip%20Code=${values['assessors-data'].data.zipcode}&Neighborhood=${values['neighborhood'].data.features[0].attributes.nhood_name}" target="_blank"><button>Apply Now</button></a>
              </div>
            </article>`;
          }else{
            tempHTML = `
            <article class="info-section">
              <span>DWSD Basement Backup Protection Program</span>
              <div>
                <p>You don't qualify for the Basement Backup Protection Program. To learn more please <a href="https://detroitmi.gov/departments/water-and-sewerage-department/dwsd-resources/basement-flooding-protection">visit our page.</a></p>
              </div>
            </article>`;
          }
        }else if(values['DWSDBackupProtection'] && values['DWSDBackupProtection'].data.features.length){
          if (validNeighborhoods.includes(values['DWSDBackupProtection'].data.features[0].attributes.nhood_name)){
            tempHTML = `
            <article class="info-section">
              <span>DWSD Basement Backup Protection Program</span>
              <div>
                <p>You qualify for the DWSD Basement Backup Protection Program.</p>
                <a href="https://app.smartsheet.com/b/form/509cb1e905a74948bce7b0135da53277?Property%20Street%20Address=${values.title}&Property%20City=Detroit&Property%20Zip%20Code=${values['assessors-data'].data.zipcode}&Neighborhood=${values['DWSDBackupProtection'].data.features[0].attributes.nhood_name}" target="_blank"><button>Apply Now</button></a>
              </div>
            </article>`;
          }else{
            tempHTML = `
            <article class="info-section">
              <span>DWSD Basement Backup Protection Program</span>
              <div>
                <p>You don't qualify for the Basement Backup Protection Program. To learn more please <a href="https://detroitmi.gov/departments/water-and-sewerage-department/dwsd-resources/basement-flooding-protection">visit our page.</a></p>
              </div>
            </article>`;
          }
        }else{
          tempHTML = `
          <article class="info-section">
            <span>DWSD Basement Backup Protection Program</span>
            <div>
              <p>You don't qualify for the Basement Backup Protection Program. To learn more please <a href="https://detroitmi.gov/departments/water-and-sewerage-department/dwsd-resources/basement-flooding-protection">visit our page.</a></p>
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
    
      buildNEZ(nez, nezOld){
        let tempHTML = '';
    
        if(Object.keys(nez.data).length != 0 && nez.data.constructor === Object && nez.data.features.length > 0){
          if(Object.keys(nezOld.data).length != 0 && nezOld.data.constructor === Object && nezOld.data.features.length > 0){
            tempHTML = `
            <article class="info-section">
              <span>CURRENT NEZ HOMESTEAD ZONE</span>
              <div>
                <p><strong>NAME:</strong> ${nezOld.data.features[0].attributes.id}</p>
                <p><strong>ID:</strong> ${nezOld.data.features[0].attributes.nezname}</p>
                <p><a href="https://data.detroitmi.gov/datasets/nez-h-districts/explore" target="_blank">View Map</a>
              </div>
              <span>NEW NEZ HOMESTEAD ZONE</span>
              <div>
                <p><strong>NAME:</strong> ${nez.data.features[0].attributes.RNNAME}</p>
                <p><strong>ID:</strong> ${nez.data.features[0].attributes.RID}</p>
                <p class="noprint"><a href="https://data.detroitmi.gov/datasets/proposed-nez-homestead-2021/explore" target="_blank">View Map</a>
              </div>
            </article>`;
          }else{
            tempHTML = `
            <article class="info-section">
              <span>Current NEZ HOMESTEAD ZONE</span>
              <div>
                <p>NO CURRENT NEZ HOMESTEAD ZONE FOUND.</p>
                <p class="noprint"><a href="https://data.detroitmi.gov/datasets/nez-h-districts/explore" target="_blank">View Map</a>
              </div>
              <span>NEW NEZ HOMESTEAD ZONE</span>
              <div>
                <p><strong>NAME:</strong> ${nez.data.features[0].attributes.RNNAME}</p>
                <p><strong>ID:</strong> ${nez.data.features[0].attributes.RID}</p>
                <p class="noprint"><a href="https://data.detroitmi.gov/datasets/proposed-nez-homestead-2021/explore" target="_blank">View Map</a>
              </div>
            </article>`;
          }
        }else{
          if(Object.keys(nezOld.data).length != 0 && nezOld.data.constructor === Object && nezOld.data.features.length > 0){
            tempHTML = `
            <article class="info-section">
              <span>Current NEZ Homestead Zone</span>
              <div>
                <p><strong>NAME:</strong> ${nezOld.data.features[0].attributes.id}</p>
                <p><strong>ID:</strong> ${nezOld.data.features[0].attributes.nezname}</p>
                <p class="noprint"><a href="https://data.detroitmi.gov/datasets/nez-h-districts/explore" target="_blank">View Map</a>
              </div>
              <span>New NEZ Homestead Zone</span>
              <div>
                <p>NO NEW NEZ HOMESTEAD ZONE FOUND.</p>
                <p class="noprint"><a href="https://data.detroitmi.gov/datasets/proposed-nez-homestead-2021/explore" target="_blank">View Map</a>
              </div>
            </article>`;
          }else{
            tempHTML = `
            <article class="info-section">
              <span>Current NEZ Homestead Zone</span>
              <div>
                <p>NO CURRENT NEZ HOMESTEAD ZONE FOUND.</p>
                <p class="noprint"><a href="https://data.detroitmi.gov/datasets/nez-h-districts/explore" target="_blank">View Map</a>
              </div>
              <span>New NEZ Homestead Zone</span>
              <div>
                <p>NO NEW NEZ HOMESTEAD ZONE FOUND.</p>
                <p class="noprint"><a href="https://data.detroitmi.gov/datasets/proposed-nez-homestead-2021/explore" target="_blank">View Map</a>
              </div>
            </article>`;
          }
        }
        return tempHTML;
      }
    
      buildNRSA(value){
        let tempHTML = '';
        if(Object.keys(value.data).length != 0 && value.data.constructor === Object && value.data.features.length > 0){
          tempHTML = `
          <article class="info-section">
            <span>NEIGHBORHOOD REVITALIZATION STRATEGY AREAS (NRSA)</span>
            <div>
              <p><strong>ZONE:</strong> ${value.data.features[0].attributes.Name}</p>
            </div>
          </article>`;
        }else{
          tempHTML = `
          <article class="info-section">
            <span>NEIGHBORHOOD REVITALIZATION STRATEGY AREAS (NRSA)</span>
            <div>
              <p>NO NRSA FOUND</p>
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
    
      checkRecyclingStatus(data){
        try {
          if(data.next_pickups['yard waste']){
            let yardStart = null;
            let yardEnd = null;
            data.details.forEach((item)=>{
              if(item.type == 'start-date' && item.service == 'yard waste'){
                if(item.normalDay != null){
                  yardStart = item.normalDay;
                }else{
                  yardStart = item.newDay;
                }
              }
              if(item.type == 'end-date' && item.service == 'yard waste'){
                if(item.normalDay != null){
                  yardEnd = item.normalDay;
                }else{
                  yardEnd = item.newDay;
                }
              }
            });
            if(moment(data.next_pickups['yard waste'].next_pickup).isBetween(yardStart, yardEnd)){
              return true;
            }else{
              return false;
            }
          }else{
            return false;
          }
        } catch (error) {
          return false;
        }
      }
    
      buildRecycling(value, panel){
        let tempHTML = '';
        if(Object.keys(value.data).length != 0 && value.data.constructor === Object){
          let contractorInfo = {
            name: null,
            url: null,
            phone: null
          };
          if(value.data.next_pickups.trash.contractor === 'GFL'){
            contractorInfo.name = 'GFL';
            contractorInfo.url =  'http://gflusa.com/residential/detroit/';
            contractorInfo.phone = '(844) 464-3587';
          }else{
            contractorInfo.name = 'WM';
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
              ${(panel.checkRecyclingStatus(value.data)) ?  tempHTML += `<p><strong>NEXT YARD:</strong> ${moment(value.data.next_pickups['yard waste'].next_pickup).format('MMM DD, YYYY')}</p>` : ``}
            </div>
          <h4 class="noprint"><a href="/webapp/waste-pickup-map" target="_blank">MORE INFO</a></h4>
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
        console.log(value);
        let dataParsing = {title: "Assessor's Data", content: null};
        if(value && Object.keys(value.data).length != 0 && value.data.constructor === Object && value.data.detail !== "Not found."){
          let property = {
            year: null,
            value: null,
            floor: null,
            buildingClass: null
          }
          dataParsing.content = `
            <p><strong>Owner's address:</strong> ${value.data.ownerstreetaddr}</p>
            <p><strong>Owner's city:</strong> ${value.data.ownercity}</p>
            <p><strong>Owner's state:</strong> ${value.data.ownerstate}</p>
            <p><strong>Owner's zip:</strong> ${value.data.ownerzip}</p>
          `;
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
          dataParsing.content += `
            <p><strong>Parcel number:</strong> ${value.data.pnum}</p>
            <p><strong>Year build:</strong> ${property.year}</p>
            <p><strong>Calculated value:</strong> $${property.value.toLocaleString()}</p>
            <p><strong>Floor area:</strong> ${property.floor.toLocaleString()} SQFT</p>
            <p><strong>Building class:</strong> ${property.buildingClass}</p>
          `;
        }
        console.log(dataParsing);
        return dataParsing;
      }
    
      buildRental(value, values){
        let tempHTML = '';
        if((value && value.data.features.length) || (values['rental-cert-data'] && values['rental-cert-data'].data.features.length)){
          tempHTML += `
            <article class="info-section">
            <span>RENTAL ENFORCEMENT STATUS</span>
            <div>
              <p><strong>REGISTER:</strong> ${value.data.features.length ? `${moment(value.data.features[0].attributes.date_status).format('MMM DD, YYYY')}` : `Not registered`}</p>
              <p><strong>CERTIFIED:</strong> ${values['rental-cert-data'].data.features.length ? `${moment(values['rental-cert-data'].data.features[0].attributes.issued_date).format('MMM DD, YYYY')}` : `Not certified`}</p>
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
    
      buildFireEscrow(value){
        let tempHTML = '';
        if(value && value.data.features.length){
          tempHTML += `
            <article class="info-section">
            <span>FIRE ESCROW</span>
            <div>
              <p><strong>STATUS:</strong> Fire Escrow found</p>
              <p><a href="https://detroitmi.gov/taxonomy/term/8501"><button>Start Process</button></a></p>
            </div>
            </article>`;
        }else{
          tempHTML += `
          <article class="info-section">
            <span>FIRE ESCROW</span>
            <div>
              <p><strong>STATUS:</strong> Fire Escrow not found</p>
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
          tempHTML += `<h4 class="noprint"><a href="https://data.detroitmi.gov/datasets/blight-violations" target="_blank">MORE INFO</a></h4></article>`;
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
            // <p><strong>PERMIT EXPIRED:</strong> ${moment(value.attributes.date_expiration).format('MMM DD, YYYY')}</p>
            tempHTML += `
            <div>
              <p><strong>PERMIT NUMBER:</strong> ${value.attributes.record_id}</p>
              <p><strong>PERMIT TYPE:</strong> ${value.attributes.permit_type}</p>
              <p><strong>PERMIT BUILDING TYPE:</strong> ${value.attributes.permit_type}</p>
              <p><strong>PERMIT STATUS:</strong> ${value.attributes.status}</p>
              <p><strong>PERMIT ISSUED:</strong> ${moment(value.attributes.issued_date).format('MMM DD, YYYY')}</p>
              
              <p><strong>PERMIT DESCRIPTION:</strong> ${value.attributes.description_of_work}</p>
            </div>
            `;
          });
          tempHTML += `<h4 class="noprint"><a href="https://data.detroitmi.gov/datasets/building-permits" target="_blank">MORE INFO</a></h4>
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
        <h4 class="noprint"><a href="https://data.detroitmi.gov/datasets/demolitions-under-contract" target="_blank">MORE INFO</a></h4>
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
          <h4 class="noprint"><a href="https://data.detroitmi.gov/datasets/demolitions-under-contract" target="_blank">MORE INFO</a></h4>
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
          <h4 class="noprint">
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

      selectDataBlockType(display, value){
        console.log(display, value);
          switch (value.id) {
            case 'council':
              try {
                return display.buildCouncil(values.councilData);
              } catch (error) {
                console.log(error);
                return '';
              }
              break;
    
            case 'neighborhood':
              try {
                return display.buildNeighborhood(value);
              } catch (error) {
                console.log(error);
                return '';
              }
              break;
    
            case 'nez':
              try {
                return display.buildNEZ(value, values.nezOld);
              } catch (error) {
                console.log(error);
                return '';
              }
              break;
    
            case 'nrsa':
              try {
                return display.buildNRSA(value);
              } catch (error) {
                console.log(error);
                return '';
              }
              break;
    
            case 'assessors-data':
              try {
                return display.buildAssessors(value);
              } catch (error) {
                console.log(error);
                return '';
              }
              break;
    
            case 'permit-data':
              try {
                return display.buildPermit(value);
              } catch (error) {
                console.log(error);
                return '';
              }
              break;
    
            case 'rental-data':
              try {
                return display.buildRental(value, values);
              } catch (error) {
                console.log(error);
                return '';
              }
              break;
    
            case 'blight-data':
              try {
                return display.buildBlight(value);
              } catch (error) {
                console.log(error);
                return '';
              }
              break;
    
            case 'demos-data':
              try {
                return display.buildDemosNear(value);
              } catch (error) {
                console.log(error);
                return '';
              }
              break;
    
            case 'demo-status':
              try {
                return display.buildDemoStatus(value);
              } catch (error) {
                console.log(error);
                return '';
              }
              break;
    
            case 'npo':
              try {
                return display.buildNPO(value);
              } catch (error) {
                console.log(error);
                return '';
              }
              break;
    
            case 'improve-det':
              try {
                return display.buildImproveDet(value);
              } catch (error) {
                console.log(error);
                return '';
              }
              break;
    
            case 'recycling':
              try {
                return display.buildRecycling(value, display);
              } catch (error) {
                console.log(error);
                return '';
              }
              break;
    
            case 'historicDistrict':
              try {
                return display.buildHistoricDistrict(value);
              } catch (error) {
                console.log(error);
                return '';
              }
              break;
    
            case 'fireEscrow':
              try {
                return display.buildFireEscrow(value);
              } catch (error) {
                console.log(error);
                return '';
              }
              break;
    
            case 'DWSDBackupProtection':
              try {
                return display.buildDWSDBackupProtection(values);
              } catch (error) {
                return '';
              }
              break;
          
            default:
              break;
          }
      }

    buildDataBlock(display, dataSet) {
        console.log(dataSet);
        const dataBlock = document.createElement('article');
        dataBlock.className = 'data-block';
        let datasetValues = display.selectDataBlockType(display, dataSet);
        console.log(datasetValues);
        if(datasetValues.content == null){
          return '';
        }else{
          const dataBlockTitle = document.createElement('p');
          dataBlockTitle.className = 'data-block-title';
          dataBlockTitle.innerText = datasetValues.title;
          dataBlock.appendChild(dataBlockTitle);
          const dataBlockContent = document.createElement('article');
          dataBlockContent.className = 'data-block-content';
          dataBlockContent.innerHTML = datasetValues.content;
          dataBlock.appendChild(dataBlockContent);
          return dataBlock;
        }
    }

    buildDataSection(display) {
        const app = document.getElementsByTagName('my-home-info');
        const results = document.createElement('section');
        results.id = 'data-results';
        const sectionTitle = document.createElement('p');
        sectionTitle.className = 'data-title';
        sectionTitle.innerText = app[0].getAttribute('data-active-section').toUpperCase();
        results.appendChild(sectionTitle);

        const apiDataSets = JSON.parse(app[0].getAttribute('data-api-datasets'));
        for (const dataSet in apiDataSets) {
            if (Object.hasOwnProperty.call(apiDataSets, dataSet)) {
              console.log(apiDataSets[dataSet]);
              results.appendChild(display.buildDataBlock(display, apiDataSets[dataSet]));
            }
        }
        return results;
    }

    loadDisplay(display) {
        const shadow = display.shadowRoot;
        const displayWrapper = document.createElement('section');
        displayWrapper.id = 'display-wrapper';
        switch (this.getAttribute('data-display-type')) {
            case 'welcome':
                displayWrapper.appendChild(display.welcomeStyle);
                displayWrapper.appendChild(this.neighborhoodImage);
                const textWrapperWelcome = document.createElement('article');
                displayWrapper.appendChild(textWrapperWelcome);
                const titleWelcome = document.createElement('p');
                titleWelcome.setAttribute('aria-label', 'title');
                titleWelcome.innerText = 'It’s all here. All in one place.';
                titleWelcome.className = 'display-title';
                textWrapperWelcome.appendChild(titleWelcome)
                const textWelcome = document.createElement('p');
                textWelcome.innerText = 'Enter your home address to find out your city councilmember and neighborhood district manager, along with local information about trash/recycling, your neighborhood police officer, city issues reported in your neighborhood, and more.';
                textWrapperWelcome.appendChild(textWelcome)
                const btn = document.createElement('button');
                btn.innerText = 'Start';
                btn.addEventListener('click', (ev)=>{
                    console.log(ev);
                    const app = document.getElementsByTagName('my-home-info');
                    console.log(app[0]);
                    app[0].setAttribute('data-app-state', 'active-screen');
                })
                textWrapperWelcome.appendChild(btn)
                shadow.appendChild(displayWrapper);
                break;

            case 'active':
                displayWrapper.appendChild(display.welcomeStyle);
                displayWrapper.appendChild(this.neighborhoodImage);
                const textWrapperActive = document.createElement('article');
                displayWrapper.appendChild(textWrapperActive);
                const titleActive = document.createElement('p');
                titleActive.setAttribute('aria-label', 'title');
                titleActive.innerText = 'It’s all here. All in one place.';
                titleActive.className = 'display-title';
                textWrapperActive.appendChild(titleActive)
                const textActive = document.createElement('p');
                textActive.innerText = 'Enter your home address to find out your city councilmember and neighborhood district manager, along with local information about trash/recycling, your neighborhood police officer, city issues reported in your neighborhood, and more.';
                textWrapperActive.appendChild(textActive)
                shadow.appendChild(displayWrapper);
                break;

            case 'loading':
                displayWrapper.appendChild(display.welcomeStyle);
                displayWrapper.appendChild(display.loadingStyle);
                const loadingScreen = document.createElement('article');
                loadingScreen.innerHTML = `
                <article class="loader-container">
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
                    </article>
                </article>`;
                displayWrapper.appendChild(loadingScreen);
                shadow.appendChild(displayWrapper);
                break;

            case 'results':
              const app = document.getElementsByTagName('my-home-info');
              let parcelData = JSON.parse(app[0].getAttribute('data-parcel-id'));
              displayWrapper.appendChild(display.resultsStyle);
              const addressBox = document.createElement('article');
              addressBox.className = 'result-address';
              addressBox.innerText = parcelData.address;
              displayWrapper.appendChild(addressBox);
              const results = display.buildDataSection(display);
              displayWrapper.appendChild(results);
              shadow.appendChild(displayWrapper);
              break;
        
            default:
                break;
        }
    }

}
