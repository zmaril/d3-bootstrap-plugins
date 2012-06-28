var t;

t = null;

d3.selection.prototype.tooltip = function(o, f) {
  var body, defaults;
  if (arguments.length < 2) f = o;
  body = d3.select('body');
  defaults = {
    text: "You need to pass in a string for the text value",
    detection: {
      type: "shape"
    },
    placement: {
      type: "fixed",
      gravity: "right",
      position: [100, 100],
      displacement: [10, 10]
    },
    mousemove: false
  };
  return this.each(function(d, i) {
    var el, key, move_tip, options, value;
    options = f.apply(this, arguments);
    for (key in defaults) {
      value = defaults[key];
      if (!(options[key] != null)) options[key] = value;
    }
    el = d3.select(this);
    move_tip = function(selection) {
      var center, offsets;
      center = [0, 0];
      if (options.placement.type === "mouse") {
        center = d3.mouse(body.node());
      } else {
        offsets = this.ownerSVGElement.getBoundingClientRect();
        center[0] = offsets.left + options.placement.position[0];
        center[1] = offsets.top + options.placement.position[1];
        center[0] += window.scrollX;
        center[1] += window.scrollY;
      }
      return selection.style("left", "" + center[0] + "px").style("top", "" + center[1] + "px");
    };
    el.on("mouseover", function() {
      var tip;
      tip = body.append("div").attr("class", "tooltip fade " + options.placement.gravity + " in").style("display", "none");
      tip.append("div").html(options.text).attr("class", "tooltip-inner");
      tip.append("div").attr("class", "tooltip-arrow");
      return tip.style("display", "").call(move_tip.bind(this));
    });
    if (options.mousemove) {
      el.on("mousemove", function() {
        return d3.select(".tooltip").call(move_tip.bind(this));
      });
    }
    return el.on("mouseout", function() {
      return d3.select(".tooltip").remove();
    });
  });
};
