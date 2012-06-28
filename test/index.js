var graphic;

graphic = new Object;

graphic.create = function() {
  var g, height, i, j, points, size, spacing, width, _i, _j, _len, _len2, _ref, _ref2;
  width = $(document).width() / 2;
  height = $(document).height() * .85;
  size = d3.min([width, height]);
  graphic.svg = d3.select("#graphic").append("svg").attr("width", size).attr("height", size);
  g = graphic.svg.append("g");
  points = [];
  spacing = 30;
  _ref = d3.range(0, height - spacing, spacing);
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    i = _ref[_i];
    _ref2 = d3.range(0, width - spacing, spacing);
    for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
      j = _ref2[_j];
      points.push({
        x: i,
        y: j
      });
    }
  }
  return g.selectAll("circle").data(points).enter().append("circle").attr("cx", function(d, i) {
    return d.x;
  }).attr("cy", function(d, i) {
    return d.y;
  }).attr("r", function(d, i) {
    return Math.round(Math.random() * spacing / 2 + 1);
  }).tooltip(function(d, i) {
    var detector, r;
    r = +d3.select(this).attr('r');
    detector = r < 5 ? "point" : "shape";
    return {
      text: "You need to pass in a string for the text value",
      detection: {
        type: "shape"
      },
      placement: {
        type: "fixed",
        gravity: "right",
        position: [d.x + r + 12, d.y - 5]
      },
      mousemove: false
    };
  });
};

$(document).ready(graphic.create);
