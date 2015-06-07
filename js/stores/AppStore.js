/* jshint node: true */

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    AppConstants  = require('../constants/AppConstants'),
    EventEmitter  = require('events').EventEmitter,
    merge         = require('object-assign'),
    Immutable     = require('immutable');

var DataRecord = Immutable.Record({
    timePoints: [0],
    dataPoints: [0]
});

var _initialFrom = new Date(),
    _initialTo   = new Date(),
    _initialAutoUpdate = true,
    _initialData = new DataRecord(),
    _data = Immutable.Map(),
    _from = {},
    _to = {},
    _autoUpdate = {},
    _pendingDataNames = [];

_initialTo.setMilliseconds(0);
_initialFrom.setTime(_initialTo.getTime() - 24*3600*1000);

function setFrom(datum, from) {
    _from[datum] = new Date(from);
}

function setTo(datum, to) {
    _to[datum] = new Date(to);
}

function toggleAutoUpdate(datum) {
    if(!_autoUpdate.hasOwnProperty(datum)) {
        _autoUpdate[datum] = !_initialAutoUpdate;
    } else {
        _autoUpdate[datum] = !_autoUpdate[datum];
    }
}

function setPendingState(datum) {
    if(_pendingDataNames.indexOf(datum)===-1) {
        _pendingDataNames.push(datum);
    }
}

function unsetPendingState(datum) {
    var idx = _pendingDataNames.indexOf(datum);

    if(idx!==-1) {
        _pendingDataNames.splice(idx, 1);
    }
}

function setData(datum, data, conversionFunc) {
    var convertedDataPoints = data.dataPoints;

    if(conversionFunc) {
        for(var i=0, len=convertedDataPoints.length; i<len; ++i) {
            convertedDataPoints[i] = conversionFunc(convertedDataPoints[i]);
        }
    }

    _data = _data.set(datum, new DataRecord({
        timePoints: data.timePoints,
        dataPoints: convertedDataPoints
    }));
}

var AppStore = merge({}, EventEmitter.prototype, {
    emitChange: function() {
        this.emit('change');
    },

    addChangeListener: function(callback) {
        this.on('change', callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    },

    getFrom: function(datum) {
        if(_from.hasOwnProperty(datum)) {
            return _from[datum];
        }

        return _initialFrom;
    },

    getTo: function(datum) {
        if(_to.hasOwnProperty(datum)) {
            return _to[datum];
        }

        return _initialTo;
    },

    getAutoUpdateSetting: function(datum) {
        if(_autoUpdate.hasOwnProperty(datum)) {
            return _autoUpdate[datum];
        }

        return _initialAutoUpdate;
    },

    getData: function(datum) {
        if(_data.has(datum)) {
            return _data.get(datum);
        } else {
            return _initialData;
        }
    },

    isPending: function(datum) {
        return _pendingDataNames.indexOf(datum)!==-1;
    }
});

AppStore.dispatcherToken = AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
        case AppConstants.API_CALL:
            if(action.data.dataPoints.length!==0) {
                setData(action.datum, action.data, action.conversionFunc);
            }

            unsetPendingState(action.datum);
            break;
        case AppConstants.API_CALL_PENDING:
            setPendingState(action.datum);
            break;
        case AppConstants.SET_FROM_DATE:
            setFrom(action.datum, action.data);
            break;
        case AppConstants.SET_TO_DATE:
            setTo(action.datum, action.data);
            break;
        case AppConstants.TOGGLE_AUTO_UPDATE:
            toggleAutoUpdate(action.datum);
            break;
        default:
            return true;
    }

    AppStore.emitChange();

    return true;
});

module.exports = AppStore;
