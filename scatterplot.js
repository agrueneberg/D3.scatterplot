(function (exports) {
    "use strict";

    /*global d3 */

 // Draws a scatterplot for two variables x and y.
 // @param {[number]} x
 // @param {[number]} y
 // @param {object} options
 // @param {[number]} options.margin top, right, button, left margins.
 // @param {number} options.width Width of the SVG element.
 // @param {number} options.height Height of the SVG element.
    exports.scatterplot = function (x, y, options) {

        var distribution, margin, width, height, xScale, yScale, svg, xAxis, yAxis;

     // Check if dimensions of both variables match.
        if (x.length !== y.length) {
            throw new Error("Both variables must have the same dimensions.");
        }

     // Generate tuples from variables.
        distribution = [];
        x.forEach(function (xi, i) {
            distribution.push([xi, y[i]]);
        });

     // Evaluate options and set defaults.
        options = options || {};
        margin = options.margin || [10, 20, 40, 40];
        width = options.width || 300;
        height = options.height || 300;

     // Create padded scale for x axis.
        xScale = d3.scale.linear()
              .domain([d3.min(x), d3.max(x)])
              .range([margin[3], width - margin[1]]);

     // Create padded scale for y axis.
        yScale = d3.scale.linear()
              .domain([d3.min(y), d3.max(y)])
              .range([height - margin[2], margin[0]]);

     // Set up the SVG element.
        svg = d3.select("body")
                .append("svg:svg")
                .attr("width", width)
                .attr("height", height);

     // Create an axis helper for the x axis.
        xAxis = d3.svg.axis()
                  .scale(xScale)

     // Generate x axis.
        svg.append("svg:g")
           .attr("class", "x axis")
           .attr("transform", "translate(0, " + (height - margin[2]) + ")")
           .call(xAxis);

     // Create an axis helper for the y axis.
        yAxis = d3.svg.axis()
                  .scale(yScale)
                // Flip axis.
                  .orient("left");

     // Generate y axis.
        svg.append("svg:g")
           .attr("class", "y axis")
           .attr("transform", "translate(" + margin[3] + ", 0)")
           .call(yAxis);

     // Generate and append circles.
        svg.append("svg:g")
           .selectAll("circle")
         // There are no circles, so all data elements will go into the enter selection.
           .data(distribution)
           .enter()
           .append("circle")
           .attr("cx", function (d) {
               return xScale(d[0]);
            })
           .attr("cy", function (d) {
               return yScale(d[1]);
            })
           .attr("r", 3);

    };

}(window));
