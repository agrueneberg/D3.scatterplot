(function (exports) {
    "use strict";

    /*jshint curly:false */
    /*global d3 */

    exports.scatterplot = function () {

        var scatterplot, width, height, padding, xScale, yScale, xAxisPadding,
            xAxisTicks, xAxis, yAxisPadding, yAxisTicks, yAxis;

        width = 300;
        height = 300;
        padding = {
            "top": 0.1,
            "right": 0.1,
            "bottom": 0.1,
            "left": 0.1
        };

        xScale = d3.scale.linear();
        yScale = d3.scale.linear();

        xAxisPadding = 25;
        xAxisTicks = width / 75;
        xAxis = d3.svg.axis()
                  .scale(xScale)
                  .orient("bottom")
                  .ticks(xAxisTicks)
                  .tickSize(6, 0);

        yAxisPadding = 25;
        yAxisTicks = height / 75;
        yAxis = d3.svg.axis()
                  .scale(yScale)
                  .orient("left")
                  .ticks(yAxisTicks)
                  .tickSize(6, 0);

        scatterplot = function (selection) {

            selection.each(function (data) {

                var xMin, xMax, yMin, yMax, svg, template, points;

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

             // Generate canvas.
                svg = d3.select(this)
                        .selectAll("svg")
                        .data([data]);

             // Generate chart template.
                template = svg.enter()
                              .append("svg");
                template.append("g")
                        .attr("id", "circles");
                template.append("g")
                        .attr("id", "xAxis")
                        .classed("axis", true);
                template.append("g")
                        .attr("id", "yAxis")
                        .classed("axis", true);

             // Update dimensions.
                svg.attr("width", width)
                   .attr("height", height);

             // Generate x axis.
                svg.select("g#xAxis")
                   .attr("transform", "translate(0," + (height - xAxisPadding) + ")")
                   .call(xAxis);

             // Generate y axis.
                svg.select("g#yAxis")
                   .attr("transform", "translate(" + yAxisPadding + ",0)")
                   .call(yAxis);

             // Generate circles.
                points = svg.select("g#circles")
                            .selectAll("circle")
                            .data(data);

                points.enter()
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
