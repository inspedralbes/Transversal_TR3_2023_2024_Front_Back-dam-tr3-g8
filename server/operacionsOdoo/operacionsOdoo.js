const Odoo = require('odoo-xmlrpc');

var odoo = new Odoo({
    url: "http://ec2-13-51-165-128.eu-north-1.compute.amazonaws.com",
    port: "8069",
    db: "tr3G8",
    username: "a22celgariba@inspedralbes.cat",
    password: "xckb-qas5-2ifu"
})


function registrarClient(username, correu) {
    odoo.connect(function (err) {
        if (err) { return console.log(err); }
        //console.log('Connected to Odoo server.');
        var inParams = [];
        inParams.push({'name': username})
        var params = [];
        params.push(inParams);
        odoo.execute_kw('res.partner', 'create', params, function (err, value) {
            if (err) { return console.log(err); }
            //console.log('Result: ', value);
        });
    });
}
module.exports={
    registrarClient
}