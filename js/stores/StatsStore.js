/* jshint node: true */

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    AppConstants  = require('../constants/AppConstants'),
    EventEmitter  = require('events').EventEmitter,
    AppStore      = require('./AppStore'),
    merge         = require('object-assign');

var _initialStats = {
        min: 0,
        max: 0,
        avg: 0,
        sum: 0
    },
    _stats = {};

function computeStats(datum, data) {
    var sum = 0.0,
        len = data.length,
        min = Math.min.apply(null, data),
        max = Math.max.apply(null, data),
        avg = 0.0;

    for(var i=0; i<len; ++i) {
        sum += data[i];
    }

    if(len>0) {
        avg = sum / len;
    }

    _stats[datum] = {
        min: min,
        max: max,
        avg: avg,
        sum: sum
    };
}

var StatsStore = merge({}, EventEmitter.prototype, {
    emitChange: function() {
        this.emit('change');
    },

    addChangeListener: function(callback) {
        this.on('change', callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    },

    getStats: function(datum) {
        if(_stats.hasOwnProperty(datum)) {
            return _stats[datum];
        }

        return _initialStats;
    }
});

StatsStore.dispatcherToken = AppDispatcher.register(function(payload) {
    AppDispatcher.waitFor([
        AppStore.dispatcherToken
    ]);

    var action = payload.action;

    switch(action.actionType) {
        case AppConstants.API_CALL:
        case AppConstants.SET_FROM_DATE:
        case AppConstants.SET_TO_DATE:
            computeStats(action.datum, AppStore.getData(action.datum).dataPoints);
            break;
        default:
            return true;
    }

    StatsStore.emitChange();

    return true;
});

module.exports = StatsStore;
