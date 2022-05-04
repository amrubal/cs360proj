//set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 100},
    width = 900 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;



var svg = d3.select("#line_lost")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("loss.csv",

    // When reading the csv, I must format variables:
    function(d){
        return { date : d3.timeParse("%Y")(d.year), value : d.col_lost }
    },

    // Now I can use this dataset:
    function(data) {



        // Add X axis --> it is a date format
        var x = d3.scaleTime()
            .domain(d3.extent(data, function(d) { return d.date; }))
            .range([ 0, width ]);
        svg.append("g")
            .attr("transform", "translate(0," + (height+5) + ")")
            .call(d3.axisBottom(x).ticks(5).tickSizeOuter(0));

        // Add Y axis
        var y = d3.scaleLinear()
            .domain( d3.extent(data, function(d) { return +d.value; }) )
            .range([ height, 0 ]);
        svg.append("g")
            .attr("transform", "translate(-5,0)")
            .call(d3.axisLeft(y).tickSizeOuter(0));

        // Add the area
        svg.append("path")
            .datum(data)
            .attr("fill", "red")
            .attr("fill-opacity", .3)
            .attr("stroke", "none")
            .attr("d", d3.area()
                .x(function(d) { return x(d.date) })
                .y0( height )
                .y1(function(d) { return y(d.value) })
            )

        // Add the line
        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", 4)
            .attr("d", d3.line()
                .x(function(d) { return x(d.date) })
                .y(function(d) { return y(d.value) })
            )

        // Add the line
        svg.selectAll("myCircles")
            .data(data)
            .enter()
            .append("circle")
            .attr("fill", "black")
            .attr("stroke", "none")
            .attr("cx", function(d) { return x(d.date) })
            .attr("cy", function(d) { return y(d.value) })
            .attr("r", 3)

    })
