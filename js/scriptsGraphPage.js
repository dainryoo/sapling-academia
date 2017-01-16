
    var xhttp = new XMLHttpRequest();

    xhttp.open("POST", "../php/loadScoreInfo.php" , true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();






//All Scores Graph Color Fill and Labels =========================================
var height = 300,
    width = 720,
    marginLeft = 50,
    marginRight = 20,
    marginTop = 30,
    marginBottom = 40,
    chartHeight = height-marginTop - marginBottom,
    chartWidth = width-marginLeft - marginRight;
    widthPerDataPoint = chartWidth / allScores.length,
    widthOfDataBar = .80 * widthPerDataPoint;

var yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([0, chartHeight]);

var xScale = d3.scaleLinear()
    .domain([0, allScores.length])
    .range([0, chartWidth]);

var yAxis = d3.scaleLinear()
    .domain([0, 100])
    .range([chartHeight,0]);

var allGraph = d3.select('#allGraph')
    .append('svg')
      .attr('width', width)
      .attr('height', height)
      .style('background', '#9fbc91');

var chartArea = allGraph.append('g')
    .attr('width', chartWidth )
    .attr('height', chartHeight)
    .attr('transform', 'translate(' + marginLeft + ',' + marginTop + ')' );

chartArea.selectAll('rect').data(allScores).enter()
    .append('rect')
      .attr('height', function (d) { return yScale(d); })
      .attr('y', function (d) { return chartHeight - yScale(d); })
      .attr('width', widthOfDataBar )
      .attr('x', function (d, i) { return xScale(i); })
      .style('fill', '#bad8ab')
      .style('stroke', 'white')
      .style('stroke-width', '1')
      .on('mouseover', function (data) {
          d3.select(this)
            .style('opacity', '0.7')
      })
      .on('mouseout', function (data) {
          d3.select(this)
            .style('opacity', '1')
      });

chartArea.selectAll('text').data(allScores).enter()
    .append('text')
    .text(function(d){ return d; })
    .attr("y", function(d){ return chartHeight - 10})
    .attr("x", function(d,i){ return xScale(i) + (widthOfDataBar)/2; })
    .style("font-size", "12px")
    .style("fill", "black")
    .style("text-anchor", "middle");

//Axis Labels
var lablePositions =[];
for (var i=0; i<allScores.length; i++){
    lablePositions.push(i*widthPerDataPoint + widthOfDataBar/2);
}
var xAxis = d3.scaleOrdinal()
    .domain(allStudents)
    .range(lablePositions);
chartArea.append("g")
    .attr("transform", "translate(0," + chartHeight +")")
    .call(d3.axisBottom(xAxis));
//Full line for axis
chartArea.append("g")
    .append("line")
      .attr("x1",0)
      .attr("y1",chartHeight)
      .attr("x2",chartWidth)
      .attr("y2",chartHeight)
      .style("stroke","black");
//y Axis
var yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([chartHeight, 0]);
chartArea.append("g")
    .attr("transform", "translate(0,0)")
    .call(d3.axisLeft(yScale));
//Axis Labels
chartArea.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - .05*chartWidth)
    .attr("x",0 - (chartHeight / 2))
    .style("font-size", "12px")
    .style("fill", "black")
    .style("text-anchor", "middle")
    .text("Percent Correct");



//ENGLISH GRAPH =========================================
var yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([0, chartHeight]);
var xScale = d3.scaleLinear()
    .domain([0, engScores.length])
    .range([0, chartWidth]);
var yAxis = d3.scaleLinear()
    .domain([0, 100])
    .range([chartHeight,0]);
var engGraph = d3.select('#engGraph')
    .append('svg')
      .attr('width', width)
      .attr('height', height)
      .style('background', '#87a3db');
var chartArea = engGraph.append('g')
    .attr('width', chartWidth )
    .attr('height', chartHeight)
    .attr('transform', 'translate(' + marginLeft + ',' + marginTop + ')' );
chartArea.selectAll('rect').data(engScores).enter()
    .append('rect')
      .attr('height', function (d) { return yScale(d); })
      .attr('y', function (d) { return chartHeight - yScale(d); })
      .attr('width', widthOfDataBar )
      .attr('x', function (d, i) { return xScale(i); })
      .style('fill', '#a1baed')
      .style('stroke', 'white')
      .style('stroke-width', '1')
      .on('mouseover', function (data) {
          d3.select(this)
            .style('opacity', '0.7')
      })
      .on('mouseout', function (data) {
          d3.select(this)
            .style('opacity', '1')
      });
chartArea.selectAll('text').data(engScores).enter()
    .append('text')
    .text(function(d){ return d; })
    .attr("y", function(d){ return chartHeight - 10})
    .attr("x", function(d,i){ return xScale(i) + (widthOfDataBar)/2; })
    .style("font-size", "11px")
    .style("fill", "black")
    .style("text-anchor", "middle");
//Axis Labels
var lablePositions =[];
for (var i=0; i<engScores.length; i++){
    lablePositions.push(i*widthPerDataPoint + widthOfDataBar/2);
}
var xAxis = d3.scaleOrdinal()
    .domain(allStudents)
    .range(lablePositions);
chartArea.append("g")
    .attr("transform", "translate(0," + chartHeight +")")
    .call(d3.axisBottom(xAxis));
//Full line for axis
chartArea.append("g")
    .append("line")
      .attr("x1",0)
      .attr("y1",chartHeight)
      .attr("x2",chartWidth)
      .attr("y2",chartHeight)
      .style("stroke","black");
//y Axis
var yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([chartHeight, 0]);
chartArea.append("g")
    .attr("transform", "translate(0,0)")
    .call(d3.axisLeft(yScale));
//Axis Labels
chartArea.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - .05*chartWidth)
    .attr("x",0 - (chartHeight / 2))
    .style("font-size", "12px")
    .style("fill", "black")
    .style("text-anchor", "middle")
    .text("Percent Correct");



//MATH GRAPH =========================================
var yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([0, chartHeight]);
var xScale = d3.scaleLinear()
    .domain([0, mathScores.length])
    .range([0, chartWidth]);
var yAxis = d3.scaleLinear()
    .domain([0, 100])
    .range([chartHeight,0]);
var mathGraph = d3.select('#mathGraph')
    .append('svg')
      .attr('width', width)
      .attr('height', height)
      .style('background', '#92d3e5');
var chartArea = mathGraph.append('g')
    .attr('width', chartWidth )
    .attr('height', chartHeight)
    .attr('transform', 'translate(' + marginLeft + ',' + marginTop + ')' );
chartArea.selectAll('rect').data(mathScores).enter()
    .append('rect')
      .attr('height', function (d) { return yScale(d); })
      .attr('y', function (d) { return chartHeight - yScale(d); })
      .attr('width', widthOfDataBar )
      .attr('x', function (d, i) { return xScale(i); })
      .style('fill', '#b0e4f2')
      .style('stroke', 'white')
      .style('stroke-width', '1')
      .on('mouseover', function (data) {
          d3.select(this)
            .style('opacity', '0.7')
      })
      .on('mouseout', function (data) {
          d3.select(this)
            .style('opacity', '1')
      });
chartArea.selectAll('text').data(mathScores).enter()
    .append('text')
    .text(function(d){ return d; })
    .attr("y", function(d){ return chartHeight - 10})
    .attr("x", function(d,i){ return xScale(i) + (widthOfDataBar)/2; })
    .style("font-size", "11px")
    .style("fill", "black")
    .style("text-anchor", "middle");
//Axis Labels
var lablePositions =[];
for (var i=0; i<mathScores.length; i++){
    lablePositions.push(i*widthPerDataPoint + widthOfDataBar/2);
}
var xAxis = d3.scaleOrdinal()
    .domain(allStudents)
    .range(lablePositions);
chartArea.append("g")
    .attr("transform", "translate(0," + chartHeight +")")
    .call(d3.axisBottom(xAxis));
//Full line for axis
chartArea.append("g")
    .append("line")
      .attr("x1",0)
      .attr("y1",chartHeight)
      .attr("x2",chartWidth)
      .attr("y2",chartHeight)
      .style("stroke","black");
//y Axis
var yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([chartHeight, 0]);
chartArea.append("g")
    .attr("transform", "translate(0,0)")
    .call(d3.axisLeft(yScale));
//Axis Labels
chartArea.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - .05*chartWidth)
    .attr("x",0 - (chartHeight / 2))
    .style("font-size", "12px")
    .style("fill", "black")
    .style("text-anchor", "middle")
    .text("Percent Correct");



//SCIENCE GRAPH =========================================
var yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([0, chartHeight]);
var xScale = d3.scaleLinear()
    .domain([0, sciScores.length])
    .range([0, chartWidth]);
var yAxis = d3.scaleLinear()
    .domain([0, 100])
    .range([chartHeight,0]);
var sciGraph = d3.select('#sciGraph')
    .append('svg')
      .attr('width', width)
      .attr('height', height)
      .style('background', '#b8e08f');
var chartArea = sciGraph.append('g')
    .attr('width', chartWidth )
    .attr('height', chartHeight)
    .attr('transform', 'translate(' + marginLeft + ',' + marginTop + ')' );
chartArea.selectAll('rect').data(sciScores).enter()
    .append('rect')
      .attr('height', function (d) { return yScale(d); })
      .attr('y', function (d) { return chartHeight - yScale(d); })
      .attr('width', widthOfDataBar )
      .attr('x', function (d, i) { return xScale(i); })
      .style('fill', '#d3f4b2')
      .style('stroke', 'white')
      .style('stroke-width', '1')
      .on('mouseover', function (data) {
          d3.select(this)
            .style('opacity', '0.7')
      })
      .on('mouseout', function (data) {
          d3.select(this)
            .style('opacity', '1')
      });
chartArea.selectAll('text').data(sciScores).enter()
    .append('text')
    .text(function(d){ return d; })
    .attr("y", function(d){ return chartHeight - 10})
    .attr("x", function(d,i){ return xScale(i) + (widthOfDataBar)/2; })
    .style("font-size", "11px")
    .style("fill", "black")
    .style("text-anchor", "middle");
//Axis Labels
var lablePositions =[];
for (var i=0; i<sciScores.length; i++){
    lablePositions.push(i*widthPerDataPoint + widthOfDataBar/2);
}
var xAxis = d3.scaleOrdinal()
    .domain(allStudents)
    .range(lablePositions);
chartArea.append("g")
    .attr("transform", "translate(0," + chartHeight +")")
    .call(d3.axisBottom(xAxis));
//Full line for axis
chartArea.append("g")
    .append("line")
      .attr("x1",0)
      .attr("y1",chartHeight)
      .attr("x2",chartWidth)
      .attr("y2",chartHeight)
      .style("stroke","black");
//y Axis
var yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([chartHeight, 0]);
chartArea.append("g")
    .attr("transform", "translate(0,0)")
    .call(d3.axisLeft(yScale));
//Axis Labels
chartArea.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - .05*chartWidth)
    .attr("x",0 - (chartHeight / 2))
    .style("font-size", "12px")
    .style("fill", "black")
    .style("text-anchor", "middle")
    .text("Percent Correct");



//HISTORY GRAPH =========================================
var yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([0, chartHeight]);
var xScale = d3.scaleLinear()
    .domain([0, histScores.length])
    .range([0, chartWidth]);
var yAxis = d3.scaleLinear()
    .domain([0, 100])
    .range([chartHeight,0]);
var histGraph = d3.select('#histGraph')
    .append('svg')
      .attr('width', width)
      .attr('height', height)
      .style('background', '#8bbc8e');
var chartArea = histGraph.append('g')
    .attr('width', chartWidth )
    .attr('height', chartHeight)
    .attr('transform', 'translate(' + marginLeft + ',' + marginTop + ')' );
chartArea.selectAll('rect').data(histScores).enter()
    .append('rect')
      .attr('height', function (d) { return yScale(d); })
      .attr('y', function (d) { return chartHeight - yScale(d); })
      .attr('width', widthOfDataBar )
      .attr('x', function (d, i) { return xScale(i); })
      .style('fill', '#a7d3a9')
      .style('stroke', 'white')
      .style('stroke-width', '1')
      .on('mouseover', function (data) {
          d3.select(this)
            .style('opacity', '0.7')
      })
      .on('mouseout', function (data) {
          d3.select(this)
            .style('opacity', '1')
      });
chartArea.selectAll('text').data(histScores).enter()
    .append('text')
    .text(function(d){ return d; })
    .attr("y", function(d){ return chartHeight - 10})
    .attr("x", function(d,i){ return xScale(i) + (widthOfDataBar)/2; })
    .style("font-size", "11px")
    .style("fill", "black")
    .style("text-anchor", "middle");
//Axis Labels
var lablePositions =[];
for (var i=0; i<histScores.length; i++){
    lablePositions.push(i*widthPerDataPoint + widthOfDataBar/2);
}
var xAxis = d3.scaleOrdinal()
    .domain(allStudents)
    .range(lablePositions);
chartArea.append("g")
    .attr("transform", "translate(0," + chartHeight +")")
    .call(d3.axisBottom(xAxis));
//Full line for axis
chartArea.append("g")
    .append("line")
      .attr("x1",0)
      .attr("y1",chartHeight)
      .attr("x2",chartWidth)
      .attr("y2",chartHeight)
      .style("stroke","black");
//y Axis
var yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([chartHeight, 0]);
chartArea.append("g")
    .attr("transform", "translate(0,0)")
    .call(d3.axisLeft(yScale));
//Axis Labels
chartArea.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - .05*chartWidth)
    .attr("x",0 - (chartHeight / 2))
    .style("font-size", "12px")
    .style("fill", "black")
    .style("text-anchor", "middle")
    .text("Percent Correct");