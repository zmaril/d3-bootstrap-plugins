# d3.js tooltip
js/css duo for bootstrap style tooltips.

Click [a gisted example](http://bl.ocks.org/2981335). 

## How does it work? 
Tooltip.js attaches event listeners to selections that go and display
bootstrap tooltips. 

An example of how to use it:
```
    selection.tooltip(function(d,i){
        return {
            'placement': 'top' //Or left, right, or bottom
            'dy': i*10 //It's a function!
            'dx': i*Math.PI 
            };
    })
    
```
    
Viola! Tooltips!
## Current TODOS
* Add in better defaults
* Get the animations going
* Make it do popovers. 
* Write some tests. 
* Use it in an actual popover. 

## License

### Major components:
* d3.js: [License](https://github.com/mbostock/d3/blob/master/LICENSE)
* Bootstrap: [License](https://github.com/twitter/bootstrap/blob/master/LICENSE)

### Everything else:

Public domain. 
