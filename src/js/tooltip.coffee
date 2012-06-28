t = null
d3.selection.prototype.tooltip = (o,f)->
  if arguments.length < 2 then f = o

  body = d3.select('body')

  #Things that determine the tooltip:
  #1. When does the event get fired? Shape or voronoi hovering
  #2. Where is the tooltip placed? Gravity, position, mouse based position.
  #3. What happens when the mouse moves? Mousemove event?
  #4. What does the text display?
  defaults =
    text: "You need to pass in a string for the text value"

    detection:
      type: "shape" #voronoi
     #radius: 5, for voronoi

    placement:
      type: "fixed" # or "mouse"
      gravity: "right"
      position: [100,100] #used only for fixed
      displacement: [10,10] #used only for mouse

    mousemove: false

  this.each((d,i)->
    options = f.apply(this,arguments)

    for key,value of defaults when not options[key]?
       options[key] = value

    el = d3.select(this)

    move_tip = (selection)->
      center =  [0,0]

      if options.placement.type is "mouse"
        center = d3.mouse(body.node())
      else
        offsets =  @ownerSVGElement.getBoundingClientRect()
        center[0] = offsets.left + options.placement.position[0]
        center[1] = offsets.top + options.placement.position[1]
        center[0]+= window.scrollX
        center[1]+= window.scrollY

      selection
        .style("left","#{center[0]}px")
        .style("top","#{center[1]}px")

    el.on("mouseover",()->
      tip = body.append("div")
        .attr("class", "tooltip fade #{options.placement.gravity} in")
        .style("display","none")

      tip.append("div")
        .html(options.text)
        .attr("class","tooltip-inner")

      tip.append("div")
        .attr("class","tooltip-arrow")

      tip.style("display","").call(move_tip.bind(this))
    )

    if options.mousemove
      el.on("mousemove",()->
        d3.select(".tooltip").call(move_tip.bind(this))
      )

    el.on("mouseout",()->
      d3.select(".tooltip").remove()
    )
  )