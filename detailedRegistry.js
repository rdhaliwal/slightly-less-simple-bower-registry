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
        //getDetailedPackageInfo(name);
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

var getDetailedPackageInfo = function (request, result) {
    console.log(request.params.name);
    bower.commands.info(request.params.name)
        .on('end', function (packageInfo) {
            console.log('Loaded details for : ' + request.params.name);
            console.log('pkgName: ' + packageInfo.name);
            console.log('versions: ' + packageInfo.versions);
            console.log('latestVersion: ' + packageInfo.versions[0]);
            console.log('dependencies: ' + packageInfo.latest.dependencies);
            console.log('devDependencies: ' + packageInfo.latest.devDependencies);
            result.send(packageInfo);
        });
};


exports.getRegistryList = getRegistryList;
exports.getDetailedPackageInfo = getDetailedPackageInfo;
