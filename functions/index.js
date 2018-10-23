const functions = require('firebase-functions');
const admin = require('firebase-admin');
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
        { client_id: functions.config().badaddress.id,
        client_secret: functions.config().badaddress.secret,
        grant_type: 'client_credentials' } };
        
        requestGlobal(options, function (error, results, body) {
            if (error) throw new Error(error);

            console.log(body);
            response.send(body);
        });
    });
    
});

exports.getSuggestions = functions.https.onCall((data, context) => {
    admin.initializeApp();
    return admin.database().ref('/addresses/').once('value').then(function(snapshot) {
        console.log(snapshot.val());
        return snapshot.val();
    });
});
