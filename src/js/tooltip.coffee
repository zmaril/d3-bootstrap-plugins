d3.selection.prototype.tooltip = (f)->
  body = d3.select('body')

  defaults =
    placement: "right"
    dx: 0
    dy: -15

  this.each((d,i)->
    options = f.apply(this,arguments)
    console.log options
    for key,value of defaults when not options[key]?
       options[key] = value

    el = d3.select(this)

    el.on("mouseover",()->
      e = d3.mouse(body.node())

      tip = body.append("div")
        .attr("class", "tooltip fade #{options.placement} in")
        .style("display","none")

      tip.append("div")
        .html(options.title)
        .attr("class","tooltip-inner")

      tip.append("div")
        .attr("class","tooltip-arrow")

      tip.style("display","")
        .style("left","#{e[0]+options.dx}px")
        .style("top","#{e[1]+options.dy}px")
    )

    el.on("mousemove",()->
      e = d3.mouse(body.node())

      d3.select(".tooltip")
        .style("left","#{e[0]+options.dx}px")
        .style("top","#{e[1]+options.dy}px")
    )

    el.on("mouseout",(e)->
      d3.select(".tooltip").remove()
    )
  )