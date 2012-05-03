(function (exports) {
    "use strict";

    /*global d3 */

 // Draws a scatterplot for two variables x and y.
 // @param {[number]} x
 // @param {[number]} y
 // @param {object} options
 // @param {object} options.padding
 // @param {number} options.padding.top
 // @param {number} options.padding.right
 // @param {number} options.padding.bottom
 // @param {number} options.padding.left
 // @param {number} options.width Width of the SVG element.
 // @param {number} options.height Height of the SVG element.
    exports.scatterplot = function (x, y, options) {

        var distribution, width, height, padding, xMin, xMax, yMin, yMax, xScale, yScale, svg;

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
        width = options.width || 300;
        height = options.height || 300;
        padding = options.padding || {
            left: 0.1,
            right: 0.1,
            top: 0.1,
            bottom: 0.1
        };

     // Create padded scale for the x axis.
        xMin = d3.min(x);
        xMax = d3.max(x);
        xMin -= (xMax - xMin) * padding.left;
        xMax += (xMax - xMin) * padding.right;
        xScale = d3.scale.linear()
                   .domain([xMin, xMax])
                   .range([0, width]);

     // Create padded scale for the y axis.
        yMin = d3.min(y);
        yMax = d3.max(y);
        yMin -= (yMax - yMin) * padding.bottom;
        yMax += (yMax - yMin) * padding.top;
        yScale = d3.scale.linear()
                   .domain([yMin, yMax])
                   .range([height, 0]);

     // Set up the SVG element.
        svg = d3.select("body")
                .append("svg:svg")
                .attr("width", width)
                .attr("height", height);

     // Generate and append circles.
        svg.append("svg:g")
           .selectAll("circle")
         // There are no circles, so all data elements will go into the enter selection.
           .data(distribution)
           .enter()
           .append("circle")
           .attr("class", "point")
           .attr("cx", function (d) {
               return xScale(d[0]);
            })
           .attr("cy", function (d) {
               return yScale(d[1]);
            })
           .attr("r", 3);

    };

}(window));
