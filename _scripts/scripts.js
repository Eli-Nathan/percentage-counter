var $ = require('jquery');
var $ = require('bootstrap');

var canvasSize = 200,
    centre = canvasSize/2,
    radius = canvasSize*0.8/2,
    s = Snap('#svg'),
    path = "",
    arc = s.path(path),
    startY = centre-radius,
    runBtn = document.getElementById('run'),
    percDiv = document.getElementById('percent'),
    input = document.getElementById('input');

input.onkeyup = function(evt) {
    if(isNaN(input.value)) {
      input.value = '';
    }
};

runBtn.onclick = function() {
  run(input.value/100);
};

function run(percent) {
    var endpoint = percent*360;
    Snap.animate(0, endpoint,   function (val) {
        arc.remove();

        var d = val,
            dr = d-90;
            radians = Math.PI*(dr)/180,
            endx = centre - radius*Math.cos(radians),
            endy = centre + radius * Math.sin(radians),
            largeArc = d>180 ? 1 : 0;
            path = "M"+centre+","+startY+" A"+radius+","+radius+" 0 "+largeArc+",0 "+endx+","+endy;

        arc = s.path(path);
        arc.attr({
          stroke: '#3da08d',
          fill: 'none',
          strokeWidth: 12
        });
        percDiv.innerHTML =    Math.round(val/360*100) +'%';

    }, 2000, mina.easeinout);
}

run(input.value/100);
