/* jshint node: true */

var Ajax = require('simple-ajax');

function getWeatherData(datum, from, to) {
    return new Promise(function(resolve, reject) {
        var ajax = new Ajax('/wdrf/api/' + datum + '?from=' + from + '&to=' + to);

        ajax.on('success', function(event) {
            resolve(JSON.parse(event.target.responseText));
        });

        ajax.on('error', function(event) {
            reject(event.target.responseText);
        });

        ajax.send();
    });
}

module.exports = {
    get: getWeatherData
};
