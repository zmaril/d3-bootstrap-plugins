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
      //The text within the tooltip
      text: d.title 
      //Where 
      placement: "fixed" 
      // Base positioning. Not used when placement is "mouse"
      position: [d.x,d.y]
      //How far the tooltip is shifted from the base
      displacement: [0,20] //Shifting parts of the graph over.           
      //If "mouse"" is the base poistion, then mousemove true allows
      //the tooltip to move with the mouse
      mousemove: false
    };
});

selection.popover(function(d,i){
    //TODO: add in a svg element here based on data
    return {        
      // The title that will be displayed on the popover
      title: "A title" 
      //A d3 svg element
      content: svg 
      placement: "fixed"
      gravity: "right" 
      position: [d.x,d.y]
      displacement: [0,20]            
      mousemove: false
      };
});

```
    
Viola! Tooltips! Popovers!

## Current TODOS
* Get easy voronoi detection working without breaking
  everything. Checkout the
  [voronoi](https://github.com/zmaril/d3-bootstrap-plugins/tree/voronoi)
  branch for current work on this. 
* Bring over the less files from bootstrap directly instead of
  replying on their css. 
* Write some tests. 
* Use it in production. 

## Contributing

Local development uses grunt (`npm install grunt`)

`grunt watch`- automatically compile the files as you change the src directory

`grunt build`- goes through concatenation and minification of js and
css. 

If you are adding new features, please create an example that
demonstrates that feature specifically.

## License

### Major components:
* d3.js: [License](https://github.com/mbostock/d3/blob/master/LICENSE)
* Bootstrap: [License](https://github.com/twitter/bootstrap/blob/master/LICENSE)

### Everything else:

MIT License.
