var graphic;

graphic = new Object;

graphic.create = function() {
  var g, height, size, width;
  width = $(document).width() / 2;
  height = $(document).height() * .85;
  size = d3.min([width, height]);
  graphic.svg = d3.select("#graphic").append("svg").attr("width", size).attr("height", size);
  g = graphic.svg.append("g");
  return g.selectAll("circle").data(d3.range(1, 10)).enter().append("circle").attr("cx", function(d, i) {
    return d * 40;
  }).attr("cy", function(d, i) {
    return d * 40;
  }).attr("r", function(d, i) {
    return d * 2;
  }).tooltip(function(d, i) {
    var title, tmp;
    title = "Berby Slerth number " + i + "? <br />";
    title += (i === 2 ? " I want this one!" : "Next!");
    return tmp = {
      "title": title,
      "dx": i % 2 === 1 ? 20 : -160,
      "dy": -10,
      "placement": i % 2 === 1 ? "right" : "left"
    };
  });
};

$(document).ready(graphic.create);
