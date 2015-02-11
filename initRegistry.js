'use strict';
var fs = require('fs'),
	parseArgs = require('minimist');

var args = parseArgs(process.argv.slice(2));

//Defaults
var packages = {},
	port = 3333,
	storage = './package-data.json';

//Read in from parameters
if (args.port){
	port = args.port;
}
if (args.storage){
	storage = args.storage;
}
if (fs.existsSync(storage)) {
	packages = JSON.parse(fs.readFileSync(storage));
}

exports.packages = packages;
exports.port = port;
exports.storage = storage;
