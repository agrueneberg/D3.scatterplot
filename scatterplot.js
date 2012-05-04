(function (exports) {
    "use strict";

    /*jshint curly:false */
    /*global d3 */

    exports.scatterplot = function () {

        var scatterplot, width, height, padding, xAxisPadding, xAxisTicks,
            yAxisPadding, yAxisTicks, xScale, yScale, xAxis, yAxis;

        width = 300;
        height = 300;
        padding = {
            "top": 0.1,
            "right": 0.1,
            "bottom": 0.1,
            "left": 0.1
        };

        xAxisPadding = 25;
        xAxisTicks = width / 75;
        xScale = d3.scale.linear();

        xAxis = d3.svg.axis()
                  .scale(xScale)
                  .orient("bottom")
                  .ticks(xAxisTicks)
                  .tickSize(6, 0);

        yAxisPadding = 25;
        yAxisTicks = height / 75;
        yScale = d3.scale.linear();

        yAxis = d3.svg.axis()
                  .scale(yScale)
                  .orient("left")
                  .ticks(yAxisTicks)
                  .tickSize(6, 0);

        scatterplot = function (selection) {

            selection.each(function (data) {

                var xMin, xMax, yMin, yMax, svg, enter, group;

             // Update padded x scale.
                xMin = d3.min(data, function (d) {
                    return d[0];
                });
                xMax = d3.max(data, function (d) {
                    return d[0];
                });
                xMin -= (xMax - xMin) * padding.left;
                xMax += (xMax - xMin) * padding.right;
                xScale.domain([xMin, xMax])
                      .range([yAxisPadding, width]);

             // Update padded y scale.
                yMin = d3.min(data, function (d) {
                    return d[1];
                });
                yMax = d3.max(data, function (d) {
                    return d[1];
                });
                yMin -= (yMax - yMin) * padding.bottom;
                yMax += (yMax - yMin) * padding.top;
                yScale.domain([yMin, yMax])
                      .range([height - xAxisPadding, 0]);

             // Select existing SVG elements.
                svg = d3.select(this)
                        .selectAll("svg")
                        .data([data]) // Trick to create only one svg element for each data set.

             // Create non-existing SVG elements.
                svg.enter()
                   .append("svg");

             // Update both existing and newly created SVG elements.
                svg.attr("width", width)
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

             // Generate circles.
                svg.append("g")
                   .selectAll("circle")
                   .data(data)
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

            });

        };

        scatterplot.height = function (_) {
            if (!arguments.length) return height;
            height = _;
            return scatterplot;
        };

        scatterplot.width = function (_) {
            if (!arguments.length) return width;
            width = _;
            return scatterplot;
        };

        scatterplot.padding = function (_) {
            if (!arguments.length) return padding;
            padding = _;
            return scatterplot;
        };

        scatterplot.xAxisPadding = function (_) {
            if (!arguments.length) return xAxisPadding;
            xAxisPadding = _;
            return scatterplot;
        };

        scatterplot.xAxisTicks = function (_) {
            if (!arguments.length) return xAxisTicks;
            xAxisTicks = _;
            return scatterplot;
        };

        scatterplot.yAxisPadding = function (_) {
            if (!arguments.length) return yAxisPadding;
            yAxisPadding = _;
            return scatterplot;
        };

        scatterplot.yAxisTicks = function (_) {
            if (!arguments.length) return yAxisTicks;
            yAxisTicks = _;
            return scatterplot;
        };

        return scatterplot;

    };

}(window));
