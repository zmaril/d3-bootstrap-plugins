graphic = new Object

graphic.create = ()->
  width = $(document).width()/2
  height = $(document).height()*.85
  size = d3.min([width,height])
  graphic.svg = d3.select("#graphic")
    .append("svg")
      .attr("width",size)
      .attr("height",size)

  g = graphic.svg.append("g")

  points = []
  spacing = 30
  for i in d3.range(0,height-spacing,spacing)
    for j in d3.range(0,width-spacing,spacing)
      points.push(x: i, y: j)

  g.selectAll("circle")
    .data(points).enter()
    .append("circle")
    .attr("cx",(d,i)-> d.x)
    .attr("cy",(d,i)-> d.y)
    .attr("r",(d,i)-> Math.round(Math.random()*spacing/2+1))
    .tooltip(
      (d,i)->
        r = +d3.select(this).attr('r')

        svg = d3.select(document.createElement("svg"))
          .attr("height",50)

        g = svg.append("g")

        g.append("rect")
          .attr("width",r*10)
          .attr("height",10)

        g.append("text")
          .text("10 times the radius of the cirlce")
          .attr("dy","25")

        {
          type: "popover"
          title: "It's a me, Rectangle"
          content: svg

          detection: "shape"

          placement: "fixed"
          gravity: "right"
          position: [d.x,d.y]
          displacement: [r+12,-57]
          mousemove: false
        }
      )

$(document).ready(graphic.create)
