var graphic, points;

graphic = new Object;

points = null;

graphic.create = function() {
  var circles, height, i, j, size, spacing, width, _i, _j, _len, _len2, _ref, _ref2;
  width = $(document).width() / 2;
  height = $(document).height() * .85;
  size = d3.min([width, height]);
  graphic.svg = d3.select("#graphic").append("svg").attr("width", size).attr("height", size);
  circles = graphic.svg.append("g");
  points = [];
  spacing = 30;
  _ref = d3.range(0, height - spacing, spacing);
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    i = _ref[_i];
    _ref2 = d3.range(0, width - spacing, spacing);
    for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
      j = _ref2[_j];
      if (Math.random() < 0.1) points.push([i, j]);
    }
  }
  return circles.selectAll("circle").data(points).enter().append("circle").attr("cx", function(d, i) {
    return d[0];
  }).attr("cy", function(d, i) {
    return d[1];
  }).attr("r", function(d, i) {
    return Math.random() * 10 + 2;
  }).tooltip(function(d, i) {
    console.log(d);
    return {
      type: "tooltip",
      text: "Example",
      detection: "voronoi",
      base: "fixed",
      gravity: "right",
      position: d,
      displacement: [20, -5]
    };
  });
};

$(document).ready(graphic.create);
