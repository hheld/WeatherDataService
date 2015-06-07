/* jshint node: true */

var React      = require('react');

var tableStyle = {
    fontFamily: 'sans-serif',
    width: '100%',
    borderCollapse: 'collapse'
};

var entryStyle = {
    fontSize: '0.7em',
    padding: '3px 7px 2px 7px',
    backgroundColor: 'rgba(121, 151, 217, 0.38)',
    color: '#275372'
};

var headerStyle = {
    fontSize: '0.8em',
    textAlign: 'left',
    paddingTop: 5,
    paddingBottom: 4,
    paddingLeft: 7,
    paddingRight: 7,
    backgroundColor: '#6488d9',
    color: '#eaefff',
    borderBottom: '3px solid white'
};

var StatsTable = React.createClass({
    render: function() {
        var min = this.props.min.toFixed(2),
            max = this.props.max.toFixed(2),
            stat = this.props.stat.toFixed(2);

        return(
            <table style={tableStyle}>
                <tr>
                    <th style={headerStyle}>Minimum</th>
                    <th style={headerStyle}>Maximum</th>
                    <th style={headerStyle}>{this.props.statName}</th>
                </tr>
                <tr>
                    <td style={entryStyle}>{min}</td>
                    <td style={entryStyle}>{max}</td>
                    <td style={entryStyle}>{stat}</td>
                </tr>
            </table>
        );
    }
});

module.exports = StatsTable;
