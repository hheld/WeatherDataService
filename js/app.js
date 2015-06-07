/* jshint node: true */
/* global document */

var React      = require('react'),
    DataPanel  = require('./components/DataPanel'),
    ApiActions = require('./actions/ApiActions.js'),
    AppStore   = require('./stores/AppStore'),
    unitConversionFunctions = require('./utils/UnitConversionFunctions');

var from = AppStore.getFrom();
var to = AppStore.getTo();

var dataNames = [
    { datum: 'inTemp',      displayText: 'Temperature inside',            stat: 'Avg.', unit: '°C',   conversionFunc: unitConversionFunctions.F2C },
    { datum: 'outTemp',     displayText: 'Temperature outside',           stat: 'Avg.', unit: '°C',   conversionFunc: unitConversionFunctions.F2C },
    { datum: 'inHumidity',  displayText: 'Humidity inside',               stat: 'Avg.', unit: '%' },
    { datum: 'outHumidity', displayText: 'Humidity outside',              stat: 'Avg.', unit: '%' },
    { datum: 'rain',        displayText: 'Rain',                          stat: 'Sum',  unit: 'mm',   conversionFunc: unitConversionFunctions.in2mm },
    { datum: 'barometer',   displayText: 'Barometer',                     stat: 'Avg.', unit: 'mbar', conversionFunc: unitConversionFunctions.inHg2mbar },
    { datum: 'windSpeed',   displayText: 'Wind speed',                    stat: 'Avg.', unit: 'm/s',  conversionFunc: unitConversionFunctions.milesPerHour2mPerSec },
    { datum: 'windGust',    displayText: 'Wind gust speed',               stat: 'Avg.', unit: 'm/s',  conversionFunc: unitConversionFunctions.milesPerHour2mPerSec },
    { datum: 'windDir',     displayText: 'Wind direction frequency',      specialWidget: 'windRose' },
    { datum: 'windGustDir', displayText: 'Wind gust direction frequency', specialWidget: 'windRose' }
];

var panels = dataNames.map(function(datum, i) {
    // initialize with data
    ApiActions.getData(datum.datum, from, to, datum.conversionFunc);

    return (
        <DataPanel datum={datum.datum}
                   statName={datum.stat}
                   conversionFunc={datum.conversionFunc}
                   unit={datum.unit}
                   displayText={datum.displayText}
                   specialWidget={datum.specialWidget}
                   key={i}></DataPanel>
    );
});

React.render(
    <div>{panels}</div>,
    document.getElementById('mount-point')
);
