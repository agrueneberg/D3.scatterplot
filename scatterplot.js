(function (exports) {
    "use strict";

    /*global d3 */

 // Draws a scatterplot for two variables x and y.
 // @param {[number]} x
 // @param {[number]} y
 // @param {object} options
 // @param {DOMElement} options.parentElement The parent element of the SVG element.
 // @param {number} options.width Width of the SVG element.
 // @param {number} options.height Height of the SVG element.
 // @param {object} options.canvas
 // @param {object} options.canvas.padding
 // @param {number} options.canvas.padding.top
 // @param {number} options.canvas.padding.right
 // @param {number} options.canvas.padding.bottom
 // @param {number} options.canvas.padding.left
 // @param {object} options.axes
 // @param {object} options.axes.x
 // @param {number} options.axes.x.padding
 // @param {number} options.axes.x.ticks
 // @param {object} options.axes.y
 // @param {number} options.axes.y.padding
 // @param {number} options.axes.y.ticks
    exports.scatterplot = function (x, y, options) {

        var distribution, width, height, canvasPadding, xAxisPadding, xAxisTicks, yAxisPadding, yAxisTicks,
            xMin, xMax, yMin, yMax, xScale, yScale, xAxis, yAxis, svg, canvas;

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
        parentElement = options.parentElement || document.body;
        width = options.width || 300;
        height = options.height || 300;
        if (options.hasOwnProperty("canvas") && options.canvas.padding) {
            canvasPadding = options.canvasPadding;
        } else {
            canvasPadding = {
                "top": 0.1,
                "right": 0.1,
                "bottom": 0.1,
                "left": 0.1
            };
        }
        if (options.hasOwnProperty("axes") && options.axes.hasOwnProperty("x") && options.axes.x.padding) {
            xAxisPadding = options.axes.x.padding;
        } else {
            xAxisPadding = 20;
        }
        if (options.hasOwnProperty("axes") && options.axes.hasOwnProperty("x") && options.axes.x.ticks) {
            xAxisTicks = options.axes.x.ticks;
        } else {
            xAxisTicks = width / 75;
        }
        if (options.hasOwnProperty("axes") && options.axes.hasOwnProperty("y") && options.axes.y.padding) {
            yAxisPadding = options.axes.y.padding;
        } else {
            yAxisPadding = 20;
        }
        if (options.hasOwnProperty("axes") && options.axes.hasOwnProperty("y") && options.axes.y.ticks) {
            yAxisTicks = options.axes.y.ticks;
        } else {
            yAxisTicks = height / 75;
        }

     // Create padded scale for the x axis.
        xMin = d3.min(x);
        xMax = d3.max(x);
        xMin -= (xMax - xMin) * canvasPadding.left;
        xMax += (xMax - xMin) * canvasPadding.right;
        xScale = d3.scale.linear()
                   .domain([xMin, xMax])
                   .range([yAxisPadding, width]);

     // Create padded scale for the y axis.
        yMin = d3.min(y);
        yMax = d3.max(y);
        yMin -= (yMax - yMin) * canvasPadding.bottom;
        yMax += (yMax - yMin) * canvasPadding.top;
        yScale = d3.scale.linear()
                   .domain([yMin, yMax])
                   .range([height - xAxisPadding, 0]);

     // Create x axis.
        xAxis = d3.svg.axis()
                      .scale(xScale)
                      .orient("bottom")
                      .ticks(xAxisTicks)
                      .tickSize(5, 0);

     // Create y axis.
        yAxis = d3.svg.axis()
                      .scale(yScale)
                      .orient("left")
                      .ticks(yAxisTicks)
                      .tickSize(5, 0);

     // Set up the SVG element.
        svg = d3.select(parentElement)
                .append("svg")
                .attr("width", width)
                .attr("height", height);

     // Generate x axis.
        svg.append("g")
           .attr("class", "axis")
           .attr("transform", "translate(0," + (height - xAxisPadding) + ")")
           .call(xAxis);

     // Generate y axis.
        svg.append("g")
           .attr("class", "axis")
           .attr("transform", "translate(" + yAxisPadding + ",0)")
           .call(yAxis);

     // Generate and append circles.
        canvas = svg.append("g");

     // Append circles to canvas.
        canvas.selectAll("circle")
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
