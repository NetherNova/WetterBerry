
$(document).ready(function() {

  $.ajax({type : "GET", 
          url : "/sensors",
          async : true,
          data : "{}",
          success : function(data) {
            draw_histogram(data);
          },
          error : function(result)
          {
            console.log(result);
          } 
        });
  
  $.ajax({type : "GET", 
          url : "/images",
          async : true,
          data : "{}",
          success : function(data) {
            render_image(data);
          },
          error : function(result)
          {
            console.log(result);
          } 
        });
});


  function render_image(image)
  {
    var img = new Image();
    img.src = image.url;
    img.style = 'width:20px;height:20px;';
    document.body.appendChild(img);
  }


  function hexToBase64(str) {
    return btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
  }


  function draw_histogram(pos_data){

        time_series = [];
        pos_data.forEach(function(d)
        {
            var temp_date = new Date(d["date"]);
            time_series.push( { "temp" : d["temp1"], "month" : temp_date } );
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
        xScale = d3.time.scale().domain([new Date('10/01/2015') , new Date('10/04/2015') ]).range([MARGINS.left, WIDTH]),
        yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([10,30]),
        xAxis = d3.svg.axis()
          .scale(xScale),
        yAxis = d3.svg.axis()
          .scale(yScale)
          .orient("left");
        
        vis.append("svg:g")
            .attr("class","axis")
            .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
            .call(xAxis);

        vis.append("svg:g")
          .attr("class","axis")
          .attr("transform", "translate(" + (MARGINS.left) + ",0)")
          .call(yAxis);

        var lineGen = d3.svg.line()
          .x(function(d) {
          return xScale(d.month);
        })
          .y(function(d) {
          return yScale(d.temp);
        })
          .interpolate("basis");

        vis.append('svg:path')
        .attr('d', lineGen(time_series))
        .attr('stroke', 'green')
        .attr('stroke-width', 2)
        .attr('fill', 'none');


        vis.append('svg:path')
        .attr('d', lineGen(time_series))
        .attr('stroke', 'blue')
        .attr('stroke-width', 2)
        .attr('fill', 'none');
  }