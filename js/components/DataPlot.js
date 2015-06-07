/* jshint node: true */
/* global Dygraph */

var React   = require('react');

var style = {
    width: 'auto',
    marginLeft: 30
};

var DataPlot = React.createClass({
    componentDidMount: function() {
        var graphEl = this.refs.chart.getDOMNode();

        this.g = new Dygraph(graphEl, [[0,0]],{
            labels: ['Time', this.props.datum]
        });

        this._updateGraph();
    },

    render: function() {
        return(
            <div ref="chart" style={style}></div>
        );
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        if(nextProps.data!==this.props.data) {
            return true;
        }

        return false;
    },

    componentDidUpdate: function(prevProps, prevState) {
        this._updateGraph();
    },

    _updateGraph: function() {
        var newData = [],
            data = this.props.data;

        for(var i=0, len=data.timePoints.length; i<len; ++i) {
            newData.push([new Date(data.timePoints[i]), data.dataPoints[i]]);
        }

        var plotOptions = {
            title: this.props.displayText || this.props.datum,
            ylabel: this.props.unit,
            file: newData,
            showRangeSelector: true,
            color: 'rgb(42, 101, 212)',
            gridLineColor: 'rgb(200, 200, 200)',
            rangeSelectorPlotFillColor: '#575df5',
            rangeSelectorPlotStrokeColor: '#676877'
        };

        this.g.updateOptions(plotOptions);
        this.g.resetZoom();
    }
});

module.exports = DataPlot;
