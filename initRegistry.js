'use strict';
var fs = require('fs');

var packages = {},
port = 3333,
storage = process.argv[2] || './package-data.json';

if (fs.existsSync(storage)) {
	packages = JSON.parse(fs.readFileSync(storage));
}

exports.packages = packages;
exports.port = port;
exports.storage = storage;
