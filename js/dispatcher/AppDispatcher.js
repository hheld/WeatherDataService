/* jshint node: true */

var Dispatcher    = require('flux').Dispatcher,
    AppDispatcher = new Dispatcher();

AppDispatcher.handleViewAction = function(action) {
    this.dispatch({
        source: 'VIEW_ACTION',
        action: action
    });
};

AppDispatcher.handleApiAction = function(action) {
    this.dispatch({
        source: 'API_ACTION',
        action: action
    });
};

module.exports = AppDispatcher;

