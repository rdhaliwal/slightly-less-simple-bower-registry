#!/usr/bin/env node
'use strict';

var express = require('express'),
	fs = require('fs');

var app = express(),
	path = require('path'),
	registry = require('./initRegistry'),
	basicRegistry = require('./basicRegistry'),
	detailedRegistry = require('./detailedRegistry');

app.configure(function () {
  	app.use(express.bodyParser());
	app.use(app.router);
	app.use(express.logger());
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    app.use(express.static(path.join(__dirname, 'public')));
});

app.listen(registry.port, function () {
	console.log('simple-bower-registry');
	console.log('---------------------');
	console.log('           port: %d', registry.port);
	console.log('      data file: %s', registry.storage);
	console.log('packages loaded: %d', Object.keys(registry.packages).length);
});

app.get ('/packages', basicRegistry.getAllPackages);
app.post('/packages', basicRegistry.postPackage);
app.get ('/packages/:name', basicRegistry.getSpecificPackage);
app.get ('/packages/search/:name', basicRegistry.searchPackage);

//Stupid bower registry stuff, purely just for human usability
app.get('/view', detailedRegistry.getRegistryList);
app.get('/view/:name', detailedRegistry.getDetailedPackageInfo);
