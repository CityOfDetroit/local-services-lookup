const functions = require('firebase-functions');
const requestGlobal = require('request');
const cors = require('cors')({
    origin: true,
});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
// //

exports.getToken = functions.https.onRequest((request, response) => {

    return cors(request, response, ()=>{
        var options = { method: 'POST',
        url: 'https://www.arcgis.com/sharing/rest/oauth2/token',
        headers:
        { 
            'content-type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Credentials":  false,
            "Access-Control-Allow-Headers": "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
        },
        form:
        { client_id: functions.config().localserviceslookup.id,
        client_secret: functions.config().localserviceslookup.secret,
        grant_type: 'client_credentials' } };
        
        requestGlobal(options, function (error, results, body) {
            if (error) throw new Error(error);

            console.log(body);
            response.send(body);
        });
    });
    
});