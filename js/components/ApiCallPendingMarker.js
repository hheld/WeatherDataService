/* jshint node: true */

var React = require('react');

var msgStyle = {
    fontFamily: 'sans-serif',
    color: '#931818',
    textAlign: 'center'
};

var ApiCallPendingMarker = React.createClass({
    getInitialState: function() {
        return {
            seconds: 0
        };
    },

    componentDidMount: function() {
        this.counter = setInterval(this.tick, 10);
    },

    componentWillUnmount: function() {
        clearInterval(this.counter);
    },

    render: function() {
        var secs = this.state.seconds.toFixed(2);

        return(
            <p style={msgStyle}>Api call pending ({secs} seconds)</p>
        );
    },

    tick: function() {
        this.setState({
            seconds: this.state.seconds + 0.01
        });
    }
});

module.exports = ApiCallPendingMarker;
