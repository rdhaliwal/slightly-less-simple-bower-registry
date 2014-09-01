'use strict';

var fs = require('fs'),
    handlebars = require('handlebars'),
    registry = require('./initRegistry');


var getRegistryList = function (request, result) {
    var templateFile = fs.readFileSync('viewRegistryList.hbs', 'utf-8');
    var hbTemplate = handlebars.compile(templateFile);

    var temp = [];
    for (var name in registry.packages) {
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

exports.getRegistryList = getRegistryList;
