/* global has */
//Default configuration
var settings = {
  width: 0,            // Default width
  height: 0,           // Default height
  background: "#000000", // Background color or gradient  
  container: "map",    // ID of parent element, e.g. div
  datapath: "data/",   // Path/URL to data files, empty = subfolder 'data'
  planets: {          
    show: true,        // Show planets, data in planets.json
    image: true,       // With image representation, if dataset contains icon parameter
    trajectory: true,  // Show orbital path as line 
    size: null         // Constant size or function
  },
  sbos: {
    show: true,        // Show small body objects, data in sbo.json
    image: false,      // With image representation, if dataset contains 'icon' parameter
    text: true,        // Show object name, if dataset contains 'designator' parameter
    trajectory: false, // Show orbital path as line 
    size: null         // Constant size or function
  },
  spacecraft: {
    show: true,        // Show spacecraft, data in probes.json
    image: false,      // With image representation, if dataset contains 'icon' parameter
    text: true,        // Show sc name, if dataset contains 'designator' parameter
    trajectory: false, // Show trajectory path as line 
    size: null         // Constant size or function
  },
  other: [             // Additional data  
  /*{file:"",          // JSON filename or url
     image: true,      // With image representation, if dataset contains 'icon' parameter
     text: true,       // Show object name, if dataset contains 'designator' parameter
     trajectory: false,// Show trajectory path as line 
     size: null        // Constant size or function
  },{}                 // Can contain multiple datasets
  */
  ],
  set: function(cfg) { // Override defaults with values of cfg
    var key, res = {};
    if (!cfg) return this; 
    for (var prop in this) {
      if (!has(this, prop)) continue; 
      if (typeof(this[prop]) === 'function') continue; 
      if (!has(cfg, prop) || cfg[prop] === null) { 
        res[prop] = this[prop]; 
      } else if (this[prop] === null || this[prop].constructor != Object ) {
        res[prop] = cfg[prop];
      } else {
        res[prop] = {};
        for (key in this[prop]) {
          if (has(cfg[prop], key)) {
            res[prop][key] = cfg[prop][key];
          } else {
            res[prop][key] = this[prop][key];
          }            
        }
      }
    }
    return res;
  }
};
