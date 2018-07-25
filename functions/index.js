const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.getToken = functions.https.onRequest((request, response) => {
    let url = 'https://gis.detroitmi.gov/arcgis/tokens/generateToken';
    let param = {
        username: 'montesje_detroitmi',
        password: 'Mango2017',
        referer: 'https://localhost:3000/',
        f: 'json'
    }
    let postRequest = new Request(url, {
        method: 'POST',
        body: JSON.stringify(param),
        headers: new Headers({
          'Content-type': 'application/json'
        }),
        mode: 'cors',
        cache: 'default'
    });
    fetch(postRequest)
    .then((resp) => {
        console.log(resp);
        // console.log(resp.status);
        if(resp.status === 201){
            // console.log('item submitted');
        }
    });
});