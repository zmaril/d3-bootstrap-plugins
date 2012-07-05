;(function(win, d3, undefined){
    "use strict";

    d3.selection.prototype.tooltip = function(o, f) {
      if (arguments.length < 2) f = o;
      var body = d3.select('body');
      var defaults = {
        type: "tooltip",
        text: "You need to pass in a string for the text value",
        detection: "shape",
        placement: "fixed",
        gravity: "right",
        position: [100, 100],
        displacement: [10, 10],
        mousemove: false
      };
      return this.each(function(d, i) {
        var el, key, move_tip, options, value;
        options = f.apply(this, arguments);
        for (key in defaults) {
          value = defaults[key];
          if (options[key] === undefined) options[key] = value;
        }
        el = d3.select(this);
        move_tip = function(selection) {
          var center, offsets;
          center = [0, 0];
          if (options.placement === "mouse") {
            center = d3.mouse(body.node());
          } else {
            offsets = this.ownerSVGElement.getBoundingClientRect();
            center[0] = offsets.left + options.position[0] + options.displacement[0];
            center[1] = offsets.top + options.position[1] + options.displacement[1];
            center[0] += win.scrollX;
            center[1] += win.scrollY;
          }
          return selection
            .style("left", "" + center[0] + "px")
            .style("top", "" + center[1] + "px")
            .style("display", "block");
        };
        el.on("mouseover", function() {
          var inner, tip;
          tip = body.append("div")
            .classed(options.type, true)
            .classed(options.gravity, true)
            .classed('fade', true)
            .style("display", "none");
            
          setTimeout(function() {
              tip.classed('in', true);
          }, 10);
            
          if (options.type === "tooltip") {
            tip.append("div")
              .html(options.text)
              .attr("class", "tooltip-inner");
          }
          else if (options.type === "popover") {
            inner = tip.append("div")
              .attr("class", "popover-inner");
              
            inner.append("h3")
              .text(options.text)
              .attr("class", "popover-title");
              
            inner.append("div")
              .attr("class", "popover-content")
              .append("p")
              .html(options.content[0][0].outerHTML);
          }
          tip.append("div").attr("class", "arrow");
          return tip.style("display", "").call(move_tip.bind(this));
        });
        if (options.mousemove) {
          el.on("mousemove", function() {
            return d3.select("." + options.type).call(move_tip.bind(this));
          });
        }
        return el.on("mouseout", function() {
          var tip;
          tip = d3.selectAll("." + options.type);
          tip.classed('in', false);
          setTimeout(function() {
              tip.remove();
          }, 150);
        });
      });
    };
}(window, d3));