# d3.js meets bootstrap
js/css duo for bootstrap style [Tooltips](http://bl.ocks.org/2981335) and [Popovers](http://bl.ocks.org/3012212).

## How does it work?  
The tooltip function attaches event listeners to
selections that go and display bootstrap tooltips or popovers when
the specified events are detected.

An example of how to use it:
```javascript
    selection.tooltip(function(d,i){
        return {        
            type: "tooltip",
            text: "You need to pass in a string for the text value",
            detection: "shape",
            placement: "fixed",
            gravity: "right",
            position: [100, 100],
            displacement: [10, 10],
            mousemove: false
        };
    })
    
```
    
Viola! Tooltips! Popovers!
## Current TODOS
* Add in better defaults
* Get the animations going
* Write some tests. 
* Use it in production. 

## License

### Major components:
* d3.js: [License](https://github.com/mbostock/d3/blob/master/LICENSE)
* Bootstrap: [License](https://github.com/twitter/bootstrap/blob/master/LICENSE)

### Everything else:

Public domain. 
