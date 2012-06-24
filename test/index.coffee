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

  g.selectAll("circle")
    .data(d3.range(1,10)).enter()
    .append("circle")
    .attr("cx",(d,i)-> d*40)
    .attr("cy",(d,i)-> d*40)
    .attr("r",(d,i)-> d*2)
    .tooltip( (d,i)->
      title = "Berby Slerth number #{i}? <br />"
      title += (if i is 2 then " I want this one!" else "Next!")
      tmp =
        "title": title
        "dx": if i % 2 is 1 then 20 else -160
        "dy": -10
        "placement": if i % 2 is 1 then "right" else "left"
    )

$(document).ready(graphic.create)
