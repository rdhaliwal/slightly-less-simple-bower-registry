'use strict';

var fs = require('fs'),
    handlebars = require('handlebars'),
    path = require('path'),
    bower = require('bower'),
    registry = require('./initRegistry');


var getRegistryList = function (request, result) {
    var templateFile = fs.readFileSync(path.join(__dirname, 'templates') + '/viewRegistryList.hbs', 'utf-8');
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
    var templateFile = fs.readFileSync(path.join(__dirname, 'templates') + '/tempPackageTemplate.hbs', 'utf-8');
    var hbTemplate = handlebars.compile(templateFile);

    bower.commands.info(request.params.name)
        .on('end', function (packageInfo) {
            console.log('Loaded details for : ' + request.params.name);
            console.log('pkgName: ' + packageInfo.name);
            console.log('versions: ' + packageInfo.versions);

            //packageInfo.latest.version = packageInfo.versions[0];
            console.log('latestVersion: ' + packageInfo.latest.version);

            var flatDependencies = [];
            for (var dep in packageInfo.latest.dependencies) {
                flatDependencies.push(dep);
            }
            packageInfo.latest.dependencies = flatDependencies;
            console.log('dependencies: ' + packageInfo.latest.dependencies);


            var flatDevDependencies = [];
            for (var devDep in packageInfo.latest.devDependencies) {
                flatDevDependencies.push(devDep);
            }
            packageInfo.latest.devDependencies = flatDevDependencies;
            console.log('devDependencies: ' + packageInfo.latest.devDependencies);


            result.send(hbTemplate(packageInfo));
        })
        .on('error', function(err){
            console.log("Something has gone wrong: ");
            console.log(err);
        });
};


exports.getRegistryList = getRegistryList;
exports.getDetailedPackageInfo = getDetailedPackageInfo;
