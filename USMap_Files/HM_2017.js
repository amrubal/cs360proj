'use strict';

function render() {

    var w = 960;
    var h = 560;
    var stateCodesWithNames = window.stateCodesWithNames;
    var topojson = window.topojson;
    var d3 = window.d3;
    var _ = window._;
    var data = generateData();

    function generateData() {
        var states = ['DE', 'DC', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY', 'AK', 'CA', 'CO', 'AZ', 'AR', 'AL', 'CT'];
        var vals = [0,0, 861000, 494000, 55000,358000, 49500, 39000, 97500, 21700, 29500, 222000, 15900, 33500, 20200, 275000, 268000, 158000, 32000, 333500,96500, 0, 0, 37500, 15500, 135000, 89000, 1042000, 70500,55400, 343000, 74500, 0, 64000, 207000, 35500, 846000, 99000, 20000,37500, 237000,  305000, 1610000, 78000, 0,3560000, 85500, 75000, 89000,28000,13600];
        console.log(states)
        console.log(vals)
        function dataArray() {
            var data = [];
            _.times(states.length, function (n) {
                data.push({
                    code: states[n],
                    value: vals[n]
                });
            });
            return data;
        }

        return dataArray();
    }



    var f = d3.format('.1f');


    var svg = d3.select('svg').attr('width', w).attr('height', h);
//pass in tiles data to later map it out
    d3.json('tiles-topo-us.json', function showData(error, tilegram) {
        var tiles = topojson.feature(tilegram, tilegram.objects.tiles);

        var transform = d3.geoTransform({
            point: function point(x, y) {
                return this.stream.point(x, -y);
            }
        });

        var path = d3.geoPath().projection(transform);

        var g = svg.append('g').attr('transform', 'translate(-350,' + (h - 10) + ')');

        // lists
        var stateCodes = [];

        var stateNames = [];

        var colorValues = [];
//use json file to properly align tiles in us map && state codes for state names
        tilegram.objects.tiles.geometries.forEach(function (geometry) {
            if (stateCodes.indexOf(geometry.properties.state) === -1) {
                stateCodes.push(geometry.properties.state);
                // pass in state names
                stateNames.push(_.find(stateCodesWithNames, { 'code': geometry.properties.state }).state);
                // pass in color values
                colorValues.push(_.find(data, { 'code': geometry.properties.state }).value);
            }
        });

        console.log('stateCodes', stateCodes);
        console.log('stateNames', stateNames);
        console.log('colorValues', colorValues);
//#FFEA00
        var linear = d3.scaleLinear().domain([0, _.mean(colorValues), d3.max(colorValues)]).range(['#FFFF8F', '#EE3124']);

        var borders = g.selectAll('.tiles').data(tiles.features).enter().append('path').attr('d', path).attr('class', 'border').attr('fill', function (d, i) {
            return linear(colorValues[i]);
        }).attr('stroke', '#130C0E').attr('stroke-width', 4);

        borders.on('click', function (d, i) {
            console.log('d', d);
            console.log('stateCodes[i]', stateCodes[i]);
            console.log('stateNames[i]', stateNames[i]);
        });

        borders.on('mouseover', function (d, i) {
            d3.select('#state').text(stateNames[i] + ' : ' + f(colorValues[i]));
        });

        // add state labels
        g.selectAll('.state-label').data(tiles.features).enter().append('text').attr('class', function (d) {
            return 'state-label state-label-' + d.id;
        }).attr('transform', function (d) {
            return 'translate(' + path.centroid(d) + ')';
        }).attr('dy', '.35em')

            .text(function (d) {
                return d.properties.state;
            });

        svg.append('g').attr('class', 'legendLinear').attr('transform', 'translate(810,370)');

        var legendLinear = d3.legendColor()
            .shapeWidth(20)
            //.cells(10)
            .cells([10000, 50000, 100000, 500000, 1000000,3000000])
            //.labelFormat(function (d) {
            //return _.round(d, -1);
            // })
            .orient('vertical')
            .scale(linear);

        svg.select('.legendLinear').call(legendLinear);

        svg.select('.legendLinear').append('text').attr('x', 0).attr('y', -10).attr('text-anchor', 'left').text('# of Colonies');
    });
}
