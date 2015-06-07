/* jshint node: true */

var React      = require('react'),
    Radium     = require('radium');

var StyleResolverMixin = Radium.StyleResolverMixin,
    BrowserStateMixin = Radium.BrowserStateMixin;

var buttonStyle = {
    border: 'none',
    display: 'inline-block',
    cursor: 'pointer',
    color: '#ffffff',
    fontFamily: 'sans-serif',
    fontSize: '0.8em',
    padding: '5px 15px',
    textDecoration: 'none',
    backgroundColor: '#2dabf9',

    states: [{
        hover: {
            backgroundColor: '#0688fa'
        },
        active: {
            position: 'relative',
            top: 1
        }
    }]
};

var Button = React.createClass({
    mixins: [ StyleResolverMixin, BrowserStateMixin ],

    render: function() {
        return(
                <button {...this.getBrowserStateEvents()} style={this.buildStyles(buttonStyle)} onClick={this.props.clickHandler}>Update</button>
        );
    }
});

module.exports = Button;
