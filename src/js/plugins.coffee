annotate = (options,create)->
    el = d3.select(this)

    move_tip = (selection)->
      center =  [0,0]

      if options.placement is "mouse"
        center = d3.mouse(d3.select('body').node())
      else
        offsets =  @ownerSVGElement.getBoundingClientRect()
        center[0] = offsets.left
        center[1] = offsets.top

        center[0] += options.position[0]
        center[1] += options.position[1]

        center[0]+= window.pageXOffset
        center[1]+= window.pageYOffset

      center[0] += options.displacement[0]
      center[1] += options.displacement[1]

      selection
        .style("left","#{center[0]}px")
        .style("top","#{center[1]}px")
        .style("display","block")

    el.on("mouseover",()->
      tip = create()

      tip.classed("annotation", true)
        .classed(options.gravity, true)
        .classed('fade', true)
        .style("display","none")

      tip.append("div")
        .attr("class","arrow")

      inner = ()-> tip.classed('in', true)

      setTimeout(inner,10)

      tip.style("display","").call(move_tip.bind(this))
    )

    if options.mousemove
      el.on("mousemove",()->
        d3.select(".annotation").call(move_tip.bind(this))
      )

    el.on("mouseout",()->
      tip = d3.selectAll(".annotation").classed('in', false)
      remover = ()-> tip.remove()
      setTimeout(remover,150)
    )

d3.selection.prototype.popover = (f)->
  body = d3.select('body')

  this.each((d,i)->
    options = f.apply(this,arguments)

    create_popover = ()->

      tip = body.append("div")
        .classed("popover", true)

      inner = tip.append("div")
        .attr("class","popover-inner")

      inner.append("h3")
        .text(options.title)
        .attr("class","popover-title")

      inner.append("div")
        .attr("class","popover-content")
        .append("p")
        .html(options.content[0][0].outerHTML)

      return tip

    annotate.call(this,options,create_popover)
  )


d3.selection.prototype.tooltip = (f)->
  body = d3.select('body')

  this.each (d,i)->

    options = f.apply(this,arguments)

    create_tooltip = ()->
      tip = body.append("div")
        .classed("tooltip", true)

      tip.append("div")
        .html(options.text)
        .attr("class","tooltip-inner")

      return tip

    annotate.call(this,options,create_tooltip)
