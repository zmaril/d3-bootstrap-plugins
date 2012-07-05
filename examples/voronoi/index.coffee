graphic = new Object

points = null
graphic.create = ()->
  width = $(document).width()/2
  height = $(document).height()*.85
  size = d3.min([width,height])

  graphic.svg = d3.select("#graphic")
    .append("svg")
      .attr("width",size)
      .attr("height",size)

  circles = graphic.svg.append("g")

  points = []
  spacing = 30
  for i in d3.range(0,height-spacing,spacing)
    for j in d3.range(0,width-spacing,spacing)
      points.push([i,j]) if Math.random() < 0.1

  circles.selectAll("circle")
    .data(points).enter()
    .append("circle")
    .attr("cx",(d,i)-> d[0])
    .attr("cy",(d,i)-> d[1])
    .attr("r",(d,i)-> Math.random()*10+2)
    .tooltip((d,i)->
      console.log d
      {
        type: "tooltip"
        text: "Example"
        detection: "voronoi"
        base: "fixed"
        gravity: "right"
        position: d
        displacement: [20,-5]
      })

  # clips = graphic.svg.append("g")

  # clips.selectAll("clipPath")
  #   .data(points)
  # .enter().append("clipPath")
  #   .attr("id",(d,i)-> "clip-#{i}")
  # .append("circle")
  #   .attr("cx",(d)->d[0])
  #   .attr("cy",(d)->d[1])
  #   .attr("r",(d)-> 20)

  # parts = graphic.svg.append("g")

  # voronoi = d3.geom.voronoi(points)
  # bounds = d3.geom.polygon([[0,0],[0,height],[width,height],[width,0]])
  # clipped = (bounds.clip(polygon) for polygon in voronoi)
  # parts.selectAll("path")
  #   .data(clipped)
  # .enter().append("path")
  #   .attr("d",(d)-> "M#{d.join('L')}Z")
  #   .attr("clip-path",(d,i)-> "url(#clip-#{i})")


$(document).ready(graphic.create)
