'use strict';

var fs = require('fs'),
    handlebars = require('handlebars'),
    bower = require('bower'),
    registry = require('./initRegistry');


var getRegistryList = function (request, result) {
    var templateFile = fs.readFileSync('viewRegistryList.hbs', 'utf-8');
    var hbTemplate = handlebars.compile(templateFile);

    var temp = [];
    for (var name in registry.packages) {
        getPackageInfo(name);
        temp.push({
            name: name,
            url: registry.packages[name]
        });
    }
    var mustacheData = {
        bowerPackages : temp
    };

    result.send(hbTemplate(mustacheData));
};

var getPackageInfo = function (pkgName) {
    bower.commands.info(pkgName)
        .on('end', function (result) {
            console.log('Loaded details for : ' + pkgName);
            console.log('pkgName: ' + pkgName);
            console.log('versions: ' + result.versions);
            console.log('latestVersion: ' + result.versions[0]);
        });
};


exports.getRegistryList = getRegistryList;
