/* jshint node: true */

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    AppConstants  = require('../constants/AppConstants'),
    WeatherData   = require('../utils/WeatherApiHelper');

var ApiActions = {
    getData: function(datum, from, to, conversionFunc) {
        WeatherData.get(datum, from, to).then(function(data) {
            AppDispatcher.handleApiAction({
                actionType: AppConstants.API_CALL,
                data: data,
                datum: datum,
                conversionFunc: conversionFunc
            });
        }, function(error) {
            console.log('There was an error getting weather data for "' + datum + '": ' + error);
            AppDispatcher.handleApiAction({
                actionType: AppConstants.API_CALL,
                data: null,
                datum: datum,
                conversionFunc: conversionFunc
            });
        });

        AppDispatcher.handleApiAction({
            actionType: AppConstants.API_CALL_PENDING,
            datum: datum
        });
    }
};

module.exports = ApiActions;
