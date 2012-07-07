d3.selection.prototype.tooltip = (o,f)->
  if arguments.length < 2 then f = o

  body = d3.select('body')

  #Things that determine the tooltip:
  #1. When does the event get fired? Shape or voronoi hovering
  #2. Where is the tooltip placed? Gravity, position, mouse based position.
  #3. What happens when the mouse moves? Mousemove event?
  #4. What does the text display?
  defaults =
    type: "tooltip"
    #Tooltip
    text: "You need to pass in a string for the text value"
    #Popover
    title: "Title value"
    content:"Content examples"
    #Detector
    detection: "shape" #voronoi
    #Placement
    placement: "fixed" # or "mouse"
    gravity: "right"
    position: [100,100]
    #Used for mouse
    displacement: [0,0]
    mousemove: false


  optionsList = []

  this.each((d,i)->
    opt = f.apply(this,arguments)
    optionsList.push(opt)
  )


  this.each((d,i)->
    options = optionsList[i]

    el = d3.select(this)

    move_tip = (selection)->
      center =  [0,0]

      if options.placement is "mouse"
        center = d3.mouse(body.node())
      else
        offsets =  @ownerSVGElement.getBoundingClientRect()
        center[0] = offsets.left
        center[1] = offsets.top

        center[0] += options.position[0]
        center[1] += options.position[1]

        center[0]+= window.scrollX
        center[1]+= window.scrollY

      center[0] += options.displacement[0]
      center[1] += options.displacement[1]

      selection
        .style("left","#{center[0]}px")
        .style("top","#{center[1]}px")
        .style("display","block")

    el.on("mouseover",()->
      tip = body.append("div")
        .classed(options.type, true)
        .classed(options.gravity, true)
        .classed('fade', true)
        .style("display","none")

      if options.type is "tooltip"
        tip.append("div")
          .html(options.text)
          .attr("class","tooltip-inner")

      if options.type is "popover"
        inner = tip.append("div")
          .attr("class","popover-inner")

        inner.append("h3")
          .text(options.title)
          .attr("class","popover-title")

        inner.append("div")
          .attr("class","popover-content")
          .append("p")
          .html(options.content[0][0].outerHTML)

      tip.append("div").attr("class","arrow")
      setTimeout(()->
          tip.classed('in', true)
      , 10);

      tip.style("display","").call(move_tip.bind(this))
    )

    if options.mousemove
      el.on("mousemove",()->
        d3.select(".#{options.type}").call(move_tip.bind(this))
      )

    el.on("mouseout",()->
      tip = d3.selectAll("." + options.type).classed('in', false)
      setTimeout(()->
          tip.remove()
      , 150)
    )
  )