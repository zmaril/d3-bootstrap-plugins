# d3.js meets bootstrap
js/css duo for bootstrap style [tooltips](http://bl.ocks.org/2981335) and [popovers](http://bl.ocks.org/3012212).

## How does it work?  
The tooltip function attaches event listeners to
selections that go and display bootstrap tooltips or popovers when
the specified events are detected.

An example of how to use it:
```javascript
    selection.tooltip(function(d,i){
        return {        
            type: "tooltip" //Other option: popover
            //For tooltips
            text: d.title
            //For popovers
            content: svg //A d3 svg element
            title: "A title"
            detection: "shape" //Work in progress. Check back later
            placement: "fixed"
            gravity: "right" //left,top,bottom
            position: [d.x,d.y]
            displacement: [0,20]            
            mousemove: false
        };
    })
    
```
    
Viola! Tooltips! Popovers!

## Current TODOS
* Better defaults.
* Divorce tooltips from popovers. Make them both call the same/
  positioning and eventing method, but have them pass in the created
  html.
* Get easy voronoi detection working without breaking everything. 
* Write some tests. 
* Use it in production. 
* begin.js, end.js to help with scoping. 

## Contributing

Local development:

`npm install grunt`
`grunt watch`
`grunt build`

If you are adding new features, please create an example that demonstrates
that feature specifically.  

## License

### Major components:
* d3.js: [License](https://github.com/mbostock/d3/blob/master/LICENSE)
* Bootstrap: [License](https://github.com/twitter/bootstrap/blob/master/LICENSE)

### Everything else:

MIT License.
