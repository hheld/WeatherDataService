/* jshint node: true */

var unitConversionFunctions = {
    identity: identity,
    F2C: F2C,
    inHg2mbar: inHg2mbar,
    in2mm: in2mm,
    milesPerHour2mPerSec: milesPerHour2mPerSec
};

function identity(v) {
    return v;
}

function F2C(v) {
    return (v-32)/1.8;
}

function inHg2mbar(v) {
    return 33.8638815*v;
}

function in2mm(v) {
    return v*2.54*10;
}

function milesPerHour2mPerSec(v) {
    return v * 1609.344 / 3600;
}

module.exports = unitConversionFunctions;
