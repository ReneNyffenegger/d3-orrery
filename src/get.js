/* global transform, dt, dtAdd, dtDiff, has  */

var getObject = function(dt, d) {
  
  var index = getEpoch(dt, d.elements);
  
  //has special data, todo: find appropriate data
  if (has(d.elements[index], "d")) return;

  var e = d.elements[index];
  var pos = transform(e, dt);
  
  var res = {name: d.name, pos: [pos.x, pos.y, pos.z], elements: d.elements};
  // size
  if (d.H && d.H !== "") res.r = 12 -d.H;
  else if (d.r && d.r !== "") res.r = d.r;
  else res.r = 20;
  
  //icon
  if (d.icon && d.icon !== "") res.icon = d.icon;
  
  return res;
};

var updateObject = function(dt, e) {
  var index = getEpoch(dt, e);
  
  //has special data, todo: find appropriate data
  if (has(e[index], "d")) return;

  //var e = d.elements[index];
  var pos = transform(e[index], dt);

  return [pos.x, pos.y, pos.z];
};

//Find valid set of elements for date
var getEpoch = function(dt, e) {
  var index = 0;
  
  if (e.length > 1) {
    //find trajectory for date 
    for (var i=0; i<e.length; i++) {
      if (dtDiff(new Date(Date.parse(e[i].ep)), dt) <= 0) {
        index = i===0 ? 0 : i-1;
        break;
      }
    }
  }
  return index;  
};

var getOrbit = function(dt, d) {  
  var e = d.elements[0], res = [],
      p, p0 = transform(e, dt);
  
  var period = p0.P,
      end = dtAdd(dt, period, "y"),
      step = dtDiff(dt, end)/45/(p0.a),
      current = new Date(dt.valueOf());
  
  while (dtDiff(current, end) > 0) {
    p = transform(e, current);
    res.push([p.x,p.y,p.z]);
    current = dtAdd(current, step);
  }

  res.push([p0.x,p0.y,p0.z]);
  
  return res;
};