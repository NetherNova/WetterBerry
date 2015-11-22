'use strict';

var helloWorldControllers =
angular.module('helloWorldControllers', []);

helloWorldControllers.controller('MainCtrl',
['$scope', '$location', '$http', 'Sensors', 'Images',
    function MainCtrl($scope, $location, $http, Sensors, Images) {
        //Nested service call
        Sensors.get({}, 
        function success(response1) {
                console.log("Data Succes");
                $scope.data = response1;
                Images.get({},
                function success(response2)
                {
                    console.log("Images success");
                    $scope.images = response2;
                    draw_histogram($scope.data, $scope.images);
                },
                function error(errorResponse){
                    console.log("Error:" + JSON.stringify(errorResponse));
                });
        },
        function error(errorResponse) {
            console.log("Error:" + JSON.stringify(errorResponse));
        });
    }]);

helloWorldControllers.controller('ShowCtrl',
['$scope', '$location', '$http',
    function ShowCtrl($scope, $location, $http) {
        $scope.message = "Show The World";
    }]);

helloWorldControllers.controller('AboutCtrl',
['$scope', '$location', '$http',
    function AboutCtrl($scope, $location, $http){
        
    }]);


function render_image(image_url)
{
    console.log(image_url);
    var img_str = image_url + '.png';
    $("#myimage").attr('src', img_str);
}

function draw_histogram(pos_data) {

    var time_series = [];
    pos_data.forEach(function (d)
    {
        var temp_date = new Date(d["date"]);
        time_series.push({"temp": d["temp1"], "temp2": d["temp2"],
            "pic": d["pic"], "month": temp_date});
    });

    console.log(time_series);

    var vis = d3.select("#visualisation"),
            WIDTH = 1000,
            HEIGHT = 500,
            MARGINS = {
                top: 20,
                right: 20,
                bottom: 20,
                left: 50
            },
    xScale = d3.time.scale().domain([new Date('10/01/2015'), new Date('11/30/2015')]).range([MARGINS.left, WIDTH]),
            yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([3, 30]),
            xAxis = d3.svg.axis()
            .scale(xScale),
            yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left");

    vis.append("svg:g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
            .call(xAxis);

    vis.append("svg:g")
            .attr("class", "axis")
            .attr("transform", "translate(" + (MARGINS.left) + ",0)")
            .call(yAxis);

    var lineGen = d3.svg.line()
            .x(function (d) {
                return xScale(d.month);
            })
            .y(function (d) {
                return yScale(d.temp);
            })
            .interpolate("basis");

    var lineGen2 = d3.svg.line()
            .x(function (d) {
                return xScale(d.month);
            })
            .y(function (d) {
                return yScale(d.temp2);
            })
            .interpolate("basis");

    var circles = vis.selectAll("circle")
            .data(time_series)
            .enter()
            .append("circle")
            .attr('cx', function (d) {
                return xScale(d.month)
            })
            .attr('cy', function (d) {
                return yScale(d.temp)
            })
            .attr('r', 10)
            .attr('stroke', 'black')
            .attr('stroke-width', 2)
            .attr('fill', "red")
            .on("mouseover", function (d) {
                mouseover(d)
            });

    //First Path
    vis.append('svg:path')
            .attr('d', lineGen(time_series))
            .attr('stroke', 'green')
            .attr('stroke-width', 2)
            .attr('fill', 'none');

    //Second path
    vis.append('svg:path')
            .attr('d', lineGen2(time_series))
            .attr('stroke', 'grey')
            .attr('stroke-width', 5)
            .attr('fill', 'none');

    var div = d3.select(".data-wrapper").append("img")
            .attr("src", "/Dionysos.png")
            .attr("height", "200")
            .attr("height", "200")
            .attr("id", "myimage");

    function mouseover(d) {
        render_image(d.pic);
    }
}