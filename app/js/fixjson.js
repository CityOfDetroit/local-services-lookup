
var jsonfile = require('jsonfile');
jsonfile.readFile('test.json', (err, obj) => {
    for (const addr in obj.addresses) {
    obj.addresses[addr].parcel_id = obj.addresses[addr].parcel_id.toString();
    }
    jsonfile.writeFile('cleanJson.json', obj, (err) => {
    console.error(err)
    });
});