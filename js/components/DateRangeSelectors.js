/* jshint node: true */

var React = require('react');

var formGroupStyle = {
    display: '-webkit-flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5
};

var labelStyle = {
    WebkitFlex: '1',
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    fontSize: '0.8em'
};

var dateInputStyle = {
    WebkitFlex: '1 auto',
    fontFamily: 'sans-serif',
    padding: 2,
    color: '#5c5e60',
    border: 'none',
    backgroundColor: '#cee3ff'
};

var autoUpdateCheckboxStyle = {
    verticalAlign: 'middle'
};

var autoUpdateLabelStyle = {
    fontFamily: 'sans-serif',
    fontSize: '0.8em'
};

var DateRangeSelectors = React.createClass({
    statics: {
        getTime: function(dateTimeObj) {
            var timeZoneOffset = dateTimeObj.getTimezoneOffset() * 60 * 1000,
                localDate = new Date(dateTimeObj.getTime() - timeZoneOffset);

            return localDate.toISOString().replace('Z', '');
        }
    },

    _onFromChanged: function(event) {
        this.props.fromChangeHandler(event.target.value);
    },

    _onToChanged: function(event) {
        this.props.toChangeHandler(event.target.value);
    },

    _onAutoUpdateChanged: function() {
        this.props.autoUpdateChangeHandler();
    },

    render: function() {
        return(
            <form>
                <div style={formGroupStyle}>
                    <label style={labelStyle}>From</label>
                    <input style={dateInputStyle}
                           type="datetime-local"
                           onChange={this._onFromChanged}
                           defaultValue={DateRangeSelectors.getTime(this.props.from)}
                           value={DateRangeSelectors.getTime(this.props.from)} />
                </div>
                <div style={formGroupStyle}>
                    <label style={labelStyle}>To</label>
                    <input style={dateInputStyle}
                           type="datetime-local"
                           onChange={this._onToChanged}
                           defaultValue={DateRangeSelectors.getTime(this.props.to)}
                           value={DateRangeSelectors.getTime(this.props.to)} />
                </div>
                <div>
                    <label style={autoUpdateLabelStyle}>
                        <input type="checkbox"
                               defaultChecked={this.props.doAutoUpdate}
                               onChange={this._onAutoUpdateChanged}
                               style={autoUpdateCheckboxStyle} /> Auto update every 5 minutes
                    </label>
                </div>
            </form>
        );
    }
});

module.exports = DateRangeSelectors;
