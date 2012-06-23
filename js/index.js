var graphic;

d3.selection.prototype.tooltip = function(f) {
  var body, tips;
  console.log;
  body = d3.select('body');
  tips = body.select("div.tooltips");
  if (tips[0].length === 0) {
    tips.data([0]).enter().append("div").attr("class", "tooltips");
  }
  return this.each(function() {
    console.log(this);
    return tips.data([this]).append("div");
  });
};

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
    return {
      title: "This is tooltip number " + i
    };
  });
};

$(document).ready(graphic.create);
