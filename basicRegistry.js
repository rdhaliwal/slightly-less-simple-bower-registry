'use strict';

var registry = require('./initRegistry'),
	fs = require('fs');

var getAllPackages = function (request, response) {
	var result = [];
	for (var name in registry.packages) {
		result.push({
			name: name,
			url: registry.packages[name]
		});
	}
	response.send(result);
},



postPackage = function (request, response) {
	registry.packages[request.body.name] = request.body.url;
	fs.writeFile(registry.storage, JSON.stringify(registry.packages), function (err) {
		if (err) {
			console.log('Failed to write the package data to disk!');
			console.log(err);
		}
		console.log('Successfully created the new package, ' + request.body.name);
	});
	response.send(201);
},


getSpecificPackage = function (request, response) {
	var name = request.params.name;

	if (!registry.packages[name]) {
		response.send(404);
	} else {
		response.send({
			name: name,
			url: registry.packages[name]
		});
	}
},

searchPackage = function (request, response) {
	console.log('Searching for: ' + request.params.name);
	var results = Object.keys(registry.packages).filter(function (pkgName) {
		return pkgName.indexOf(request.params.name) !== -1;
	}).map(function (pkgName) {
		return {
			name: pkgName,
			url: registry.packages[pkgName]
		};
	});
	response.send(results);
};


exports.getAllPackages = getAllPackages;
exports.postPackage = postPackage;
exports.getSpecificPackage = getSpecificPackage;
exports.searchPackage = searchPackage;
