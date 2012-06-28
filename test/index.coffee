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

        detector = if r < 5 then "point" else "shape"
        {
        text: "You need to pass in a string for the text value"

        detection:
          type: "shape"

        placement:
          type: "fixed"
          gravity: "right"
          position: [d.x+r+12,d.y-5]

        mousemove: false
        }
      )

$(document).ready(graphic.create)
