d3.selection.prototype.tooltip = (f)->
  console.log
  body = d3.select('body')
  tips = body.select("div.tooltips")

  if tips[0].length is 0
    tips.data([0]).enter()
      .append("div")
      .attr("class","tooltips")

  this.each(()->
    console.log this
    tips.data([this]).append("div")
  )

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
      title: "This is tooltip number #{i}"
    )

$(document).ready graphic.create
