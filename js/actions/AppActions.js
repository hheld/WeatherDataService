/* jshint node: true */

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    AppConstants  = require('../constants/AppConstants');

var AppActions = {
    setFromDate: function(datum, fromDate) {
        AppDispatcher.handleViewAction({
            actionType: AppConstants.SET_FROM_DATE,
            data: fromDate,
            datum: datum
        });
    },

    setToDate: function(datum, toDate) {
        AppDispatcher.handleViewAction({
            actionType: AppConstants.SET_TO_DATE,
            data: toDate,
            datum: datum
        });
    },

    toggleAutoUpdate: function(datum) {
        AppDispatcher.handleViewAction({
            actionType: AppConstants.TOGGLE_AUTO_UPDATE,
            datum: datum
        });
    }
};

module.exports = AppActions;
