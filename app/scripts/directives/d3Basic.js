'use strict';

angular.module('myApp.directives')
    .directive('d3Bars', ['d3', function (d3) {
        return {
            restrict: 'EA',
            scope: {
                data: "=",
                label: "@",
                onClick: "&"
            },
            link: function (scope, ele, attrs) {
                var color = d3.scale.category20();
                var svg = d3.select(ele[0])
                    .append("svg")
                    .attr("width", "100%");

                var margin = parseInt(attrs.margin) || 20,
                    barHeight = parseInt(attrs.barHeight) || 20,
                    barPadding = parseInt(attrs.barPadding) || 5,
                    xScale = d3.scale.linear();

                // on window resize, re-render d3 canvas
                window.onresize = function () {
                    return scope.$apply();
                };
                scope.$watch(function () {
                        return angular.element(window)[0].innerWidth;
                    }, function () {
                        return scope.render(scope.data);
                    }
                );

                // define render function
                scope.render = function (data) {
                    svg.selectAll('*').remove();

                    if (!data) return;

                    var width = d3.select(ele[0]).node().offsetWidth - margin,
                        height = scope.data.length * (barHeight + barPadding);

                    xScale.range([0, width]);

                    svg.attr('height', height);

                    svg.selectAll('rect')
                        .data(data,function (d) {
                            return d.name
                        }).enter()
                        .append('rect')
                        .attr('height', barHeight)
                        .attr('width', 0)
                        .attr('x', Math.round(margin / 2))
                        .attr('fill', 'white');

//                        .transition()
//                        .duration(1000)
//                        .attr('width', function (d) {
//                            return xScale(d.score);
//                        });

//                    svg.selectAll("text")
//                        .data(data)
//                        .enter()
//                        .append("text")
//                        .attr("fill", "#fff")
//                        .attr("y", function (d, i) {
//                            return i * 35 + 22;
//                        })
//                        .attr("x", 15)
//                        .text(function (d) {
//                            return d[scope.label];
//                        });
                };

                // watch for data changes and re-render
                scope.$watch('data', function (newVals) {
                    scope.updateData(newVals);
                }, true);

                scope.updateData = function (data) {

                    xScale.domain([0, d3.max(data, function (d) {
                        return d.score;
                    })]);


                    var height = scope.data.length * (barHeight + barPadding);

                    svg.transition()
                        .duration(1000).attr('height', height);

                    var rect = svg.selectAll('rect').data(data, function (d) { return d.name });

                    rect.enter().append('rect')
                        .attr('height', barHeight)
                        .attr('width', 0)
                        .attr('x', Math.round(margin / 2))
                        .attr('y', function (d, i) {
                            return i * (barHeight + barPadding);
                        })
                        .attr('fill', function (d) {
                            return color(d.score);
                        });

                    rect.exit()
                        .transition()
                        .duration(1000)
                        .attr('height', 0)
                        .remove();


                    rect.transition()
                        .duration(1000)
                        .attr('y', function (d, i) {
                            return i * (barHeight + barPadding);
                        })
                        .attr('width', function (d) {
                            return xScale(d.score);
                        })
                        .attr('fill', function (d) {
                            return color(d.score);
                        });

                };


            }
        };
    }]);
