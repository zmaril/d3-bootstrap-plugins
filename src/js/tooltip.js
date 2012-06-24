
d3.selection.prototype.tooltip = function(f) {
  var body, defaults;
  body = d3.select('body');
  defaults = {
    placement: "right",
    dx: 0,
    dy: -15
  };
  return this.each(function(d, i) {
    var el, key, options, value;
    options = f.apply(this, arguments);
    for (key in defaults) {
      value = defaults[key];
      if (!(options[key] != null)) options[key] = value;
    }
    el = d3.select(this);
    el.on("mouseover", function() {
      var e, tip;
      e = d3.mouse(body.node());
      tip = body.append("div").attr("class", "tooltip fade " + options.placement + " in").style("display", "none");
      tip.append("div").html(options.title).attr("class", "tooltip-inner");
      tip.append("div").attr("class", "tooltip-arrow");
      return tip.style("display", "").style("left", "" + (e[0] + options.dx) + "px").style("top", "" + (e[1] + options.dy) + "px");
    });
    el.on("mousemove", function() {
      var e;
      e = d3.mouse(body.node());
      return d3.select(".tooltip").style("left", "" + (e[0] + options.dx) + "px").style("top", "" + (e[1] + options.dy) + "px");
    });
    return el.on("mouseout", function(e) {
      return d3.select(".tooltip").remove();
    });
  });
};
