var net = require('net');

function whois(domain, callback) {
    var stream = net.createConnection(43, 'whois.nic.guru'),
        buffer = '';

    stream.addListener('connect', function() {
        stream.write(domain + '\r\n');
    });

    stream.addListener('data', function(data) {
        buffer += data.toString();
    });

    stream.addListener('error', function(err) {
        callback(err, null);
    });

    stream.addListener('end', function() {
        stream.end();
        callback(null, buffer.substring(0,30));
    });

}

module.exports = whois;
